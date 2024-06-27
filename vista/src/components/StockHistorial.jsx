import { useEffect, useState } from "react";
import {
  getAllStockHistoria,
  deleteStockHistoria,
} from "../api/stockhistorial.api";
import { Pagination } from "./Paginacion";

export function StockHistorial() {
  const [stockHistorial, setStockHistorial] = useState([]);
  const [searchCodigo, setSearchCodigo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function cargarStock() {
      const res = await getAllStockHistoria();
      const sortedData = res.data.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );
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
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredStock.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      await deleteStockHistoria(selectedId);
      setStockHistorial(
        stockHistorial.filter((item) => item.id !== selectedId)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
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
            <th scope="col">Id</th>
            <th scope="col">Código</th>
            <th scope="col">Cantidad Ingresada</th>
            <th scope="col">Fecha de Ingreso</th>
            <th scope="col">Precio</th>
            <th scope="col">Comentario</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.codigo}</td>
              <td>{stock.cantidad_ingresada}</td>
              <td>{stock.fecha}</td>
              <td>{stock.precio}</td>
              <td>{stock.comentario}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleShowModal(stock.id)}
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
