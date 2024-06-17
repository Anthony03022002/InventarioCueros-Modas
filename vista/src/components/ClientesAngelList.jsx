import { useEffect, useState } from "react";
import { getAllClientesAngel } from "../api/clientesAngel.api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./Paginacion";


export function ClientesAngelList() {
  const [clientesAngel, setClientesAngel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarClientesAngel() {
      const res = await getAllClientesAngel();
      setClientesAngel(res.data);
    }
    cargarClientesAngel();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter clients based on search term
  const filteredClientes = clientesAngel.filter((cliente) =>
    cliente.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current clients
  const indexOfLastClient = currentPage * clientesPerPage;
  const indexOfFirstClient = indexOfLastClient - clientesPerPage;
  const currentClientes = filteredClientes.slice(
    indexOfFirstClient,
    indexOfLastClient
  );
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);

  return (
    <div className="container pt-4">
      <h1 className="titulos">CLIENTES ANGEL</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group w-25">
          <input
            type="text"
            placeholder="Buscar cliente"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        <Link to="/crear-clienteAngel" className="btn btn-primary">
        <i className="bi bi-person-circle me-2"></i>Crear Cliente
        </Link>
      </div>

      <table className="table table-hover mt-4">
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
          {currentClientes.map((cliente) => (
            <tr key={cliente.id}>
              <th>{cliente.cedula}</th>
              <td>{cliente.nombre_completo}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.celular}</td>
              <td>
                <button
                  onClick={()=>{
                    navigate(`/clientesAngel/${cliente.id}`)
                  }}
                  className="btn btn-sm btn-warning"
                ><i className="bi bi-pen-fill"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
