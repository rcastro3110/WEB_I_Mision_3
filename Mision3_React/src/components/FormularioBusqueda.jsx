export default function FormularioBusqueda({
  texto,
  soloConNota,
  alCambiarTexto,
  alCambiarSoloConNota,
  alBuscar,
}) {
  function manejarEnvio(evento) {
    evento.preventDefault();
    alBuscar();
  }

  return (
    <form className="buscador" onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Search for a show..."
        value={texto}
        onChange={(e) => alCambiarTexto(e.target.value)}
      />
      <button type="submit">Search</button>
      <label className="filtro">
        <input
          type="checkbox"
          checked={soloConNota}
          onChange={(e) => alCambiarSoloConNota(e.target.checked)}
        />{" "}
        Rated only
      </label>
    </form>
  );
}