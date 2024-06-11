import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllClientesPimampiro } from "../api/clientesPimampiro.api";
import { getVentaPimampiro } from "../api/ventasPimampiro.api";
import { getAllInventario } from "../api/inventario.api";
import { getAllPagosPimampiro } from "../api/generarPagoPimampiro.api";

export function PagosMensualesPimampiro() {
  const [productoPimampiro, setProductoPimampiro] = useState([]);
  const [clientesPimampiro, setClientesPimampiro] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [pagosCliente, setPagosCliente] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function cargarClientePimampiro() {
      const res = await getAllClientesPimampiro();
      setClientesPimampiro(res.data);
    }
    cargarClientePimampiro();
  }, []);

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  useEffect(() => {
    async function cargarProducto() {
      if (id) {
        const { data } = await getVentaPimampiro(id);
        setProductoPimampiro(Array.isArray(data) ? data : [data]);
      }
    }
    cargarProducto();
  }, [id]);

  useEffect(() => {
    async function cargarPagosCliente() {
      const res = await getAllPagosPimampiro();
      const pagosFiltrados = res.data.filter(
        (pago) => pago.venta === parseInt(id)
      );
      setPagosCliente(pagosFiltrados);
    }
    cargarPagosCliente();
  }, [id]);

  const findProductNameById = (productId) => {
    const producto = inventarios.find((p) => p.id === productId);
    return producto ? producto.producto : "Producto no encontrado";
  };

  const findClientNameById = (clientId) => {
    const cliente = clientesPimampiro.find((c) => c.id === clientId);
    return cliente ? cliente.nombre_completo : "Cliente no encontrado";
  };

  const totalPagado = pagosCliente.reduce(
    (total, pago) => total + parseFloat(pago.cantidad_pagada),
    0
  );

  return (
    <div className="container mt-3">
      <Link to='/ventasPimampiro' className="fs-3"><i className="bi bi-arrow-left-circle-fill"></i></Link>
      <h1 className="titulos">Pagos Mensuales del cliente</h1>
      {productoPimampiro.map((producto) => {
        const debe = parseFloat(producto.total_pagar) - totalPagado;
        return (
          <div key={producto.id} className="producto-container mb-3">
            <div className="row">
              <div className="col">
                <div className="producto-info">
                  <p>
                    <strong>Cliente:</strong> {findClientNameById(producto.cliente)}
                  </p>
                  <p>
                    <strong>Producto:</strong>{" "}
                    {findProductNameById(producto.producto)}
                  </p>
                  <p>
                    <strong>Total a pagar:</strong> ${producto.total_pagar}
                  </p>
                  <p>
                    <strong>Total pagado hasta la fecha:</strong> $
                    {totalPagado.toFixed(2)}
                  </p>
                  <p>
                    <strong>Debe:</strong> ${debe.toFixed(2)}
                  </p>
                  <button
                  className="btn btn-primary"
                   onClick={()=>{
                    navigate(`/ventasPimampiro/${producto.id}`)
                  }}
                  >Cambiar estado del pago</button>
                </div>
              </div>
              <div className="col-auto">
                <button
                  onClick={() => navigate(`/ventasPimampiro/${id}/generarPagoPimampiro`, { state: { debe } })}
                  className="btn btn-primary"
                >
                  <i className="bi bi-minecart me-2"></i>Generar pago
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <table className="table">
        <thead>
          <tr>
            <th>ID de Pago</th>
            <th>Cantidad Pagada</th>
            <th>Fecha del Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagosCliente.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>${pago.cantidad_pagada}</td>
              <td>{pago.fecha_pago}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/pagosPimampiro/${pago.id}`);
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
    </div>
  );
}
