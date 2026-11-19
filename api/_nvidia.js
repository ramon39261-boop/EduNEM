
const AGNES_URL = "https://apihub.agnes-ai.com/v1/chat/completions";

export async function generarJSON(prompt, instrucciones) {
  const apiKey = process.env.AGNES_API_KEY;

  if (!apiKey) {
    const error = new Error("Falta configurar AGNES_API_KEY en Vercel.");
    error.status = 500;
    throw error;
  }

  const model = process.env.AGNES_MODEL || "agnes-2.5-flash";

  const response = await fetch(AGNES_URL, {
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

  const rawBody = await response.text();

  let payload = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    payload = {};
  }

  if (!response.ok) {
    const detail =
      payload?.error?.message ||
      payload?.detail ||
      payload?.message ||
      payload?.title ||
      rawBody ||
      `Agnes respondió HTTP ${response.status}`;

    const error = new Error(
      `Agnes HTTP ${response.status}: ${String(detail).slice(0, 1500)}`
    );

    error.status = response.status;
    throw error;
  }

  const content = payload?.choices?.[0]?.message?.content;

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Agnes no devolvió contenido. Intenta nuevamente.");
  }

  const cleaned = content.trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {}
    }

    throw new Error("Agnes respondió, pero el formato no fue JSON válido.");
  }
}

export function responderError(res, error) {
  console.error("EduNEM Agnes API:", error);

  return res.status(error.status || 500).json({
    error: error.message || "Error al comunicarse con Agnes.",
  });
}


