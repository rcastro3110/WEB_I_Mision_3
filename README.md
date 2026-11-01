# TV Show Finder (React)

Misión M3 · Reactor Core — Web Development I.

App en React 19 + Vite que busca series de TV con la API pública de TVMaze, muestra su nota y géneros, y abre un detalle con resumen y episodios por temporada. Es la app de la M2 reconstruida con componentes, estado y efectos.


## Qué se puede hacer

- Buscar series por nombre.
- Marcar "Rated only" para ocultar las que no tienen nota (la nota media se recalcula).
- Pulsar una tarjeta para ver el detalle con episodios por temporada.
- Volver con "Back" sin repetir la búsqueda.
- Ver estados de carga y error.

## Estructura

- `src/App.jsx`: guarda el estado, lanza los dos efectos y decide qué vista se pinta.
- `src/components/`: `FormularioBusqueda`, `ListaSeries`, `TarjetaSerie`, `DetalleSerie` y `ListaEpisodios`. Solo pintan props y avisan con funciones.
- `src/api.js`: `fetch` a TVMaze con caché en `localStorage`.
- `src/logica.js`: funciones puras que limpian y transforman los datos.

## Uso de IA

Usé Claude como guía para migrar mi app de la M2 a React. Le pedí que me explicara los conceptos para refrescar lo que dimos en clase y que me diera plantillas por pasos; el diseño y las decisiones las fui cuestionando yo.

Prompts reales:
- "Como se que deberia de usar de la mision 2 y que debo de pasar a jsx"
- "Porque ya no hace falta "escapar" lo que llega de la API"
- "Para qué sirve la nota media si cada serie ya tiene su propia nota, creo que seria mejor pasarlo a calcular la nota media de los episodios"

Cómo verifiqué lo generado: probé cada paso en el navegador y la consola, usé el modo Offline de DevTools para provocar errores, y no di nada por bueno sin entender por qué funcionaba. Cuando algo fallaba (el aviso de `setState` dentro de un efecto, `contenedor is not defined`), leí el error y busqué la causa.

Lo que hice yo: elegí la API y la idea del detalle con episodios, decidí que componentes habia que usar, detecté y corregí bugs (se duplico el formulario de busqueda en `App`, el CSS que cortaba los laterales) y cuestioné decisiones de la IA, como la media de series distintas, que me parecía inútil y por eso la moví a las temporadas. Claude me dio las plantillas de los componentes y el CSS, y yo los fui montando y probando.

## Decisiones

1. Reutilicé `api.js` y `logica.js` de la M2 sin tocarlos. Son funciones puras que no tocan el DOM, así que funcionan igual en React. Lo que desapareció fue `render.js` y `main.js`, porque ahora lo hacen los componentes.
2. Un componente por cada pieza de la interfaz (formulario, lista, tarjeta, detalle, episodios). Cada uno hace una sola cosa y solo recibe props, así se entiende y se arregla más fácil.
3. El estado vive en `App`. El texto, las series y la serie elegida los necesitan varios componentes, así que el estado va en el padre común y los hijos avisan con funciones (`alElegir`, `alVolver`).
4. Lo que se puede calcular no se guarda como estado. La lista filtrada ("Rated only") y la nota media se calculan al renderizar a partir de `series`, así no pueden quedar desincronizadas.
5. Cleanup con `ignorar` en los efectos. Si buscas algo y enseguida otra cosa, la respuesta vieja se descarta. En la M2 hacía lo mismo con contadores, pero con más código.
