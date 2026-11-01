import { useState, useEffect } from "react";
import FormularioBusqueda from "./components/FormularioBusqueda.jsx";
import ListaSeries from "./components/ListaSeries.jsx";
import DetalleSerie from "./components/DetalleSerie.jsx";
import { buscarSeries, buscarEpisodios } from "./api.js";
import {
  limpiarSeries,
  limpiarDetalle,
  limpiarEpisodios,
  agruparPorTemporada,
  soloConNota,
  notaMedia,
} from "./logica.js";

function mensajeDeError(error) {
  return error instanceof TypeError
    ? "Could not connect. Check your internet connection."
    : error.message;
}

export default function App() {
  // Estado de la búsqueda
  const [texto, setTexto] = useState("");
  const [consulta, setConsulta] = useState("");
  const [tienenNota, setTieneNota] = useState(false);
  const [series, setSeries] = useState([]);
  const [estado, setEstado] = useState("idle");
  const [error, setError] = useState(null);

  // Estado del detalle
  const [idElegida, setIdElegida] = useState(null);
  const [serieDetalle, setSerieDetalle] = useState(null);
  const [estadoDetalle, setEstadoDetalle] = useState("idle");
  const [errorDetalle, setErrorDetalle] = useState(null);

  // Efecto 1: buscar series
  useEffect(() => {
    if (!consulta) return;

    let ignorar = false;

    buscarSeries(consulta)
      .then((datos) => {
        if (ignorar) return;
        setSeries(limpiarSeries(datos));
        setEstado("ok");
      })
      .catch((e) => {
        if (ignorar) return;
        setError(mensajeDeError(e));
        setEstado("error");
      });

    return () => {
      ignorar = true;
    };
  }, [consulta]);

  // Efecto 2: pedir el detalle de la serie elegida
  useEffect(() => {
    if (idElegida === null) return;

    let ignorar = false;

    buscarEpisodios(idElegida)
      .then((datos) => {
        if (ignorar) return;
        setSerieDetalle(datos);
        setEstadoDetalle("ok");
      })
      .catch((e) => {
        if (ignorar) return;
        setErrorDetalle(mensajeDeError(e));
        setEstadoDetalle("error");
      });

    return () => {
      ignorar = true;
    };
  }, [idElegida]);

  // Valores derivados (no son estado)
  const seriesVisibles = tienenNota ? soloConNota(series) : series;
  const media = notaMedia(seriesVisibles);
  const detalle = serieDetalle ? limpiarDetalle(serieDetalle) : null;
  const porTemporada = serieDetalle
    ? agruparPorTemporada(limpiarEpisodios(serieDetalle))
    : null;

  // Manejadores de eventos
  function buscar() {
    const limpio = texto.trim();
    if (!limpio || limpio === consulta) return;
    setEstado("cargando");
    setConsulta(limpio);
  }

  function elegir(id) {
    setEstadoDetalle("cargando");
    setSerieDetalle(null);
    setIdElegida(id);
  }

  function volver() {
    setIdElegida(null);
    setEstadoDetalle("idle");
  }

  return (
    <>
      <header className="cabecera">
        <h1>TV Show Finder</h1>
        {idElegida === null && (
          <FormularioBusqueda
            texto={texto}
            soloConNota={tienenNota}
            alCambiarTexto={setTexto}
            alCambiarSoloConNota={setTieneNota}
            alBuscar={buscar}
            ocupado={estado === "cargando"}
          />
        )}
      </header>

      {idElegida === null ? (
        <>
          {estado === "cargando" && <p className="estado">⏳ Loading…</p>}
          {estado === "error" && (
            <p className="estado estado--error">⚠ {error}</p>
          )}
          {estado === "ok" && seriesVisibles.length === 0 && (
            <p className="estado">No results found.</p>
          )}
          {estado === "ok" && media !== null && (
            <p className="media">Average rating: {media.toFixed(1)}</p>
          )}
          {estado === "ok" && seriesVisibles.length > 0 && (
            <ListaSeries series={seriesVisibles} alElegir={elegir} />
          )}
        </>
      ) : (
        <>
          {estadoDetalle === "cargando" && (
            <>
              <button className="volver" onClick={volver}>← Back</button>
              <p className="estado">⏳ Loading…</p>
            </>
          )}
          {estadoDetalle === "error" && (
            <>
              <button className="volver" onClick={volver}>← Back</button>
              <p className="estado estado--error">⚠ {errorDetalle}</p>
            </>
          )}
          {estadoDetalle === "ok" && detalle && (
            <DetalleSerie
              serie={detalle}
              porTemporada={porTemporada}
              alVolver={volver}
            />
          )}
        </>
      )}
    </>
  );
}