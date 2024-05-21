import { useEffect, useState } from "react";
import { getAllClientesLagoagrio } from "../api/clientesLagoagrio.api";
import { getAllInventario } from "../api/inventario.api";

export function ClientesLagoagrioList() {
  const [clientesLagoagrio, setClientesLagoagrio] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const currentClientesLagoagrio = clientesLagoagrio;

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);
  useEffect(() => {
    async function cargarClientesLagoagrio() {
      const res = await getAllClientesLagoagrio();
      setClientesLagoagrio(res.data);
    }
    cargarClientesLagoagrio();
  }, []);
  return (
    <div className="container pt-4">
      <h1 className="text-center">Clientes Lagoagrio</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Productos</th>
            <th scope="col">Total a pagar</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentClientesLagoagrio.map((cliente) => (
            <tr key={cliente.id}>
              <th>{cliente.nombre_completo}</th>
              <td>
                <ul>
                  {cliente.producto.map((productoId) => {
                    const producto = inventarios.find(
                      (inventario) => inventario.id === productoId
                    );
                    return producto ? (
                      <li key={producto.id}>{producto.producto}</li>
                    ) : null;
                  })}
                </ul>
              </td>
              <td>{cliente.total_pagar}</td>
              <td>{cliente.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
