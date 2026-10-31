export default function ListaEpisodios({ porTemporada }) {
  return (
    <section className="episodios">
      {Object.entries(porTemporada).map(([temporada, episodios]) => (
        <div key={temporada}>
          <h3>Season {temporada}</h3>
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
      ))}
    </section>
  );
}