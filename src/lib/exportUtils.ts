import { Planeacion, Proyecto } from '../types';

/**
 * Escapes HTML characters for safe document embedding
 */
function escapeHtml(text?: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Genera y descarga un archivo Word (.doc) exactamente igual al diseño y contenido generado para la Planeación Didáctica
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
  <!-- Encabezado Institucional -->
  <table class="header-table" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div class="header-tag">NUEVA ESCUELA MEXICANA • CICLO ESCOLAR 2025-2026</div>
        <div class="header-title">${titulo}</div>
        <div class="header-sub">Documento Oficial de Planeación Didáctica Situada</div>
      </td>
    </tr>
  </table>

  <!-- Metadatos de la Planeación -->
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

  <!-- PDA -->
  <div class="card-section" style="border-left: 4px solid #5A5A40; background-color: #fcfcfb;">
    <div class="section-title">PDA (Proceso de Desarrollo de Aprendizaje)</div>
    <div class="section-content" style="font-weight: 500;">${pda}</div>
  </div>

  <!-- Secuencia Didáctica (Inicio, Desarrollo y Cierre) -->
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

  <!-- Evaluación Formativa -->
  <div class="card-section">
    <div class="section-title">Evaluación Formativa (Criterios e Instrumentos)</div>
    <div class="section-content">${evaluacion}</div>
  </div>

  <!-- Recursos y Materiales -->
  <div class="card-section">
    <div class="section-title">Recursos y Materiales Didácticos</div>
    <ul style="margin: 6px 0 0 18px; padding: 0;">
      ${recursosList || '<li>Materiales y cuadernos de trabajo del aula</li>'}
    </ul>
  </div>

  <!-- Firmas de Autorización -->
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
 * Genera y descarga un archivo Word (.doc) exactamente igual al diseño y contenido generado para el Proyecto Sociocrítico
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
