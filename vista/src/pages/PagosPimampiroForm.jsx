import { useForm } from "react-hook-form";
import {
  createPagosPimampiro,
  updatePagosPimampiro,
  deletePagosPimampiro,
  getPagoPimampiro,
} from "../api/generarPagoPimampiro.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function PagosPimampiroForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updatePagosPimampiro(params.id, data);
    } else {
      await createPagosPimampiro(data);
    }
    navigate("/ventasPimampiro");
  });

  useEffect(() => {
    async function cargarPagos() {
      if (params.id) {
        const { data } = await getPagoPimampiro(params.id);
        setValue("fecha_pago", data.fecha_pago);
        setValue("cantidad_pagada", data.cantidad_pagada);
        setValue("venta", data.venta);
      }
    }
    cargarPagos();
  }, []);
  const handleDelete = async () => {
    await deletePagosPimampiro(params.id);
    navigate("/ventasPimampiro");
  };

  return (
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        className="row g-3 needs-validation container_inventario"
      >
        <h1 className="titulos">Formulario de pagos Pimampiro</h1>
        <div className="col-md-4">
          <label className="form-label">Fecha de pago</label>
          <input
            className="form-control form-clientes"
            type="date"
            {...register("fecha_pago", { required: true })}
          />
        </div>
        {errors.fecha_pago && <span>Este campo es requerido</span>}
        <div className="col-md-4">
          <label className="form-label">Cantidad a pagar</label>
        <input
          type="number"
          placeholder="cantidad a pagar"
          className="form-control form-clientes"
           step="0.01"
            min="0"
          {...register("cantidad_pagada", { required: true })}
        />
        </div>
        {errors.cantidad_pagada && <span>Este campo es requerido</span>}
        <div className="col-md-4">
        <label className="form-label">Cliente</label>
        <input
          type="text"
          placeholder="cliente"
          className="form-control form-clientes"
          {...register("venta", { required: true })}
        />
        </div>
        {errors.venta && <span>Este campo es requerido</span>}
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-end">
            {params.id && (
              <div className="mr-2 me-3">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </button>
              </div>
            )}
            <button type="submit" className="btn btn-primary">
            <i className="bi bi-send-check-fill me-2"></i>Enviar
            </button>
          </div>
        </div>
      </form>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body mt-3">
              <h5>¿Estás seguro de que deseas eliminar este Pago?</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
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
    </div>
  );
}
