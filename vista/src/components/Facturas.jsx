import { useEffect, useState } from "react";
import { getAllFacturas } from "../api/facturas.api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../index.css";

export function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [searchFecha, setSearchFecha] = useState("");
  const [searchProveedor, setSearchProveedor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change the number of items per page as needed
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarFacturas() {
      const res = await getAllFacturas();
      setFacturas(res.data);
    }
    cargarFacturas();
  }, []);

  // Get filtered items
  const filteredFacturas = facturas.filter((factura) =>
    factura.fecha.includes(searchFecha) && factura.proveedor.toLowerCase().includes(searchProveedor.toLowerCase())
  );

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFacturas.slice(indexOfFirstItem, indexOfLastItem);

  // Get total pages
  const totalPages = Math.ceil(filteredFacturas.length / itemsPerPage);

  return (
    <div className="container pt-4">
      <h1 className="titulos">Facturas</h1>

      <div className="row mb-3">
        <div className="col">
          <div className="input-group mb-2">
            <input
              type="date"
              placeholder="Buscar por fecha"
              className="form-control"
              value={searchFecha}
              onChange={(e) => setSearchFecha(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="input-group mb-2">
            <input
              type="text"
              placeholder="Buscar por proveedor"
              className="form-control"
              value={searchProveedor}
              onChange={(e) => setSearchProveedor(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <Link to="/crear-factura" className="btn btn-primary"><i class="bi bi-file-earmark-text-fill me-2"></i>Crear factura</Link>
        </div>
      </div>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Fecha Factura</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Factura</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((factura) => (
            <tr key={factura.id}>
              <td>{factura.fecha}</td>
              <td>{factura.proveedor}</td>
              <td>
                <a
                  href={factura.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver archivo
                </a>
              </td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/facturas/${factura.id}`);
                  }}
                  className="btn btn-sm btn-warning"
                >
                  <i className="bi bi-pen-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
