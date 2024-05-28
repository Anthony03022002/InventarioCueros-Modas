import { useEffect, useState } from "react";
import { getAllClientesAngel } from "../api/clientesAngel.api";
import { getAllInventario } from "../api/inventario.api";
import { Link } from "react-router-dom";


export function ClientesAngelList() {
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const currentClientesAngel = clientesAngel;

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);
  useEffect(() => {
    async function cargarClientesAngel() {
      const res = await getAllClientesAngel();
      setClientesAngel(res.data);
    }
    cargarClientesAngel();
  }, []);
  return (
    <div className="container pt-4">
      <h1 className="text-center">Clientes Angel</h1>
      <Link to='/crear-clienteAngel'>Crear cliente</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Cedula</th>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Direccion</th>
            <th scope="col">Celular</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentClientesAngel.map((cliente) => (
            <tr key={cliente.id}>
              <th>{cliente.cedula}</th>
              <td>{cliente.nombre_completo}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.celular}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
