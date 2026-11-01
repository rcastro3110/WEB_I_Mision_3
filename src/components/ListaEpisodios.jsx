import { notaMedia } from "../logica.js";

export default function ListaEpisodios({ porTemporada }) {
  return (
    <section className="episodios">
      {Object.entries(porTemporada).map(([temporada, episodios]) => {
        const media = notaMedia(episodios);
       return (
        <div key={temporada}>
          <h3>
            Season {temporada}
            {media !== null && (
              <span className="anio"> · Avg ⭐ {media.toFixed(1)}</span>
            )}  
          </h3>
          <ul className="episodios__lista">
            {episodios.map((e) => (
              <li key={e.id} className="episodio">
                <span>{e.numero}. {e.nombre}</span>
                <span>{e.fecha}</span>
                <span>⭐ {e.nota ?? "No rating"}</span>
              </li>
            ))}
          </ul>
        </div>
        );
      })}
    </section>
  );
}