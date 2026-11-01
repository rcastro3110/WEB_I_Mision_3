function quitarEtiquetas(html) {
  return html.replace(/<[^>]*>/g, "");
}

export function limpiarSeries(resultados) {
  return resultados.map(({ show }) => ({
    id: show.id,
    nombre: show.name,
    poster: show.image?.medium ?? null,
    nota: show.rating?.average ?? null,
    generos: show.genres ?? [],
    estado: show.status,
    estreno: show.premiered ? show.premiered.slice(0, 4) : "?",
  }));
}

export function limpiarDetalle(serie) {
  return {
    id: serie.id,
    nombre: serie.name,
    poster: serie.image?.medium ?? null,
    nota: serie.rating?.average ?? null,
    generos: serie.genres ?? [],
    estado: serie.status,
    estreno: serie.premiered ?? "?",
    cadena: serie.network?.name ?? serie.webChannel?.name ?? "Unknown",
    resumen: quitarEtiquetas(serie.summary ?? "No summary."),
  };
}

export function soloConNota(series) {
  return series.filter((s) => s.nota !== null);
}

export function notaMedia(series) {
  const conNota = soloConNota(series);
  if (conNota.length === 0) return null;

  const suma = conNota.reduce((acc, s) => acc + s.nota, 0);
  return suma / conNota.length;
}

export function limpiarEpisodios(serie) {
  const episodios = serie._embedded?.episodes ?? [];
  return episodios.map((e) => ({
    id: e.id,
    temporada: e.season,
    numero: e.number ?? "Special",
    nombre: e.name,
    fecha: e.airdate ?? "No date",
    nota: e.rating?.average ?? null
  }));
}

export function agruparPorTemporada(episodios) {
  return Object.groupBy(episodios, (e) => e.temporada);
}