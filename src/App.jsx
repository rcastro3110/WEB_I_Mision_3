import { useState } from "react";
import FormularioBusqueda from "./components/FormularioBusqueda.jsx";
import ListaSeries from "./components/ListaSeries.jsx";
import DetalleSerie from "./components/DetalleSerie.jsx";
import EstadoCarga from "./components/EstadoCarga.jsx";
import useFetch from "./hooks/useFetch.js";
import { buscarSeries, buscarEpisodios } from "./api.js";
import {
  limpiarSeries,
  limpiarDetalle,
  limpiarEpisodios,
  agruparPorTemporada,
  soloConNota,
} from "./logica.js";

export default function App() {
  const [texto, setTexto] = useState("");
  const [consulta, setConsulta] = useState("");
  const [tienenNota, setTieneNota] = useState(false);
  const [idElegida, setIdElegida] = useState(null);

  const busqueda = useFetch(buscarSeries, consulta);
  const pedidoDetalle = useFetch(buscarEpisodios, idElegida);

  const series = busqueda.datos ? limpiarSeries(busqueda.datos) : [];
  const seriesVisibles = tienenNota ? soloConNota(series) : series;
  const detalle = pedidoDetalle.datos ? limpiarDetalle(pedidoDetalle.datos) : null;
  const porTemporada = pedidoDetalle.datos ? agruparPorTemporada(limpiarEpisodios(pedidoDetalle.datos)) : null;

  function buscar() {
    const limpio = texto.trim();
    if (!limpio) return;
    if (limpio === consulta) {
      if(busqueda.estado === "error") busqueda.reintentar();
      return;
    }
    setConsulta(limpio);
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
            ocupado={busqueda.estado === "cargando"}
          />
        )}
      </header>

      {idElegida === null ? (
        <>
          <EstadoCarga estado={busqueda.estado} error={busqueda.error} />
          {busqueda.estado === "ok" && seriesVisibles.length === 0 && (
            <p className="estado">No results found.</p>
          )}
          {seriesVisibles.length > 0 && (
            <ListaSeries series={seriesVisibles} alElegir={setIdElegida} />
          )}
        </>
      ) : (
        <>
          <EstadoCarga
            estado={pedidoDetalle.estado}
            error={pedidoDetalle.error}
            alVolver={() => setIdElegida(null)}
          />
          {detalle && (
            <DetalleSerie
              serie={detalle}
              porTemporada={porTemporada}
              alVolver={() => setIdElegida(null)}
            />
          )}
        </>
      )}
    </>
  );
}