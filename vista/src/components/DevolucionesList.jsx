import { getAlldevoluciones } from "../api/devoluciones.api";
import { useEffect, useState } from "react";
import { getAllFacturas } from "../api/facturas.api";
import { Link } from "react-router-dom";


export  function DevolucionesList() {
  const [devoluciones, setDevoluciones] = useState([]);
  const [facturas, setFacturas] = useState([]);


  useEffect(() => {
    async function cargarDevoluciones() {
      const res = await getAlldevoluciones();
      setDevoluciones(res.data);
    }
    cargarDevoluciones();
  }, []);
  useEffect(() => {
    async function cargarFacturas() {
      const res = await getAllFacturas();
      setFacturas(res.data);
    }
    cargarFacturas();
  }, []);

  return (
    <div className="container pt-4">
      <h1 className="text-center">Devoluciones</h1>
      <Link to="/crear-inventario">Ingresar devolucion</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Producto</th>
            <th scope="col">Modelo</th>
            <th scope="col">Talla</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Observacion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {devoluciones.map((devolucion) => (
            <tr key={devolucion.id}>
              <th>{devolucion.codigo}</th>
              <td>{devolucion.producto}</td>
              <td>{devolucion.modelo}</td>
              <td>{devolucion.talla}</td>
              <td>{facturas.find(factura => factura.id === devolucion.proveedor)?.proveedor || 'no se encuentra proveedor'}</td>
              <td>{devolucion.observacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

