import { getAllVentasHistorial } from "../api/ventasHistorial.api";
import { useEffect, useState } from "react";

export function VentasHistorial() {
  const [ventasHistorial, setVentasHistorial] = useState([]);

  useEffect(() => {
    async function cargarVentasHistorial() {
      const res = await getAllVentasHistorial();
      setVentasHistorial(res.data)
    }
    cargarVentasHistorial();
  },[]);

  return(
  <div className="container pt-4">
      <h1 className="text-center">Kardex Salidas</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Cantidad De venta</th>
            <th scope="col">Fecha de Venta</th>
            <th scope="col">Precio</th>
            <th scope="col">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {ventasHistorial.map((ventas) => (
            <tr key={ventas.id}>
              <th>{ventas.codigo}</th>
              <td>{ventas.cantidad_venta}</td>
              <td>{ventas.fecha}</td>
              <td>{ventas.precio}</td>
              <td>{ventas.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

