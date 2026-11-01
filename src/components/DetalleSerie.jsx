import ListaEpisodios from "./ListaEpisodios.jsx";

export default function DetalleSerie({ serie, porTemporada, alVolver }) {
  return (
    <section className="detalle">
      <button className="volver" onClick={alVolver}>← Back</button>
      <div className="detalle__cabecera">
        {serie.poster ? (
          <img className="detalle__poster" src={serie.poster} alt={`Poster of ${serie.nombre}`} />
        ) : (
          <div className="detalle__poster detalle__poster--vacio">No poster</div>
        )}
        <div>
          <h2>{serie.nombre}</h2>
          <p>⭐ {serie.nota ?? "No rating"}</p>
          <p>{serie.generos.join(", ") || "No genre"}</p>
          <p>{serie.estado} · Premiered: {serie.estreno} · {serie.cadena}</p>
        </div>
      </div>
      <div className="detalle__resumen">{serie.resumen}</div>
      <ListaEpisodios porTemporada={porTemporada} />
    </section>
  );
}