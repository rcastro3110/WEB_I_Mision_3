export default function EstadoCarga({ estado, error, alVolver }) {
  if (estado !== "cargando" && estado !== "error") return null;

  return (
    <>
      {alVolver && (
        <button className="volver" onClick={alVolver}>← Back</button>
      )}
      {estado === "cargando" ? (
        <p className="estado">⏳ Loading…</p>
      ) : (
        <p className="estado estado--error">⚠ {error}</p>
      )}
    </>
  );
}