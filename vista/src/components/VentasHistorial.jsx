import { getAllVentasHistorial } from "../api/ventasHistorial.api";
import { useEffect, useState } from "react";

export function VentasHistorial() {
  const [ventasHistorial, setVentasHistorial] = useState([]);
  const [searchCodigo, setSearchCodigo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    async function cargarVentasHistorial() {
      const res = await getAllVentasHistorial();
      setVentasHistorial(res.data);
    }
    cargarVentasHistorial();
  }, []);

  const parsePrecio = (precio) => {
    const parsed = parseFloat(precio);
    return isNaN(parsed) ? 0 : parsed;
  };

  const totalPrecio = ventasHistorial.reduce(
    (acc, stock) => acc + parsePrecio(stock.precio),
    0
  );

  const filteredVentas = ventasHistorial.filter((item) =>
    item.codigo.toLowerCase().includes(searchCodigo.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentas.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container pt-4">
      <h1 className="text-center">Kardex Salidas</h1>
      <div className="d-flex justify-content-between mb-3">
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
        <p className="font-weight-bold text-primary align-self-center">
          Total Precio Salidas: ${totalPrecio.toFixed(2)}
        </p>
      </div>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Cantidad De venta</th>
            <th scope="col">Fecha de Venta</th>
            <th scope="col">Precio</th>
            <th scope="col">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((ventas) => (
            <tr key={ventas.id}>
              <td>{ventas.codigo}</td>
              <td>{ventas.cantidad_venta}</td>
              <td>{ventas.fecha}</td>
              <td>{ventas.precio}</td>
              <td>{ventas.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
