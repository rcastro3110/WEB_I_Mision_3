import FormularioBusqueda from "./components/FormularioBusqueda.jsx";
import ListaSeries from "./components/ListaSeries.jsx";
import DetalleSerie from "./components/DetalleSerie.jsx";

const seriesDePrueba = [
  { id: 169, nombre: "Breaking Bad", poster: null, nota: 9.2, generos: ["Drama", "Crime"], estado: "Ended", estreno: "2008" },
  { id: 510, nombre: "Breaking In", poster: null, nota: null, generos: [], estado: "Ended", estreno: "2011" },
];

const detalleDePrueba = {
  id: 169, nombre: "Breaking Bad", poster: null, nota: 9.2, generos: ["Drama"],
  estado: "Ended", estreno: "2008-01-20", cadena: "AMC", resumen: "Un profesor de química...",
};

const episodiosDePrueba = {
  1: [{ id: 1, numero: 1, nombre: "Pilot", fecha: "2008-01-20", nota: 8.9 }],
  2: [{ id: 2, numero: 1, nombre: "Seven Thirty-Seven", fecha: "2009-03-08", nota: null }],
};

export default function App() {
  return (
    <>
      <h1>TV Show Finder</h1>
      <FormularioBusqueda
        texto=""
        soloConNota={false}
        alCambiarTexto={() => {}}
        alCambiarSoloConNota={() => {}}
        alBuscar={() => {}}
      />
      <ListaSeries series={seriesDePrueba} alElegir={(id) => console.log("Elegida", id)} />
      <DetalleSerie serie={detalleDePrueba} porTemporada={episodiosDePrueba} alVolver={() => {}} />
    </>
  );
}