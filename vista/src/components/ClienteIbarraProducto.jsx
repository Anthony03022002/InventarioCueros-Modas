import { useEffect, useState } from "react";
import { getAllVentasIbarra } from "../api/ventasIbarra.api";
import { getAllClientesIbarra } from "../api/clientesIbarra.api";
import { getAllInventario } from "../api/inventario.api";
import { useNavigate } from "react-router-dom";
import { getAllPagosIbarra } from "../api/generarPagoIbarra.api";
import Select from "react-select";

export function ClienteIbarraProducto() {
  const [productosAngel, setProductosAngel] = useState([]);
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [pagosCliente, setPagosCliente] = useState([]);

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
      const res = await getAllClientesIbarra();
      setClientesAngel(res.data);
    }
    cargarClientesAngel();
  }, []);

  useEffect(() => {
    async function cargarProductosAngel() {
      const res = await getAllVentasIbarra();
      setProductosAngel(res.data);
    }
    cargarProductosAngel();
  }, []);

  useEffect(() => {
    async function cargarPagosCliente() {
      if (selectedCliente) {
        const res = await getAllPagosIbarra();
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

  return (
    <div className="container mt-4">
          <h2 className="text-center titulos">Resumen de Clientes Ibarra</h2>

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
                  </tr>
                </thead>
                <tbody>
                  {pagosCliente.map((pago) => (
                    <tr key={pago.id}>
                      <td>{pago.id}</td>
                      <td>{pago.cantidad_pagada}</td>
                      <td>{pago.fecha_pago}</td>
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
          navigate("/generarPagoIbarra", {
            state: { clienteId: selectedCliente.value, debe: deudaRestante },
          })
        }
      >
        Generar Pago
      </button>
    </div>
  );
}
