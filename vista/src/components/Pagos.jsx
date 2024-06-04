import { getAllPagosAngel } from "../api/generarPagoAngel.api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Pagos() {
  const [generarPagos, setgenerarPagos] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    async function cargarPagos() {
      const res = await getAllPagosAngel();
      setgenerarPagos(res.data);
    }
    cargarPagos();
  }, []);
  return (
    <div className="container mt-3">
      <h1 className="titulos">Pagos</h1>
    <Link to="/crear-pago">Crear pago</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID Pago</th>
            <th>Cliente</th>
            <th>Fecha Pago</th>
            <th>Cantidad Pagada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generarPagos.map((pagos) => (
            <tr key={pagos.id}>
              <td>{pagos.id}</td>
              <td>{pagos.venta}</td>
              <td>{pagos.fecha_pago}</td>
              <td>{pagos.cantidad_pagada}</td>
              <td><button
                onClick={()=>{
                    navigate(`/pagos/${pagos.id}`);
                }}
                className="btn btn-sm btn-warning"
              ><i className="bi bi-pen-fill"></i></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
