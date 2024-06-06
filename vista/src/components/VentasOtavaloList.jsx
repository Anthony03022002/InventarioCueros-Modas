import { getAllVentasOtavalo } from "../api/ventasOtavalo.api";
import { getAllClientesOtavalo } from "../api/clientesOtavalo.api";
import { getAllInventario } from "../api/inventario.api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../index.css";


export function VentasOtavaloList() {
  const [ventasOtavalo, setVentasOtavalo] = useState([]);
  const [clientesOtavalo, setClientesOtavalo] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();

  const findProductNameById = (productId) => {
    const producto = inventarios.find((p) => p.id === productId);
    return producto ? producto.producto : "Producto no encontrado";
  };

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  useEffect(() => {
    async function cargarClientesOtavalo() {
      const res = await getAllClientesOtavalo();
      setClientesOtavalo(res.data);
    }
    cargarClientesOtavalo();
  }, []);

  useEffect(() => {
    async function cargarventasOtavalo() {
      const res = await getAllVentasOtavalo();
      setVentasOtavalo(res.data);
    }
    cargarventasOtavalo();
  }, []);

  const sortedventasOtavalo = ventasOtavalo.slice().sort((a, b) => {
    if (a.estado === "cancelado" && b.estado !== "cancelado") {
      return 1;
    }
    if (a.estado !== "cancelado" && b.estado === "cancelado") {
      return -1;
    }
    return 0;
  });

  const filteredventasOtavalo = sortedventasOtavalo.filter((productos) => {
    const cliente = clientesOtavalo.find((cliente) => cliente.id === productos.cliente);
    return cliente?.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredventasOtavalo.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredventasOtavalo.length / itemsPerPage);

  return (
    <div className="container pt-4">
        <h1 className="titulos">Ventas Otavalo</h1>
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
        <Link to="/crear-ventasOtavalo" className="btn btn-primary"><i className="bi bi-handbag me-2"></i>Crear venta</Link>
      </div>
      
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad del producto</th>
            <th scope="col">Total a pagar</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((productos) => (
            <tr key={productos.id}>
              <th>
                {
                  clientesOtavalo.find(
                    (cliente) => cliente.id === productos.cliente
                  )?.nombre_completo
                }
              </th>
              <td>{findProductNameById(productos.producto)}</td>
              <td>{productos.cantidad}</td>
              <td>{productos.total_pagar}</td>
              <td>{productos.estado}</td>
              <td>
                <button className="btn btn-info">
                <Link to={`/ventasOtavalo/${productos.id}/pagosMensualesOtavalo`}
                ><i className="bi bi-credit-card-fill text-dark"></i></Link>
                </button>
                <button
                  onClick={()=>{
                    navigate(`/ventasOtavalo/${productos.id}`)
                  }}
                  className="btn btn-warning ms-2"
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
