import { getAllVentasLagoagrio } from "../api/ventasLagoagrio.api";
import { getAllClientesLagoagrio } from "../api/clientesLagoagrio.api";
import { getAllInventario } from "../api/inventario.api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Pagination } from "./Paginacion";


export function VentasLagoagrioList() {
  const [ventasLagoagrio, setVentasLagoagrio] = useState([]);
  const [clientesLagoagrio, setClientesLagoagrio] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();

  const findProductNameById = (productId) => {
    const producto = inventarios.find((p) => p.id === productId);
    return producto ? producto.codigo : "Producto no encontrado";
  };

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

  useEffect(() => {
    async function cargarventasLagoagrio() {
      const res = await getAllVentasLagoagrio();
      setVentasLagoagrio(res.data);
    }
    cargarventasLagoagrio();
  }, []);

  const sortedventasLagoagrio = ventasLagoagrio.slice().sort((a, b) => {
    if (a.estado === "cancelado" && b.estado !== "cancelado") {
      return 1;
    }
    if (a.estado !== "cancelado" && b.estado === "cancelado") {
      return -1;
    }
    return 0;
  });

  const filteredventasLagoagrio = sortedventasLagoagrio.filter((productos) => {
    const cliente = clientesLagoagrio.find((cliente) => cliente.id === productos.cliente);
    return cliente?.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredventasLagoagrio.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredventasLagoagrio.length / itemsPerPage);

  return (
    <div className="container pt-4">
        <h1 className="titulos">Ventas Lagoagrio</h1>
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
        <Link to="/crear-ventasLagoagrio" className="btn btn-primary"><i className="bi bi-handbag me-2"></i>Crear venta</Link>
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
                  clientesLagoagrio.find(
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
                <Link to={`/ventasLagoagrio/${productos.id}/pagosMensualesLagoagrio`}
                ><i className="bi bi-credit-card-fill text-dark"></i></Link>
                </button>
                <button
                  onClick={()=>{
                    navigate(`/ventasLagoagrio/${productos.id}`)
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
