import { useEffect, useState } from "react";
import { getAllInventario } from "../api/inventario.api";
import { getAllFacturas } from "../api/facturas.api";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export const Inventario = () => {
  const [inventarios, setInventario] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [searchCodigo, setSearchCodigo] = useState("");
  const [searchNombre, setSearchNombre] = useState("");
  const [searchTalla, setSearchTalla] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

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

  const filteredInventarios = inventarios.filter(
    (item) =>
      item.codigo.toLowerCase().includes(searchCodigo.toLowerCase()) &&
      item.producto.toLowerCase().includes(searchNombre.toLowerCase()) &&
      item.talla.toLowerCase().includes(searchTalla.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventarios.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredInventarios.length / itemsPerPage);

  return (
    <div className="container pt-4">
      <h1 className="titulos">Inventario</h1>

      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar por código"
              className="form-control"
              value={searchCodigo}
              onChange={(e) => setSearchCodigo(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="form-control"
              value={searchNombre}
              onChange={(e) => setSearchNombre(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar por talla"
              className="form-control"
              value={searchTalla}
              onChange={(e) => setSearchTalla(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <Link to="/crear-inventario" className="btn btn-primary"><i className="bi bi-cart4 me-2"></i>Ingresar producto</Link>
        </div>
      </div>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Código</th>
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
          {currentItems.map((inventario) => (
            <tr key={inventario.id}>
              <th>{inventario.codigo}</th>
              <td>{inventario.producto}</td>
              <td>{inventario.modelo}</td>
              <td>{inventario.talla}</td>
              <td>
                {inventario.stock === 0 && (
                  <i className="bi bi-exclamation-triangle-fill text-danger me-1" title="Producto no disponible"></i>
                )}
                {inventario.stock}
              </td>
              <td>{inventario.precio}</td>
              <td>{facturas.find((factura) => factura.id === inventario.proveedor)?.proveedor || 'no se encuentra proveedor'}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/inventario/${inventario.id}`);
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
};
