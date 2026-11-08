import { Planeacion, Proyecto } from '../types';

export async function generarPlaneacion(prompt: string, signal?: AbortSignal): Promise<Planeacion> {
  // Use a 45 second timeout controller if no external signal provided
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);
  const combinedSignal = signal || controller.signal;

  try {
    const response = await fetch('/api/planeacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export async function generarIlustracion(descripcion: string, signal?: AbortSignal): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);
  const combinedSignal = signal || controller.signal;

  try {
    const response = await fetch('/api/ilustracion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion }),
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
