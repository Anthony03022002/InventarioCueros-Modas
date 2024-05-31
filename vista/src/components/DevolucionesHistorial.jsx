import { getAllDevolucionesHistorial } from "../api/devolucionesHistorial.api";
import { useEffect, useState } from "react";


export  function DevolucionesHistorial() {

    const [devolucionesHistorial, setDevolucionesHistorial] = useState([]);


    useEffect(()=>{
        async function cargarDevolucionesHistorial() {
            const res = await getAllDevolucionesHistorial();
            setDevolucionesHistorial(res.data)
        }
        cargarDevolucionesHistorial();
    },[])

  return (
    <div className="container pt-4">
      <h1 className="text-center">Kardex Devoluciones</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Cantidad De devolucion</th>
            <th scope="col">Fecha de devolucion</th>
            <th scope="col">Precio</th>
            <th scope="col">Responsable</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {devolucionesHistorial.map((devolucion) => (
            <tr key={devolucion.id}>
              <th>{devolucion.codigo}</th>
              <td>{devolucion.cantidad_devolucion}</td>
              <td>{devolucion.fecha}</td>
              <td>{devolucion.precio}</td>
              <td>{devolucion.responsable}</td>
              <td>{devolucion.proveedor}</td>
              <td>{devolucion.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
