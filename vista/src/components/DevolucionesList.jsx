import { getAlldevoluciones } from "../api/devoluciones.api";
import { useEffect, useState } from "react";
import { getAllInventario } from "../api/inventario.api";
import { getAllFacturas } from "../api/facturas.api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./Paginacion";

export function DevolucionesList() {
  const [devoluciones, setDevoluciones] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [searchCodigo, setSearchCodigo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
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
  const productoCodigo = (productId) => getProductoField(productId, "codigo");

  
  const filteredDevoluciones = devoluciones.filter((devolucion) =>
    productoCodigo(devolucion.producto).toLowerCase().includes(searchCodigo.toLowerCase())
  );

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDevoluciones.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredDevoluciones.length / itemsPerPage);

  return (
    <div className="container pt-4">
      <h1 className="titulos">Devoluciones</h1>

      <div className="row mb-3">
        <div className="col">
          <div className="input-group w-25">
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
        <div className="col-auto">
          <Link to="/crear-devolucion" className="btn btn-primary"><i className="bi bi-arrow-repeat me-2"></i>Ingresar devolucion</Link>
        </div>
      </div>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Codigo</th>
            <th scope="col">Producto</th>
            <th scope="col">Modelo</th>
            <th scope="col">Talla</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Cantidad a devolver</th>
            <th scope="col">Observacion</th>
            <th scope="col">Responsable</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((devolucion) => (
            <tr key={devolucion.id}>
              <td>{devolucion.id}</td>
              <td>{productoCodigo(devolucion.producto)}</td>
              <td>{productoDevolucion(devolucion.producto)}</td>
              <td>{productoModelo(devolucion.producto)}</td>
              <td>{productoTalla(devolucion.producto)}</td>
              <td>
                {facturas.find((factura) => factura.id === devolucion.proveedor)
                  ?.proveedor || "no se encuentra proveedor"}
              </td>
              <td>{devolucion.cantidad_devolver}</td>
              <td>{devolucion.observacion}</td>
              <td>{devolucion.responsable}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/devoluciones/${devolucion.id}`);
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
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
