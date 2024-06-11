import { useEffect, useState } from "react";
import { getAllStockHistoria } from "../api/stockhistorial.api";

export function StockHistorial() {
  const [stockHistorial, setStockHistorial] = useState([]);
  const [searchCodigo, setSearchCodigo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    async function cargarStock() {
      const res = await getAllStockHistoria();
      const sortedData = res.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setStockHistorial(sortedData);
    }
    cargarStock();
  }, []);

  const parsePrecio = (precio) => {
    const parsed = parseFloat(precio);
    return isNaN(parsed) ? 0 : parsed;
  };

  const totalPrecio = stockHistorial.reduce(
    (acc, stock) => acc + parsePrecio(stock.precio),
    0
  );

  const filteredStock = stockHistorial.filter((item) =>
    item.codigo.toLowerCase().includes(searchCodigo.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStock.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStock.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container pt-4">
      <h1 className="titulos">Kardex Entradas</h1>
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
          Total Precio Entradas: ${totalPrecio.toFixed(2)}
        </p>
      </div>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Cantidad Ingresada</th>
            <th scope="col">Fecha de Ingreso</th>
            <th scope="col">Precio</th>
            <th scope="col">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.codigo}</td>
              <td>{stock.cantidad_ingresada}</td>
              <td>{stock.fecha}</td>
              <td>{stock.precio}</td>
              <td>{stock.comentario}</td>
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
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
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
