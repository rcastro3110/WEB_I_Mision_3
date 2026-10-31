import { useState } from "react";
import FormularioBusqueda from "./components/FormularioBusqueda.jsx";
import ListaSeries from "./components/ListaSeries.jsx";
import { soloConNota as filtrarConNota, notaMedia } from "./logica.js";

const seriesDePrueba = [
  { id: 169, nombre: "Breaking Bad", poster: null, nota: 9.2, generos: ["Drama", "Crime"], estado: "Ended", estreno: "2008" },
  { id: 510, nombre: "Breaking In", poster: null, nota: null, generos: [], estado: "Ended", estreno: "2011" },
];

export default function App() {
  const [texto, setTexto] = useState("");
  const [soloConNota, setSoloConNota] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [series, setSeries] = useState(seriesDePrueba); // de momento, de mentira
  const [idElegida, setIdElegida] = useState(null);

  // Valores DERIVADOS: se calculan en cada render, no son estado
  const seriesVisibles = soloConNota ? filtrarConNota(series) : series;
  const media = notaMedia(seriesVisibles);

  function buscar() {
    console.log("Buscar:", texto); // el fetch real llega en el paso 6
  }

  return (
    <>
      <h1>TV Show Finder</h1>
      <FormularioBusqueda
        texto={texto}
        soloConNota={soloConNota}
        alCambiarTexto={setTexto}
        alCambiarSoloConNota={setSoloConNota}
        alBuscar={buscar}
      />
      {media !== null && <p className="media">Average rating: {media.toFixed(1)}</p>}
      <ListaSeries series={seriesVisibles} alElegir={setIdElegida} />
      <p>Serie elegida: {idElegida ?? "ninguna"}</p>
    </>
  );
}