import { useEffect, useState } from "react";
import {
  getAllDevolucionesHistorial,
  deleteDevolucionesHistorial,
} from "../api/devolucionesHistorial.api"; // Asegúrate de tener la función deleteDevolucionHistorial en tu API
import { Pagination } from "./Paginacion";

export function DevolucionesHistorial() {
  const [devolucionesHistorial, setDevolucionesHistorial] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchCodigo, setSearchCodigo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const totalPrecio = devolucionesHistorial.reduce(
    (acc, stock) => acc + parsePrecio(stock.precio),
    0
  );

  const filterDevoluciones = devolucionesHistorial.filter((item) =>
    item.codigo.toLowerCase().includes(searchCodigo.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterDevoluciones.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filterDevoluciones.length / itemsPerPage);

  const handleShowModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    try {
      await deleteDevolucionesHistorial(selectedId);
      setDevolucionesHistorial(
        devolucionesHistorial.filter((item) => item.id !== selectedId)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

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
            <th scope="col">Acciones</th>
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
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleShowModal(devolucion.id)}
                >
                  Eliminar
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

      {showModal && (
        <div
          className="modal show d-block"
          style={{
            display: showModal ? "block" : "none",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este registro?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
