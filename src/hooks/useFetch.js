import { useState, useEffect } from "react";

function mensajeDeError(error) {
  return error instanceof TypeError
    ? "Could not connect. Check your internet connection."
    : error.message;
}

export default function useFetch(pedir, parametro) {
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState(null);

  const clave = parametro === null || parametro === "" ? null : `${intento}:${parametro}`;

  useEffect(() => {
    if (clave === null) return;
    let ignorar = false;

    pedir(parametro)
      .then((datos) => {
        if (!ignorar) setResultado({ clave, datos, error: null });
      })
      .catch((e) => {
        if (!ignorar) setResultado({ clave, datos: null, error: mensajeDeError(e) });
      });

    return () => {
      ignorar = true;
    };
  }, [clave, pedir, parametro]);

  
  let estado = "idle";
  if (clave !== null) {
    if (!resultado || resultado.clave !== clave) estado = "cargando";
    else estado = resultado.error ? "error" : "ok";
  }

  return {
    estado,
    datos: estado === "ok" ? resultado.datos : null,
    error: estado === "error" ? resultado.error : null,
    reintentar: () => setIntento((i) => i + 1),
  };
}