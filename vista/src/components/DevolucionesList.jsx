import { getAlldevoluciones } from "../api/devoluciones.api";
import { useEffect, useState } from "react";
import { getAllInventario } from "../api/inventario.api";
import { getAllFacturas } from "../api/facturas.api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function DevolucionesList() {
  const [devoluciones, setDevoluciones] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);
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
  const getProductoField = (productId, field) => {
    const producto = inventarios.find((p) => p.id === productId);
    return producto ? producto[field] : "Producto no encontrado";
  };

  const productoDevolucion = (productId) =>
    getProductoField(productId, "producto");
  const productoModelo = (productId) => getProductoField(productId, "modelo");
  const productoTalla = (productId) => getProductoField(productId, "talla");

  return (
    <div className="container pt-4">
      <h1 className="text-center">Devoluciones</h1>
      <Link to="/crear-devolucion">Ingresar devolucion</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Responsable</th>
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
              <th>{devolucion.responsable}</th>
              <td>{productoDevolucion(devolucion.producto)}</td>
              <td>{productoModelo(devolucion.producto)}</td>
              <td>{productoTalla(devolucion.producto)}</td>
              <td>
                {facturas.find((factura) => factura.id === devolucion.proveedor)
                  ?.proveedor || "no se encuentra proveedor"}
              </td>
              <td>{devolucion.observacion}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/devoluciones/${devolucion.id}`);
                  }}
                >
                  <i className="bi bi-pen-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
