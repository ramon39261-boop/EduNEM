const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export async function generarJSON(prompt, instrucciones) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    const error = new Error("Falta configurar NVIDIA_API_KEY en las variables de entorno de Vercel.");
    error.status = 500;
    throw error;
  }

  const model = process.env.NVIDIA_MODEL || "openai/gpt-oss-20b";
  const response = await fetch(NVIDIA_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: instrucciones },
        { role: "user", content: prompt },
      ],
      temperature: 0.35,
      max_tokens: 5000,
      stream: false,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload?.error?.message || payload?.message || `NVIDIA respondió HTTP ${response.status}`;
    const error = new Error(detail);
    error.status = response.status;
    throw error;
  }

  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("NVIDIA no devolvió contenido. Intenta nuevamente.");
  }

  // Elimina cercas Markdown si el modelo las agrega.
  const cleaned = content.trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try { return JSON.parse(cleaned.slice(start, end + 1)); } catch {}
    }
    throw new Error("La IA respondió, pero el formato no fue JSON válido. Intenta generar nuevamente.");
  }
}

export function responderError(res, error) {
  console.error("EduNEM NVIDIA API:", error);
  return res.status(error.status || 500).json({
    error: error.message || "Error al comunicarse con NVIDIA.",
  });
}
