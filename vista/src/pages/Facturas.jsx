import { useEffect, useState } from "react";
import { getAllFacturas } from "../api/facturas.api";
import { Link } from "react-router-dom";

export function Facturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    async function cargarFacturas() {
      const res = await getAllFacturas();
      setFacturas(res.data);
    }
    cargarFacturas();
  }, []);

  return (
    <div className="container pt-4">
      <h1 className="text-center">Facturas</h1>
      <div><Link to='/crear-factura'>Crear factura</Link></div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Fecha Factura</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Factura</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura)=>(
            <tr key={factura.id}>
              <td>{factura.fecha}</td>
              <td>{factura.proveedor}</td>
              <td><a href={factura.file} target="_blank" rel="noopener noreferrer">Ver archivo</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
