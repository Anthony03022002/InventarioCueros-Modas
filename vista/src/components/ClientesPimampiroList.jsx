import { useEffect, useState } from "react";
import { getAllClientesPimampiro } from "../api/clientesPimampiro.api";
import { getAllInventario } from "../api/inventario.api";

export function ClientesPimampiroList() {
  const [clientesPimampiro, setClientesPimampiro] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const currentClientesPimampiro = clientesPimampiro;

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);
  useEffect(() => {
    async function cargarClientesPimampiro() {
      const res = await getAllClientesPimampiro();
      setClientesPimampiro(res.data);
    }
    cargarClientesPimampiro();
  }, []);
  return (
    <div className="container pt-4">
      <h1 className="text-center">Clientes Pimampiro</h1>
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
          {currentClientesPimampiro.map((cliente) => (
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
