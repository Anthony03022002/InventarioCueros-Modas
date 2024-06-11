import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllClientesCayambe } from "../api/clientesCayambe.api";
import { getVentaCayambe } from "../api/ventasCayambe.api";
import { getAllInventario } from "../api/inventario.api";
import { getAllPagosCayambe } from "../api/generarPagoCayambe.api";

export function PagosMensualesCayambe() {
  const [productoCayambe, setProductoCayambe] = useState([]);
  const [clientesCayambe, setClientesCayambe] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [pagosCliente, setPagosCliente] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function cargarClienteCayambe() {
      const res = await getAllClientesCayambe();
      setClientesCayambe(res.data);
    }
    cargarClienteCayambe();
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
        const { data } = await getVentaCayambe(id);
        setProductoCayambe(Array.isArray(data) ? data : [data]);
      }
    }
    cargarProducto();
  }, [id]);

  useEffect(() => {
    async function cargarPagosCliente() {
      const res = await getAllPagosCayambe();
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
    const cliente = clientesCayambe.find((c) => c.id === clientId);
    return cliente ? cliente.nombre_completo : "Cliente no encontrado";
  };

  const totalPagado = pagosCliente.reduce(
    (total, pago) => total + parseFloat(pago.cantidad_pagada),
    0
  );

  return (
    <div className="container mt-3">
      <Link to='/ventasCayambe' className="fs-3"><i className="bi bi-arrow-left-circle-fill"></i></Link>
      <h1 className="titulos">Pagos Mensuales del cliente</h1>
      {productoCayambe.map((producto) => {
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
                    navigate(`/ventasCayambe/${producto.id}`)
                  }}
                  >Cambiar estado del pago</button>
                </div>
              </div>
              <div className="col-auto">
                <button
                  onClick={() => navigate(`/ventasCayambe/${id}/generarPagoCayambe`, { state: { debe } })}
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
                    navigate(`/pagosCayambe/${pago.id}`);
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
