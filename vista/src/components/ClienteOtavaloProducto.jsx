import { useEffect, useState } from "react";
import { getAllVentasOtavalo } from "../api/ventasOtavalo.api";
import { getAllClientesOtavalo } from "../api/clientesOtavalo.api";
import { getAllInventario } from "../api/inventario.api";
import { useNavigate } from "react-router-dom";
import { getAllPagosOtavalo, deletePagosOtavalo, updatePagosOtavalo } from "../api/generarPagoOtavalo.api"; // Importa las funciones de eliminar y actualizar
import Select from "react-select";

export function ClienteOtavaloProducto() {
  const [productosAngel, setProductosAngel] = useState([]);
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [pagosCliente, setPagosCliente] = useState([]);
  const [editingPago, setEditingPago] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  useEffect(() => {
    async function cargarClientesAngel() {
      const res = await getAllClientesOtavalo();
      setClientesAngel(res.data);
    }
    cargarClientesAngel();
  }, []);

  useEffect(() => {
    async function cargarProductosAngel() {
      const res = await getAllVentasOtavalo();
      setProductosAngel(res.data);
    }
    cargarProductosAngel();
  }, []);

  useEffect(() => {
    async function cargarPagosCliente() {
      if (selectedCliente) {
        const res = await getAllPagosOtavalo();
        const pagosFiltrados = res.data.filter(
          (pago) => pago.cliente === selectedCliente.value
        );
        setPagosCliente(pagosFiltrados);
      } else {
        setPagosCliente([]);
      }
    }
    cargarPagosCliente();
  }, [selectedCliente]);

  const handleClienteChange = (selectedOption) => {
    setSelectedCliente(selectedOption);
    localStorage.setItem('selectedCliente', JSON.stringify(selectedOption));
  };
  

  const productosFiltrados = selectedCliente
    ? productosAngel.filter(
        (producto) => producto.cliente === selectedCliente.value
      )
    : [];

  const clienteOptions = clientesAngel.map((cliente) => ({
    value: cliente.id,
    label: `${cliente.nombre_completo} (ID: ${cliente.id})`,
  }));

  const findProductNameById = (productId) => {
    const producto = inventarios.find((p) => p.id === productId);
    return producto ? producto.codigo : "Producto no encontrado";
  };

  const totalAPagar = productosFiltrados.reduce((acc, producto) => {
    return acc + (parseFloat(producto.total_pagar) || 0);
  }, 0);

  const totalPagosRealizados = pagosCliente.reduce((acc, pago) => {
    return acc + (parseFloat(pago.cantidad_pagada) || 0);
  }, 0);

  const deudaRestante = totalAPagar - totalPagosRealizados;

  const handleDeletePago = async (id) => {
    await deletePagosOtavalo(id);
    setPagosCliente(pagosCliente.filter((pago) => pago.id !== id));
  };

  const handleEditPago = (pago) => {
    setEditingPago(pago);
  };

  const handleSaveEditPago = async () => {
    if (editingPago) {
      console.log("Datos a editar:", editingPago); // Verifica los datos antes de la llamada
      await updatePagosOtavalo(editingPago.id, editingPago);
      setEditingPago(null);
      const res = await getAllPagosOtavalo(); // Recarga los pagos después de la edición
      const pagosFiltrados = res.data.filter(
        (pago) => pago.cliente === selectedCliente.value
      );
      setPagosCliente(pagosFiltrados);
    }
  };
  useEffect(() => {
    const savedCliente = localStorage.getItem('selectedCliente');
    if (savedCliente) {
      setSelectedCliente(JSON.parse(savedCliente));
    }
  }, []);
  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPago({ ...editingPago, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center titulos">Resumen de Clientes Otavalo</h2>

      <Select
        options={clienteOptions}
        onChange={handleClienteChange}
        value={selectedCliente}
        placeholder="Selecciona un cliente"
        className="mb-4 col-md-4"
      />

      {productosFiltrados.length > 0 && (
        <div>
          <p>Cliente: {selectedCliente.label}</p>
          <div className="row">
            <div className="col-md-6">
              <h3>Productos</h3>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Total a Pagar</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((producto) => (
                    <tr key={producto.id}>
                      <td>{findProductNameById(producto.producto)}</td>
                      <td>{producto.cantidad}</td>
                      <td>{producto.total_pagar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>Deuda Total: ${totalAPagar}</h4>
            </div>
            <div className="col-md-6">
              <h3>Pagos Realizados</h3>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID del Pago</th>
                    <th>Cantidad Pagada</th>
                    <th>Fecha de Pago</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pagosCliente.map((pago) => (
                    <tr key={pago.id}>
                      <td>{pago.id}</td>
                      <td>
                        {editingPago && editingPago.id === pago.id ? (
                          <input
                            type="text"
                            name="cantidad_pagada"
                            value={editingPago.cantidad_pagada}
                            onChange={handleEditChange}
                          />
                        ) : (
                          pago.cantidad_pagada
                        )}
                      </td>
                      <td>{pago.fecha_pago}</td>
                      <td>
                        {editingPago && editingPago.id === pago.id ? (
                          <button
                            className="btn btn-success"
                            onClick={handleSaveEditPago}
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEditPago(pago)}
                          >
                            <i className="bi bi-pen-fill"></i>
                          </button>
                        )}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeletePago(pago.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>Pagos realizados hasta la actualidad: ${totalPagosRealizados}</h4>
              <h4>Debe: ${deudaRestante}</h4>
            </div>
          </div>
        </div>
      )}
      <button
        className="btn btn-primary mt-4"
        onClick={() =>
          navigate("/generarPagoOtavalo", {
            state: { clienteId: selectedCliente.value, debe: deudaRestante },
          })
        }
      >
        Generar Pago
      </button>
    </div>
  );
}
