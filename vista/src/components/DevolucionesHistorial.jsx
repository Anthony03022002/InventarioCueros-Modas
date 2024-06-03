import { getAllDevolucionesHistorial } from "../api/devolucionesHistorial.api";
import { useEffect, useState } from "react";

export function DevolucionesHistorial() {
  const [devolucionesHistorial, setDevolucionesHistorial] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [searchCodigo, setSearchCodigo] = useState("");

  useEffect(() => {
    async function cargarDevolucionesHistorial() {
      const res = await getAllDevolucionesHistorial();
      setDevolucionesHistorial(res.data);
    }
    cargarDevolucionesHistorial();
  }, []);
  const parsePrecio = (precio) => {
    const parsed = parseFloat(precio);
    return isNaN(parsed) ? 0 : parsed;
  };
  const filterDevoluciones = devolucionesHistorial.filter((item) =>
    item.codigo.toLowerCase().includes(searchCodigo.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterDevoluciones.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPrecio = devolucionesHistorial.reduce(
    (acc, stock) => acc + parsePrecio(stock.precio),
    0
  );
  const totalPages = Math.ceil(filterDevoluciones.length / itemsPerPage);

  return (
    <div className="container pt-4">
      <h1 className="text-center">Kardex Devoluciones</h1>
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
          Total Precio Devoluciones: ${totalPrecio.toFixed(2)}
        </p>
      </div>
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Cantidad De devolucion</th>
            <th scope="col">Fecha de devolucion</th>
            <th scope="col">Precio</th>
            <th scope="col">Responsable</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((devolucion) => (
            <tr key={devolucion.id}>
              <th>{devolucion.codigo}</th>
              <td>{devolucion.cantidad_devolucion}</td>
              <td>{devolucion.fecha}</td>
              <td>{devolucion.precio}</td>
              <td>{devolucion.responsable}</td>
              <td>{devolucion.proveedor}</td>
              <td>{devolucion.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
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
                onClick={() => setCurrentPage(index + 1)}
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
              onClick={() => setCurrentPage(currentPage + 1)}
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
