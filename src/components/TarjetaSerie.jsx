export default function TarjetaSerie({serie, alElegir}) {
  return (
    <article className="tarjeta" onClick={() => alElegir(serie.id)}>
      {serie.poster ? (
        <img className="tarjeta__poster" src={serie.poster} alt={`Poster of ${serie.nombre}`} />
      ) : (
        <div className="tarjeta__poster tarjeta__poster--vacio">No poster</div>
      )}
      <div className="tarjeta__info">
        <h2>
          {serie.nombre} <span className="anio">({serie.estreno})</span>
        </h2>
        <p className="nota">⭐ {serie.nota ?? "No rating"}</p>
        <p className="generos">{serie.generos.join(", ") || "No genre"}</p>
      </div>
    </article>
  );
}