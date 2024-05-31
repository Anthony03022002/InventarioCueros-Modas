import { useEffect, useState } from "react";
import { getAllInventario } from "../api/inventario.api";
import { getAllFacturas } from "../api/facturas.api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Inventario = () => {
  const [inventarios, setInventario] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function cargarFacturas() {
      const res = await getAllFacturas();
      setFacturas(res.data);
    }
    cargarFacturas();
  }, []);

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  return (
    <div className="container pt-4">
      <h1 className="text-center">Inventario</h1>
      <Link to="/crear-inventario">Ingresar producto</Link>
      <Link to="/stockHistorial">Historial</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Producto</th>
            <th scope="col">Modelo</th>
            <th scope="col">Talla</th>
            <th scope="col">Stock</th>
            <th scope="col">Precio Unitario</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventarios.map((inventario) => (
            <tr key={inventario.id}>
              <th>{inventario.codigo}</th>
              <td>{inventario.producto}</td>
              <td>{inventario.modelo}</td>
              <td>{inventario.talla}</td>
              <td>{inventario.stock}</td>
              <td>{inventario.precio}</td>
              <td>{facturas.find(factura => factura.id === inventario.proveedor)?.proveedor || 'no se encuentra proveedor'}</td>
              <td>
                <button
                  onClick={()=>{
                    navigate(`/inventario/${inventario.id}`)
                  }}
                ><i className="bi bi-pen-fill"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
