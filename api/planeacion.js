// api/planeacion.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { prompt } = req.body;
    
    // Aquí puedes realizar la llamada a la API de Gemini desde el servidor de Vercel
    // utilizando process.env.VITE_API_KEY o tu clave privada.

    return res.status(200).json({ 
      resultado: "Aquí irá tu planeación generada" 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
