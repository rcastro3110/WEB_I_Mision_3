import TarjetaSerie from "./TarjetaSerie.jsx";

export default function ListaSeries({series, alElegir}) {
  return (
    <div className="resultado">
      {series.map((serie) => (
        <TarjetaSerie key={serie.id} serie={serie} alElegir={alElegir} />
      ))}
    </div>
  );
}