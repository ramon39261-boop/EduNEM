
import {
  Planeacion,
  Proyecto,
  Examen,
  ConfiguracionExamen
} from '../types';

export async function generarPlaneacion(prompt: string, signal?: AbortSignal): Promise<Planeacion> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);
  const combinedSignal = signal || controller.signal;

  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await fetch('/api/planeacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ prompt }),
      signal: combinedSignal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Error al generar la planeación didáctica.');
    }

    return data as Planeacion;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('La generación fue cancelada o tardó demasiado tiempo. Por favor intenta de nuevo.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generarProyecto(prompt: string, signal?: AbortSignal): Promise<Proyecto> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);
  const combinedSignal = signal || controller.signal;

  try {
    const response = await fetch('/api/proyecto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: combinedSignal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Error al generar el proyecto escolar.');
    }

    return data as Proyecto;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('El diseño del proyecto tardó demasiado tiempo. Por favor intenta de nuevo.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generarIlustracion(
  descripcion: string,
  estilo: string = 'escolar',
  pasos: number = 4,
  signal?: AbortSignal
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);
  const combinedSignal = signal || controller.signal;

  try {
    const response = await fetch('/api/ilustracion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion, estilo, pasos }),
      signal: combinedSignal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Error al generar la ilustración didáctica.');
    }

    if (!data.imageUrl) {
      throw new Error('No se recibió la imagen generada.');
    }

    return data.imageUrl;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('La ilustración tardó demasiado tiempo. Por favor intenta de nuevo.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ==========================================
// GENERADOR DE EXÁMENES NEM
// ==========================================

export async function generarExamen(
  configuracion: ConfiguracionExamen,
  signal?: AbortSignal
): Promise<Examen> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);
  const combinedSignal = signal || controller.signal;

  try {
    const response = await fetch('/api/examen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configuracion),
      signal: combinedSignal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Error al generar el examen.');
    }

    if (
      !data ||
      typeof data.titulo !== 'string' ||
      !Array.isArray(data.preguntas) ||
      data.preguntas.length === 0
    ) {
      throw new Error('La IA no devolvió un examen válido. Intenta nuevamente.');
    }

    if (!Array.isArray(data.claveRespuestas)) {
      throw new Error('El examen no contiene la clave de respuestas.');
    }

    if (!Array.isArray(data.criteriosEvaluacion)) {
      throw new Error('El examen no contiene los criterios de evaluación.');
    }

    return data as Examen;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('La generación del examen tardó demasiado tiempo. Intenta nuevamente.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
