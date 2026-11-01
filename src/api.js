const URL_BASE = "https://api.tvmaze.com";

function leerCache(clave){
  try {
    const texto = localStorage.getItem(clave);
    return texto ? JSON.parse(texto): null
  } catch {
    return null; // datos corruptos o localStorage no disponible
  }
}

function guardarCache(clave, datos){
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch {
    // almacenamiento lleno o bloqueado: simplemente no se cachea
  }
}

export async function buscarSeries(texto) {
  const clave = `busqueda:${texto.toLowerCase()}`;
  const guardado = leerCache(clave);
  if (guardado) return guardado;

  const url = `${URL_BASE}/search/shows?q=${encodeURIComponent(texto)}`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
  }
  const datos = await respuesta.json();
  guardarCache(clave, datos);
  return datos;
}

export async function buscarEpisodios(id) {
  const clave = `serie:${id}`;
  const guardado = leerCache(clave);
  if (guardado) return guardado;

  const url = `${URL_BASE}/shows/${id}?embed=episodes`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
  }
  const datos = await respuesta.json();
  guardarCache(clave, datos);
  return datos;
}