import { getAllStockHistoria } from "../api/stockhistorial.api";
import { useEffect, useState } from "react";

export  function StockHistorial() {
  const [stockHistorial, setStockHistorial] = useState([]);

  useEffect(()=>{
    async function cargarStock() {
      const res = await getAllStockHistoria();
      setStockHistorial(res.data)
    }
    cargarStock();
  },[])

  return (
    <div className="container pt-4">
      <h1 className="text-center">Kardex Entradas</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Cantidad Ingresada</th>
            <th scope="col">Fecha de Ingreso</th>
            <th scope="col">Precio</th>
            <th scope="col">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {stockHistorial.map((stock) => (
            <tr key={stock.id}>
              <th>{stock.codigo}</th>
              <td>{stock.cantidad_ingresada}</td>
              <td>{stock.fecha}</td>
              <td>{stock.precio}</td>
              <td>{stock.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
