import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side initialization of GoogleGenAI with telemetry User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function formatErrorMessage(error: any): string {
  const msg = error?.message || String(error);
  if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('high demand')) {
    return 'El modelo está experimentando alta demanda momentáneamente. Por favor, reintenta en unos instantes.';
  }
  if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
    return 'Límite de peticiones alcanzado. Por favor, espera unos segundos antes de intentar de nuevo.';
  }
  if (msg.includes('403') || msg.includes('PERMISSION_DENIED')) {
    return 'Permiso denegado. Revisa la clave de API configurada en la plataforma.';
  }
  if (msg.includes('API_KEY_INVALID')) {
    return 'Clave de API inválida. Por favor verifica las credenciales de la aplicación.';
  }
  return msg || 'Ocurrió un error inesperado al procesar la solicitud.';
}

/**
 * Normalizes any value into a clean, non-empty display string
 */
function normalizeString(val: any): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'string') return val.trim();
  if (Array.isArray(val)) {
    return val
      .map((item) => (typeof item === 'string' ? item.trim() : JSON.stringify(item)))
      .filter(Boolean)
      .join('\n');
  }
  if (typeof val === 'object') {
    return Object.entries(val)
      .map(([k, v]) => `${k}: ${typeof v === 'string' ? v.trim() : JSON.stringify(v)}`)
      .join('\n');
  }
  return String(val);
}

/**
 * Normalizes any value into a clean array of strings
 */
function normalizeArray(val: any): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val
      .map((item) => (typeof item === 'string' ? item.trim() : String(item).trim()))
      .filter(Boolean);
  }
  if (typeof val === 'string') {
    return val
      .split(/[\n,;•-]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Execute a text generation request with LOW thinking latency and rapid model fallback
 */
async function callTextWithRetryAndFallback(params: {
  contents: string;
  config: any;
  models?: string[];
}) {
  const modelsToTry = params.models || [
    'gemini-3.8-flash',
    'gemini-flash-latest',
    'gemini-3.1-flash-lite',
  ];

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const config = { ...params.config };
      if (model === 'gemini-3.8-flash') {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
      }

      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config,
      });

      if (response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini Text] Intento fallido con ${model}:`, err?.message || err);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }

  throw lastError;
}

/**
 * Generate SVG illustration as a zero-quota, high-speed vector fallback
 */
async function generateSvgIllustration(query: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: `Crea un gráfico SVG vectorial educativo y colorido para niños de primaria representando: "${query}".
REGLAS OBLIGATORIAS:
1. NO incluyas ningún tipo de texto, letras, rótulos ni palabras en el SVG.
2. Devuelve un SVG válido con viewBox="0 0 500 500" y xmlns="http://www.w3.org/2000/svg".
3. Utiliza formas limpias, colores vivos y atractivos (estilo didáctico infantil).
4. Devuelve ÚNICAMENTE el código <svg>...</svg>, sin etiquetas de markdown ni comentarios.`,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    },
  });

  let raw = response.text || '';
  raw = raw.replace(/```xml/gi, '').replace(/```svg/gi, '').replace(/```/gi, '').trim();
  const match = raw.match(/<svg[\s\S]*<\/svg>/i);
  if (match) {
    const svgCode = match[0];
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;
  }
  throw new Error('No se pudo estructurar el gráfico SVG.');
}

/**
 * Generate educational illustration with image models, with automatic SVG fallback
 */
async function callImageWithRetryAndFallback(query: string): Promise<string> {
  const promptText = `Educational illustration for kids: ${query}. Style: clean, colorful, vector-like, professional, NO TEXT, white background, high contrast.`;
  const imageModels = ['gemini-3.1-flash-lite-image', 'gemini-2.5-flash-image'];

  for (const model of imageModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: {
          parts: [{ text: promptText }],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          return `data:${mime};base64,${part.inlineData.data}`;
        }
      }
    } catch (err: any) {
      console.warn(`[Gemini Image] Modelo ${model} no disponible o cuota agotada:`, err?.message || err);
    }
  }

  // Fallback to high-quality SVG vector illustration
  console.log('[Gemini Image] Generando ilustración SVG educativa como respaldo...');
  return await generateSvgIllustration(query);
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Endpoint: Generar Planeación Didáctica
app.post('/api/planeacion', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'El parámetro prompt es requerido.' });
    }

    const response = await callTextWithRetryAndFallback({
      contents: prompt,
      config: {
        systemInstruction: `Eres un experto pedagogo en la Nueva Escuela Mexicana (NEM) ciclo escolar 2025-2026.
Tu tarea es generar una planeación didáctica completa, contextualizada y detallada.
REGLAS OBLIGATORIAS:
- Todos los campos (titulo, grado, campoFormativo, ejesArticuladores, pda, inicio, desarrollo, cierre, evaluacion, recursos) DEBEN contener contenido pedagógico específico y detallado.
- NUNCA dejes campos vacíos ni uses frases como "sin especificar".
- En "inicio", "desarrollo" y "cierre", describe actividades claras, tiempos sugeridos y el rol de los alumnos.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titulo: { type: Type.STRING },
            grado: { type: Type.STRING },
            libroTexto: { type: Type.STRING },
            campoFormativo: { type: Type.STRING },
            ejesArticuladores: { type: Type.ARRAY, items: { type: Type.STRING } },
            pda: { type: Type.STRING },
            inicio: { type: Type.STRING },
            desarrollo: { type: Type.STRING },
            cierre: { type: Type.STRING },
            evaluacion: { type: Type.STRING },
            recursos: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            'titulo',
            'grado',
            'campoFormativo',
            'ejesArticuladores',
            'pda',
            'inicio',
            'desarrollo',
            'cierre',
            'evaluacion',
            'recursos',
          ],
        },
      },
    });

    let p = JSON.parse(response.text || '{}');
    if (Array.isArray(p)) p = p[0] || {};
    if (p.planeacion && typeof p.planeacion === 'object') {
      p = { ...p.planeacion, ...p };
    }

    // Extract with multiple key aliases and nested object fallbacks
    const titulo = normalizeString(p.titulo || p.Titulo || 'Planeación Didáctica NEM 2025-2026');
    const grado = normalizeString(p.grado || p.Grado || 'Primaria');
    const libroTexto = normalizeString(p.libroTexto || p.libro || p.LibroTexto || p.libro_texto || '');
    const campoFormativo = normalizeString(p.campoFormativo || p.CampoFormativo || p.campo || 'Lenguajes');
    const ejesArticuladores = normalizeArray(p.ejesArticuladores || p.ejes || p.ejes_articuladores);

    const pda = normalizeString(
      p.pda || p.PDA || p.procesoDesarrollo || p.procesoDeDesarrollo || p.aprendizajeEsperado
    );

    const inicio = normalizeString(
      p.inicio ||
      p.Inicio ||
      p.secuencia?.inicio ||
      p.secuenciaDidactica?.inicio ||
      p.momentos?.inicio ||
      p.fases?.inicio
    );

    const desarrollo = normalizeString(
      p.desarrollo ||
      p.Desarrollo ||
      p.secuencia?.desarrollo ||
      p.secuenciaDidactica?.desarrollo ||
      p.momentos?.desarrollo ||
      p.fases?.desarrollo
    );

    const cierre = normalizeString(
      p.cierre ||
      p.Cierre ||
      p.secuencia?.cierre ||
      p.secuenciaDidactica?.cierre ||
      p.momentos?.cierre ||
      p.fases?.cierre
    );

    const evaluacion = normalizeString(
      p.evaluacion ||
      p.Evaluacion ||
      p.evaluacionFormativa ||
      p.instrumentoEvaluacion
    );

    const recursos = normalizeArray(
      p.recursos ||
      p.materiales ||
      p.recursosDidacticos ||
      p.materialesDidacticos
    );

    return res.json({
      titulo,
      grado,
      libroTexto: libroTexto || 'Proyectos de Aula',
      campoFormativo,
      ejesArticuladores: ejesArticuladores.length > 0 ? ejesArticuladores : ['Pensamiento Crítico'],
      pda: pda || 'Desarrolla habilidades y conocimientos fundamentales para su nivel escolar mediante indagación activa.',
      inicio: inicio || 'Pase de lista y activación de conocimientos previos mediante preguntas detonadoras relacionadas con el tema.',
      desarrollo: desarrollo || 'Actividades de indagación y experimentación en equipos para profundizar en el aprendizaje situado.',
      cierre: cierre || 'Puesta en común, reflexión comunitaria sobre los aprendizajes obtenidos y acuerdos de trabajo.',
      evaluacion: evaluacion || 'Evaluación formativa continua mediante lista de cotejo y observación del trabajo colaborativo.',
      recursos: recursos.length > 0 ? recursos : ['Cuaderno de trabajo', 'Material didáctico del aula', 'Colores y hojas'],
    });
  } catch (error: any) {
    console.error('Error final en /api/planeacion:', error);
    const msg = error?.message || '';
    const statusCode = msg.includes('503') || msg.includes('UNAVAILABLE') ? 503 : msg.includes('429') ? 429 : 500;
    return res.status(statusCode).json({ error: formatErrorMessage(error) });
  }
});

// Endpoint: Generar Proyecto Sociocrítico
app.post('/api/proyecto', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'El parámetro prompt es requerido.' });
    }

    const response = await callTextWithRetryAndFallback({
      contents: prompt,
      config: {
        systemInstruction: `Eres un asesor pedagógico en metodologías sociocríticas de la Nueva Escuela Mexicana (NEM).
Genera proyectos escolares fundamentados en la comunidad (ABPC, STEAM, ABP o Aprendizaje Servicio).
REGLAS OBLIGATORIAS:
- Todos los campos (nombre, problematica, metodologia, proposito, fases, productoFinal) deben contener redacciones completas y detalladas.
- Cada fase debe incluir una lista rica de actividades concretas a realizar con los estudiantes.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nombre: { type: Type.STRING },
            problematica: { type: Type.STRING },
            metodologia: { type: Type.STRING },
            proposito: { type: Type.STRING },
            fases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nombre: { type: Type.STRING },
                  actividades: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['nombre', 'actividades'],
              },
            },
            productoFinal: { type: Type.STRING },
          },
          required: [
            'nombre',
            'problematica',
            'metodologia',
            'proposito',
            'fases',
            'productoFinal',
          ],
        },
      },
    });

    let p = JSON.parse(response.text || '{}');
    if (Array.isArray(p)) p = p[0] || {};
    if (p.proyecto && typeof p.proyecto === 'object') {
      p = { ...p.proyecto, ...p };
    }

    const nombre = normalizeString(p.nombre || p.titulo || p.nombreProyecto || 'Proyecto Comunitario NEM');
    const problematica = normalizeString(p.problematica || p.problema || p.situacionProblema);
    const metodologia = normalizeString(p.metodologia || p.metodo || 'Aprendizaje Basado en Proyectos Comunitarios');
    const proposito = normalizeString(p.proposito || p.objetivo || p.meta);
    const productoFinal = normalizeString(p.productoFinal || p.producto || p.entregable);

    let rawFases = p.fases || p.etapas || p.momentos || [];
    if (!Array.isArray(rawFases) && typeof rawFases === 'object') {
      rawFases = Object.entries(rawFases).map(([k, v]) => ({
        nombre: k,
        actividades: Array.isArray(v) ? v : [String(v)],
      }));
    }

    const fases = Array.isArray(rawFases) && rawFases.length > 0
      ? rawFases.map((f: any, idx: number) => ({
          nombre: normalizeString(f.nombre || f.titulo || f.fase || `Fase ${idx + 1}`),
          actividades: normalizeArray(f.actividades || f.acciones || f.pasos || f.descripcion),
        }))
      : [
          {
            nombre: 'Fase 1: Identificación y Planeación',
            actividades: ['Diálogo comunitario sobre la problemática', 'Organización de comisiones de trabajo'],
          },
          {
            nombre: 'Fase 2: Acción e Indagación',
            actividades: ['Investigación de campo y entrevistas', 'Elaboración de propuestas de solución'],
          },
          {
            nombre: 'Fase 3: Intervención y Difusión',
            actividades: ['Presentación del producto final ante la comunidad', 'Evaluación comunitaria de logros'],
          },
        ];

    return res.json({
      nombre,
      problematica: problematica || 'Atención y mejora del entorno escolar y comunitario.',
      metodologia,
      proposito: proposito || 'Fomentar la participación activa de los alumnos para transformar su comunidad.',
      fases,
      productoFinal: productoFinal || 'Feria comunitaria y presentación de propuestas de acción.',
    });
  } catch (error: any) {
    console.error('Error final en /api/proyecto:', error);
    const msg = error?.message || '';
    const statusCode = msg.includes('503') || msg.includes('UNAVAILABLE') ? 503 : msg.includes('429') ? 429 : 500;
    return res.status(statusCode).json({ error: formatErrorMessage(error) });
  }
});

// Endpoint: Generar Ilustración Educativa
app.post('/api/ilustracion', async (req: Request, res: Response) => {
  try {
    const { prompt, descripcion } = req.body;
    const query = descripcion || prompt;
    if (!query) {
      return res.status(400).json({ error: 'La descripción del recurso es requerida.' });
    }

    const imageUrl = await callImageWithRetryAndFallback(query);
    return res.json({ imageUrl });
  } catch (error: any) {
    console.error('Error final en /api/ilustracion:', error);
    const msg = error?.message || '';
    const statusCode = msg.includes('503') || msg.includes('UNAVAILABLE') ? 503 : msg.includes('429') ? 429 : 500;
    return res.status(statusCode).json({ error: formatErrorMessage(error) });
  }
});

// Setup Vite middleware in dev or static files in production
const isDev = process.env.NODE_ENV !== 'production';

async function startServer() {
  if (isDev) {
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, 'vite.config.ts'),
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response, next) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduNEM Server corriendo en el puerto ${PORT} (modo: ${isDev ? 'desarrollo' : 'producción'})`);
  });
}

startServer().catch((err) => {
  console.error('Error iniciando el servidor:', err);
  process.exit(1);
});
