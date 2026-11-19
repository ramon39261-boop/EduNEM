
import {
  Planeacion,
  Proyecto,
  Examen,
  PreguntaExamen,
  FichaMatematica,
  EjercicioMatematico
} from '../types';

/**
 * Escapa caracteres HTML para proteger el contenido del documento.
 */
function escapeHtml(text?: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Genera y descarga un archivo Word (.doc) para Planeación Didáctica.
 */
export function exportarPlaneacionWord(
  planeacion: Planeacion,
  metadatosAdicionales: { leccion?: string; libroTexto?: string } = {}
) {
  const titulo = escapeHtml(planeacion.titulo || 'Planeación Didáctica NEM 2025-2026');
  const grado = escapeHtml(planeacion.grado || 'Primaria');
  const libroTexto = escapeHtml(planeacion.libroTexto || metadatosAdicionales.libroTexto || 'Proyectos de Aula');
  const leccion = escapeHtml(metadatosAdicionales.leccion || 'Lección del programa sintético');
  const campoFormativo = escapeHtml(typeof planeacion.campoFormativo === 'string' ? planeacion.campoFormativo : 'Lenguajes');
  const ejes = (planeacion.ejesArticuladores || []).map(e => escapeHtml(e)).join(', ') || 'Pensamiento Crítico';
  const pda = escapeHtml(planeacion.pda || '');
  const inicio = escapeHtml(planeacion.inicio || '').replace(/\n/g, '<br/>');
  const desarrollo = escapeHtml(planeacion.desarrollo || '').replace(/\n/g, '<br/>');
  const cierre = escapeHtml(planeacion.cierre || '').replace(/\n/g, '<br/>');
  const evaluacion = escapeHtml(planeacion.evaluacion || '').replace(/\n/g, '<br/>');

  const recursosList = (planeacion.recursos || [])
    .map(r => `<li style="margin-bottom: 4px;">${escapeHtml(r)}</li>`)
    .join('');

  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${titulo}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: letter portrait;
      margin: 1.8cm 1.8cm 1.8cm 1.8cm;
    }
    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.45;
      color: #1e293b;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    .header-table {
      width: 100%;
      border-bottom: 3px solid #1e3a2f;
      padding-bottom: 10px;
      margin-bottom: 18px;
    }
    .header-tag {
      font-size: 9pt;
      font-weight: bold;
      color: #5A5A40;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .header-title {
      font-size: 20pt;
      font-weight: bold;
      color: #1e3a2f;
      margin: 4px 0 2px 0;
      font-family: 'Georgia', serif;
    }
    .header-sub {
      font-size: 10pt;
      color: #64748b;
    }
    .meta-box {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
    }
    .meta-box td {
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      font-size: 10pt;
      vertical-align: top;
    }
    .meta-label {
      font-weight: bold;
      color: #475569;
      text-transform: uppercase;
      font-size: 8.5pt;
      letter-spacing: 0.5px;
    }
    .meta-value {
      color: #0f172a;
      font-weight: 600;
      margin-top: 2px;
    }
    .card-section {
      margin-bottom: 18px;
      border: 1px solid #e2e8f0;
      background-color: #ffffff;
      padding: 14px 16px;
    }
    .section-title {
      font-size: 9.5pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #5A5A40;
      margin: 0 0 8px 0;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
    }
    .section-content {
      font-size: 10.5pt;
      color: #334155;
      line-height: 1.5;
    }
    .sequence-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      margin-bottom: 18px;
    }
    .sequence-table td {
      width: 33.33%;
      vertical-align: top;
      padding: 12px;
      border: 1px solid #cbd5e1;
      background-color: #ffffff;
    }
    .moment-title {
      font-size: 11pt;
      font-weight: bold;
      color: #1e3a2f;
      margin-bottom: 6px;
      text-transform: uppercase;
      border-bottom: 2px solid #5A5A40;
      padding-bottom: 4px;
    }
    .badge-chip {
      display: inline-block;
      padding: 3px 8px;
      background-color: #f1f5f9;
      border: 1px solid #cbd5e1;
      font-size: 9pt;
      color: #334155;
      margin: 2px 4px 2px 0;
    }
    .signatures-table {
      width: 100%;
      margin-top: 36px;
      border-collapse: collapse;
    }
    .signatures-table td {
      width: 50%;
      text-align: center;
      padding: 20px 20px 0 20px;
    }
    .sign-line {
      border-top: 1px solid #475569;
      width: 75%;
      margin: 0 auto 6px auto;
    }
    .sign-role {
      font-size: 9pt;
      font-weight: bold;
      color: #475569;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <table class="header-table" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div class="header-tag">NUEVA ESCUELA MEXICANA • CICLO ESCOLAR 2025-2026</div>
        <div class="header-title">${titulo}</div>
        <div class="header-sub">Documento Oficial de Planeación Didáctica Situada</div>
      </td>
    </tr>
  </table>

  <table class="meta-box" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width: 50%;">
        <div class="meta-label">Grado Escolar</div>
        <div class="meta-value">${grado}</div>
      </td>
      <td style="width: 50%;">
        <div class="meta-label">Libro de Texto SEP</div>
        <div class="meta-value">📖 ${libroTexto}</div>
      </td>
    </tr>
    <tr>
      <td style="width: 50%;">
        <div class="meta-label">Lección del Libro</div>
        <div class="meta-value">📌 ${leccion}</div>
      </td>
      <td style="width: 50%;">
        <div class="meta-label">Campo Formativo</div>
        <div class="meta-value">${campoFormativo}</div>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <div class="meta-label">Ejes Articuladores</div>
        <div class="meta-value">${ejes}</div>
      </td>
    </tr>
  </table>

  <div class="card-section" style="border-left: 4px solid #5A5A40; background-color: #fcfcfb;">
    <div class="section-title">PDA (Proceso de Desarrollo de Aprendizaje)</div>
    <div class="section-content" style="font-weight: 500;">${pda}</div>
  </div>

  <div style="margin-top: 10px; margin-bottom: 6px;">
    <div class="section-title">Secuencia Didáctica (Momentos Pedagógicos)</div>
  </div>
  <table class="sequence-table" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div class="moment-title">1. Inicio</div>
        <div class="section-content">${inicio}</div>
      </td>
      <td>
        <div class="moment-title">2. Desarrollo</div>
        <div class="section-content">${desarrollo}</div>
      </td>
      <td>
        <div class="moment-title">3. Cierre</div>
        <div class="section-content">${cierre}</div>
      </td>
    </tr>
  </table>

  <div class="card-section">
    <div class="section-title">Evaluación Formativa (Criterios e Instrumentos)</div>
    <div class="section-content">${evaluacion}</div>
  </div>

  <div class="card-section">
    <div class="section-title">Recursos y Materiales Didácticos</div>
    <ul style="margin: 6px 0 0 18px; padding: 0;">
      ${recursosList || '<li>Materiales y cuadernos de trabajo del aula</li>'}
    </ul>
  </div>

  <table class="signatures-table" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div class="sign-line"></div>
        <div class="sign-role">Prof(a). Docente Titular</div>
        <div style="font-size: 8pt; color: #94a3b8; margin-top: 2px;">Firma de Elaboración</div>
      </td>
      <td>
        <div class="sign-line"></div>
        <div class="sign-role">Dirección Escolar</div>
        <div style="font-size: 8pt; color: #94a3b8; margin-top: 2px;">Sello y Vo.Bo.</div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Planeacion_${(planeacion.titulo || 'EduNEM').replace(/\s+/g, '_')}_NEM_2025-2026.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Genera y descarga un archivo Word (.doc) para Proyecto Sociocrítico.
 */
export function exportarProyectoWord(
  proyecto: Proyecto,
  metadatosAdicionales: { grado?: string } = {}
) {
  const nombre = escapeHtml(proyecto.nombre || 'Proyecto Sociocrítico NEM');
  const metodologia = escapeHtml(proyecto.metodologia || 'Metodología Sociocrítica NEM');
  const grado = escapeHtml(metadatosAdicionales.grado || 'Primaria');
  const problematica = escapeHtml(proyecto.problematica || '');
  const proposito = escapeHtml(proyecto.proposito || '');
  const productoFinal = escapeHtml(proyecto.productoFinal || '');

  const fasesHtml = (proyecto.fases || [])
    .map((f, i) => {
      const actividadesList = (f.actividades || [])
        .map(a => `<li style="margin-bottom: 4px;">${escapeHtml(a)}</li>`)
        .join('');

      return `
      <div style="margin-bottom: 14px; border: 1px solid #cbd5e1; background-color: #ffffff; padding: 12px 14px;">
        <div style="font-weight: bold; color: #1e3a2f; font-size: 11pt; text-transform: uppercase; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
          Fase ${i + 1}: ${escapeHtml(f.nombre)}
        </div>
        <ul style="margin: 6px 0 0 18px; padding: 0; color: #334155; font-size: 10pt;">
          ${actividadesList}
        </ul>
      </div>
      `;
    })
    .join('');

  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${nombre}</title>
  <style>
    @page {
      size: letter portrait;
      margin: 1.8cm 1.8cm 1.8cm 1.8cm;
    }
    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.45;
      color: #1e293b;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    .header-table {
      width: 100%;
      border-bottom: 3px solid #1e3a2f;
      padding-bottom: 10px;
      margin-bottom: 18px;
    }
    .header-tag {
      font-size: 9pt;
      font-weight: bold;
      color: #5A5A40;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .header-title {
      font-size: 20pt;
      font-weight: bold;
      color: #1e3a2f;
      margin: 4px 0 2px 0;
      font-family: 'Georgia', serif;
    }
    .meta-box {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
    }
    .meta-box td {
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      font-size: 10pt;
      vertical-align: top;
    }
    .meta-label {
      font-weight: bold;
      color: #475569;
      text-transform: uppercase;
      font-size: 8.5pt;
    }
    .meta-value {
      color: #0f172a;
      font-weight: 600;
      margin-top: 2px;
    }
    .card-section {
      margin-bottom: 16px;
      border: 1px solid #e2e8f0;
      background-color: #ffffff;
      padding: 12px 16px;
    }
    .section-title {
      font-size: 9.5pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #5A5A40;
      margin: 0 0 6px 0;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
    }
    .signatures-table {
      width: 100%;
      margin-top: 36px;
      border-collapse: collapse;
    }
    .signatures-table td {
      width: 50%;
      text-align: center;
      padding: 20px 20px 0 20px;
    }
    .sign-line {
      border-top: 1px solid #475569;
      width: 75%;
      margin: 0 auto 6px auto;
    }
  </style>
</head>
<body>
  <table class="header-table" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div class="header-tag">NUEVA ESCUELA MEXICANA • PROYECTOS SOCIOCRÍTICOS</div>
        <div class="header-title">${nombre}</div>
        <div style="font-size: 10pt; color: #64748b;">Diseño Didáctico Basado en Metodologías Comunitarias</div>
      </td>
    </tr>
  </table>

  <table class="meta-box" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width: 50%;">
        <div class="meta-label">Grado Escolar</div>
        <div class="meta-value">${grado}</div>
      </td>
      <td style="width: 50%;">
        <div class="meta-label">Metodología Aplicada</div>
        <div class="meta-value">${metodologia}</div>
      </td>
    </tr>
  </table>

  <div class="card-section" style="border-left: 4px solid #b91c1c; background-color: #fef2f2;">
    <div class="section-title" style="color: #991b1b;">Problemática Comunitaria Atendida</div>
    <div style="font-size: 10.5pt; color: #7f1d1d;">${problematica}</div>
  </div>

  <div class="card-section" style="border-left: 4px solid #5A5A40;">
    <div class="section-title">Propósito del Proyecto</div>
    <div style="font-size: 10.5pt; color: #334155;">${proposito}</div>
  </div>

  <div style="margin-top: 14px; margin-bottom: 6px;">
    <div class="section-title">Fases y Momentos del Proyecto</div>
  </div>
  ${fasesHtml}

  <div class="card-section" style="border-left: 4px solid #047857; background-color: #f0fdf4;">
    <div class="section-title" style="color: #065f46;">Producto Final Esperado</div>
    <div style="font-size: 10.5pt; color: #064e3b; font-weight: 500;">${productoFinal}</div>
  </div>

  <table class="signatures-table" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div class="sign-line"></div>
        <div style="font-size: 9pt; font-weight: bold; color: #475569; text-transform: uppercase;">Docente Responsable</div>
        <div style="font-size: 8pt; color: #94a3b8; margin-top: 2px;">Firma de Elaboración</div>
      </td>
      <td>
        <div class="sign-line"></div>
        <div style="font-size: 9pt; font-weight: bold; color: #475569; text-transform: uppercase;">Dirección Escolar</div>
        <div style="font-size: 8pt; color: #94a3b8; margin-top: 2px;">Sello y Vo.Bo.</div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Proyecto_${(proyecto.nombre || 'EduNEM').replace(/\s+/g, '_')}_NEM_2025-2026.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==========================================
// EXPORTACIÓN DE EXÁMENES NEM
// ==========================================

/**
 * Genera un archivo Word con dos secciones:
 * 1. Examen para el alumno, sin respuestas.
 * 2. Clave y criterios de evaluación para el docente.
 */
export function exportarExamenWord(examen: Examen) {
  const titulo = escapeHtml(examen.titulo || 'Examen de evaluación NEM');
  const grado = escapeHtml(examen.grado || 'Primaria');
  const campo = escapeHtml(examen.campoFormativo || '');
  const contenido = escapeHtml(examen.contenido || '');
  const pda = escapeHtml(examen.pda || '');
  const instrucciones = escapeHtml(examen.instrucciones || 'Lee cuidadosamente cada pregunta y responde según se te indique.')
    .replace(/\n/g, '<br/>');

  const preguntasHtml = (examen.preguntas || [])
    .map((pregunta: PreguntaExamen, indice: number) => {
      const numero = pregunta.numero || indice + 1;
      const valor = Number(pregunta.valor) || 1;

      let contenidoPregunta = '';

      if (pregunta.tipo === 'opcion_multiple') {
        const opciones = (pregunta.opciones || [])
          .map((opcion, i) => `
            <div style="margin: 5px 0 5px 20px;">
              <strong>${String.fromCharCode(65 + i)}.</strong>
              ${escapeHtml(opcion)}
            </div>
          `)
          .join('');

        contenidoPregunta = `
          <div style="margin-top: 8px;">
            ${opciones}
          </div>
        `;
      } else if (pregunta.tipo === 'verdadero_falso') {
        contenidoPregunta = `
          <div style="margin: 10px 0 0 20px;">
            ( &nbsp; ) Verdadero
            &nbsp;&nbsp;&nbsp;&nbsp;
            ( &nbsp; ) Falso
          </div>
        `;
      } else if (pregunta.tipo === 'relacionar_columnas') {
        const columnaA = pregunta.columnaA || [];
        const columnaB = pregunta.columnaB || [];

        contenidoPregunta = `
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="width: 50%; vertical-align: top; padding: 8px;">
                <strong>Columna A</strong>
                <ol>
                  ${columnaA.map(item => `<li style="margin-bottom: 8px;">${escapeHtml(item)}</li>`).join('')}
                </ol>
              </td>
              <td style="width: 50%; vertical-align: top; padding: 8px;">
                <strong>Columna B</strong>
                <ol>
                  ${columnaB.map(item => `<li style="margin-bottom: 8px;">${escapeHtml(item)}</li>`).join('')}
                </ol>
              </td>
            </tr>
          </table>
          <div style="margin-top: 8px;">
            Escribe las correspondencias:
            <div style="border-bottom: 1px solid #94a3b8; height: 24px;"></div>
          </div>
        `;
      } else if (pregunta.tipo === 'respuesta_abierta') {
        contenidoPregunta = `
          <div style="margin-top: 12px;">
            <div style="border-bottom: 1px solid #94a3b8; height: 24px;"></div>
            <div style="border-bottom: 1px solid #94a3b8; height: 24px;"></div>
            <div style="border-bottom: 1px solid #94a3b8; height: 24px;"></div>
          </div>
        `;
      }

      return `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top;">
                <strong style="color: #1e3a2f; font-size: 11pt;">
                  ${numero}. ${escapeHtml(pregunta.enunciado)}
                </strong>
              </td>
              <td style="width: 75px; text-align: right; vertical-align: top; white-space: nowrap;">
                <span style="font-size: 9pt; color: #64748b;">(${valor} pts.)</span>
              </td>
            </tr>
          </table>
          ${contenidoPregunta}
        </div>
      `;
    })
    .join('');

  const criteriosHtml = (examen.criteriosEvaluacion || [])
    .map(criterio => `
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">
          ${escapeHtml(criterio.criterio)}
        </td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">
          ${escapeHtml(criterio.descripcion)}
        </td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">
          ${Number(criterio.puntaje) || 0}
        </td>
      </tr>
    `)
    .join('');

  const claveHtml = (examen.claveRespuestas || [])
    .map((respuesta, indice) => `
      <tr>
        <td style="width: 45px; border: 1px solid #cbd5e1; padding: 8px; text-align: center;">
          ${indice + 1}
        </td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">
          ${escapeHtml(respuesta)}
        </td>
      </tr>
    `)
    .join('');

  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${titulo}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: letter portrait;
      margin: 1.8cm;
    }
    body {
      font-family: Calibri, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.45;
      color: #1e293b;
      background: #ffffff;
    }
    .header {
      border-bottom: 3px solid #1e3a2f;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }
    .header-tag {
      font-size: 9pt;
      font-weight: bold;
      color: #5A5A40;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .header-title {
      font-family: Georgia, serif;
      font-size: 20pt;
      font-weight: bold;
      color: #1e3a2f;
      margin: 6px 0;
    }
    .subtitle {
      color: #64748b;
      font-size: 10pt;
    }
    .meta {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
      background: #f8fafc;
    }
    .meta td {
      border: 1px solid #cbd5e1;
      padding: 8px;
      vertical-align: top;
      font-size: 9.5pt;
    }
    .meta-label {
      display: block;
      color: #64748b;
      font-size: 8pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .section-title {
      color: #1e3a2f;
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 5px;
      margin: 18px 0 10px 0;
    }
    .student-data {
      width: 100%;
      border-collapse: collapse;
      margin: 18px 0;
    }
    .student-data td {
      padding: 8px 5px;
      border-bottom: 1px solid #cbd5e1;
      font-size: 10pt;
    }
    .question {
      margin-bottom: 18px;
    }
    .teacher-page {
      page-break-before: always;
      mso-break-type: page;
    }
    .teacher-warning {
      border: 1px solid #b45309;
      background: #fffbeb;
      color: #92400e;
      padding: 10px;
      margin: 12px 0 18px 0;
      font-weight: bold;
      text-align: center;
    }
    .teacher-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 18px 0;
      font-size: 9.5pt;
    }
    .teacher-table th {
      background: #e2e8f0;
      border: 1px solid #cbd5e1;
      padding: 8px;
      text-align: left;
      color: #1e3a2f;
    }
    .teacher-table td {
      border: 1px solid #cbd5e1;
      padding: 8px;
      vertical-align: top;
    }
    .recommendations {
      border-left: 4px solid #5A5A40;
      background: #f8fafc;
      padding: 12px;
      margin-top: 14px;
    }
    .signatures {
      width: 100%;
      margin-top: 38px;
      border-collapse: collapse;
    }
    .signatures td {
      width: 50%;
      text-align: center;
      padding: 25px 15px 0 15px;
    }
    .sign-line {
      border-top: 1px solid #475569;
      width: 75%;
      margin: 0 auto 6px auto;
    }
  </style>
</head>
<body>

  <!-- EXAMEN DEL ALUMNO -->
  <div class="header">
    <div class="header-tag">Nueva Escuela Mexicana • Evaluación del aprendizaje</div>
    <div class="header-title">${titulo}</div>
    <div class="subtitle">Instrumento de evaluación para educación primaria</div>
  </div>

  <table class="meta">
    <tr>
      <td style="width: 50%;">
        <span class="meta-label">Grado escolar</span>
        <strong>${grado}</strong>
      </td>
      <td style="width: 50%;">
        <span class="meta-label">Campo formativo</span>
        <strong>${campo}</strong>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <span class="meta-label">Contenido curricular</span>
        ${contenido}
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <span class="meta-label">Proceso de Desarrollo de Aprendizaje (PDA)</span>
        ${pda}
      </td>
    </tr>
  </table>

  <table class="student-data">
    <tr>
      <td style="width: 50%;"><strong>Nombre del alumno:</strong></td>
      <td style="width: 50%;"></td>
    </tr>
    <tr>
      <td><strong>Fecha:</strong></td>
      <td><strong>Calificación:</strong></td>
    </tr>
  </table>

  <div class="section-title">Instrucciones</div>
  <p>${instrucciones}</p>

  <div class="section-title">Preguntas</div>
  ${preguntasHtml}

  <div style="margin-top: 25px; border-top: 2px solid #1e3a2f; padding-top: 10px;">
    <strong>Puntaje total: ${Number(examen.puntajeTotal) || 0} puntos</strong>
  </div>

  <table class="signatures">
    <tr>
      <td>
        <div class="sign-line"></div>
        <strong>Firma del alumno</strong>
      </td>
      <td>
        <div class="sign-line"></div>
        <strong>Firma del docente</strong>
      </td>
    </tr>
  </table>

  <!-- SALTO DE PÁGINA: SECCIÓN EXCLUSIVA DEL DOCENTE -->
  <div class="teacher-page">

    <div class="header">
      <div class="header-tag">Nueva Escuela Mexicana • Material docente</div>
      <div class="header-title">Clave de respuestas y evaluación</div>
      <div class="subtitle">${titulo} — ${grado}</div>
    </div>

    <div class="teacher-warning">
      USO EXCLUSIVO DEL DOCENTE. NO ENTREGAR ESTA SECCIÓN AL ALUMNO.
    </div>

    <div class="section-title">Clave de respuestas</div>

    <table class="teacher-table">
      <thead>
        <tr>
          <th style="width: 45px;">N.º</th>
          <th>Respuesta correcta o respuesta esperada</th>
        </tr>
      </thead>
      <tbody>
        ${claveHtml || '<tr><td colspan="2">No se generó una clave de respuestas.</td></tr>'}
      </tbody>
    </table>

    <div class="section-title">Criterios de evaluación</div>

    <table class="teacher-table">
      <thead>
        <tr>
          <th>Criterio</th>
          <th>Descripción</th>
          <th style="width: 75px;">Puntos</th>
        </tr>
      </thead>
      <tbody>
        ${criteriosHtml || '<tr><td colspan="3">No se generaron criterios de evaluación.</td></tr>'}
      </tbody>
    </table>

    <div class="section-title">Recomendaciones para el docente</div>

    <div class="recommendations">
      ${escapeHtml(examen.recomendacionesDocente || 'Revisar los resultados e identificar los aprendizajes que requieren reforzamiento.').replace(/\n/g, '<br/>')}
    </div>

    <div style="margin-top: 20px;">
      <strong>Puntaje total del examen:</strong>
      ${Number(examen.puntajeTotal) || 0} puntos
    </div>

    <table class="signatures">
      <tr>
        <td>
          <div class="sign-line"></div>
          <strong>Docente responsable</strong>
        </td>
        <td>
          <div class="sign-line"></div>
          <strong>Dirección escolar</strong>
        </td>
      </tr>
    </table>

  </div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `Examen_${(examen.grado || 'Primaria').replace(/\s+/g, '_')}_${(examen.campoFormativo || 'NEM').replace(/\s+/g, '_')}.doc`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ==========================================
// EXPORTACIÓN DE FICHAS DE MATEMÁTICAS
// ==========================================

/**
 * Genera un archivo Word editable (.doc) con la ficha para el alumno
 * y, en una sección separada, la clave de respuestas para el docente.
 */
export function exportarFichasMatematicasWord(ficha: FichaMatematica) {
  const titulo = escapeHtml(ficha.titulo || 'Ficha de Matemáticas');
  const grado = escapeHtml(ficha.grado || 'Primaria');
  const tema = escapeHtml(ficha.tema || 'Matemáticas');
  const objetivo = escapeHtml(ficha.objetivo || '');
  const instrucciones = escapeHtml(
    ficha.instrucciones || 'Lee cuidadosamente cada ejercicio y escribe tus respuestas.'
  ).replace(/\n/g, '<br/>');

  const ejercicios = (ficha.ejercicios || [])
    .map((ejercicio: EjercicioMatematico, indice: number) => {
      const numero = Number(ejercicio.numero) || indice + 1;
      const espacio = Math.max(1, Math.min(8, Number(ejercicio.espacioRespuesta) || 3));
      const lineasRespuesta = Array.from({ length: espacio }, () =>
        '<div class="answer-line"></div>'
      ).join('');
      const opciones = Array.isArray(ejercicio.opciones) && ejercicio.opciones.length
        ? `<div class="options">${ejercicio.opciones.map((opcion, i) =>
            `<div class="option">${String.fromCharCode(65 + i)}. ${escapeHtml(opcion)}</div>`
          ).join('')}</div>`
        : '';
      const esOperacion = ejercicio.tipo === 'operacion' || ejercicio.tipo === 'completar';
      const area = esOperacion
        ? `<div class="work-area"><strong>Resuelve:</strong>${lineasRespuesta}</div>`
        : `<div class="work-area"><strong>Procedimiento y respuesta:</strong>${lineasRespuesta}</div>`;

      return `
        <div class="exercise">
          <div class="exercise-title">${numero}. ${escapeHtml(ejercicio.enunciado)}</div>
          ${opciones}
          ${area}
        </div>
      `;
    })
    .join('');

  const respuestas = (ficha.ejercicios || [])
    .map((ejercicio: EjercicioMatematico, indice: number) => `
      <tr>
        <td class="number-cell">${Number(ejercicio.numero) || indice + 1}</td>
        <td>
          <strong>${escapeHtml(ejercicio.respuestaCorrecta || 'Sin respuesta')}</strong>
          ${ejercicio.procedimiento
            ? `<div class="procedure">${escapeHtml(ejercicio.procedimiento).replace(/\n/g, '<br/>')}</div>`
            : ''}
        </td>
      </tr>
    `)
    .join('');

  const recomendaciones = escapeHtml(
    ficha.recomendacionesDocente || 'Verificar los procedimientos utilizados por el alumnado y reforzar los aprendizajes que lo requieran.'
  ).replace(/\n/g, '<br/>');

  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${titulo}</title>
  <!--[if gte mso 9]>
  <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>
  <![endif]-->
  <style>
    @page { size: letter portrait; margin: 1.7cm; }
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #1e293b; }
    .header { border-bottom: 3px solid #1e3a2f; padding-bottom: 10px; margin-bottom: 16px; }
    .header-tag { font-size: 9pt; font-weight: bold; color: #64748b; letter-spacing: 1px; text-transform: uppercase; }
    .header-title { font-family: Georgia, serif; font-size: 21pt; font-weight: bold; color: #1e3a2f; margin: 5px 0; }
    .subtitle { font-size: 10pt; color: #64748b; }
    .meta { width: 100%; border-collapse: collapse; margin: 14px 0; }
    .meta td { border: 1px solid #cbd5e1; padding: 8px; width: 50%; }
    .meta-label { display: block; font-size: 8pt; color: #64748b; font-weight: bold; text-transform: uppercase; }
    .student-data { width: 100%; border-collapse: collapse; margin: 16px 0; }
    .student-data td { padding: 9px 5px; border-bottom: 1px solid #94a3b8; }
    .section-title { font-size: 11pt; font-weight: bold; color: #1e3a2f; text-transform: uppercase; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 5px; margin: 18px 0 10px; }
    .objective { border-left: 4px solid #5A5A40; background: #f8fafc; padding: 10px 12px; margin: 12px 0; }
    .exercise { margin: 17px 0 22px; page-break-inside: avoid; }
    .exercise-title { font-size: 11pt; font-weight: bold; color: #1e293b; }
    .options { margin: 8px 0 8px 20px; }
    .option { margin: 4px 0; }
    .work-area { margin: 10px 0 0 18px; color: #475569; font-size: 9.5pt; }
    .answer-line { height: 23px; border-bottom: 1px solid #cbd5e1; }
    .teacher-page { page-break-before: always; mso-break-type: page; }
    .warning { border: 1px solid #b45309; background: #fffbeb; color: #92400e; font-weight: bold; text-align: center; padding: 10px; margin: 14px 0; }
    .answer-table { width: 100%; border-collapse: collapse; margin: 12px 0 18px; }
    .answer-table th { background: #e2e8f0; color: #1e3a2f; text-align: left; }
    .answer-table th, .answer-table td { border: 1px solid #cbd5e1; padding: 9px; vertical-align: top; }
    .number-cell { width: 45px; text-align: center; }
    .procedure { margin-top: 5px; color: #475569; font-size: 9.5pt; }
    .recommendations { border-left: 4px solid #5A5A40; background: #f8fafc; padding: 12px; }
  </style>
</head>
<body>
  <!-- FICHA PARA EL ALUMNO -->
  <div class="header">
    <div class="header-tag">EduNEM • Material de apoyo escolar</div>
    <div class="header-title">${titulo}</div>
    <div class="subtitle">Ficha de trabajo de Matemáticas</div>
  </div>

  <table class="meta">
    <tr>
      <td><span class="meta-label">Grado escolar</span><strong>${grado}</strong></td>
      <td><span class="meta-label">Tema</span><strong>${tema}</strong></td>
    </tr>
  </table>

  <table class="student-data">
    <tr><td><strong>Nombre del alumno:</strong></td><td></td></tr>
    <tr><td><strong>Grupo:</strong></td><td><strong>Fecha:</strong></td></tr>
  </table>

  ${objetivo ? `<div class="objective"><strong>Propósito:</strong> ${objetivo}</div>` : ''}
  <div class="section-title">Instrucciones</div>
  <p>${instrucciones}</p>
  <div class="section-title">Ejercicios</div>
  ${ejercicios || '<p>No hay ejercicios disponibles.</p>'}

  <!-- CLAVE DE RESPUESTAS: USO EXCLUSIVO DEL DOCENTE -->
  <div class="teacher-page">
    <div class="header">
      <div class="header-tag">EduNEM • Material docente</div>
      <div class="header-title">Clave de respuestas</div>
      <div class="subtitle">${titulo} — ${grado} — ${tema}</div>
    </div>
    <div class="warning">USO EXCLUSIVO DEL DOCENTE. NO ENTREGAR ESTA SECCIÓN AL ALUMNO.</div>
    <div class="section-title">Respuestas y procedimientos</div>
    <table class="answer-table">
      <thead><tr><th style="width:45px;">N.º</th><th>Respuesta correcta y procedimiento sugerido</th></tr></thead>
      <tbody>${respuestas || '<tr><td colspan="2">No se generaron respuestas.</td></tr>'}</tbody>
    </table>
    <div class="section-title">Recomendaciones para el docente</div>
    <div class="recommendations">${recomendaciones}</div>
  </div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const nombreArchivo = (ficha.grado || 'Primaria').replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/g, '_');
  link.download = `Ficha_Matematicas_${nombreArchivo}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}



