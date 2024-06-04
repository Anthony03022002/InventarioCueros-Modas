import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createClientesAngel,
  deleteClientesAngel,
  getClienteAngel,
  updateClientesAngel,
} from "../api/clientesAngel.api";
import { useEffect, useState } from "react";
import "../index.css";

export function ClientesAngelForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateClientesAngel(params.id, data);
      navigate("/clientesAngel");
    } else {
      setFormData(data);
      setShowSaleModal(true);
    }
  });

  const handleConfirmSale = async () => {
    setShowSaleModal(false);
    await createClientesAngel(formData);
    navigate("/crear-productosAngel");
  };

  const handleCancelSale = async () => {
    setShowSaleModal(false);
    await createClientesAngel(formData);
    navigate("/clientesAngel");
  };

  const handleDelete = async () => {
    await deleteClientesAngel(params.id);
    navigate("/clientesAngel");
  };

  useEffect(() => {
    async function actualizarClientes() {
      if (params.id) {
        const { data } = await getClienteAngel(params.id);
        setValue("cedula", data.cedula);
        setValue("nombre_completo", data.nombre_completo);
        setValue("email", data.email);
        setValue("celular", data.celular);
        setValue("direccion", data.direccion);
      }
    }
    actualizarClientes();
  }, [params.id, setValue]);

  return (
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        className="row g-3 needs-validation container_clientes_angel"
        novalidate
      >
        <h1 className="titulos">Formulario Clientes Angel</h1>
        <div className="col-md-4">
          <label className="form-label">Cedula:</label>
          <input
            type="number"
            placeholder="Cedula"
            className="form-control form-clientes"
            {...register("cedula", { required: true })}
          />
        </div>
        {errors.cedula && <span>Este campo es requerido</span>}

        <div className="col-md-4">
          <label className="form-label">Nombre Completo:</label>
          <input
            type="text"
            placeholder="Nombre completo"
            className="form-control form-clientes"
            {...register("nombre_completo", { required: true })}
          />
        </div>
        {errors.nombre_completo && <span>Este campo es requerido</span>}

        <div className="col-md-4">
          <label className="form-label">Correo Electronico:</label>
          <div className="input-group">
            <span className="input-group-text">
              @
            </span>
            <input
              type="email"
              placeholder="Correo electronico"
              className="form-control form-clientes"
              {...register("email", { required: true })}
            />
          </div>
        </div>
        {errors.email && <span>Este campo es requerido</span>}

        <div className="col-md-6">
          <label className="form-label">Celular:</label>
          <input
            type="number"
            placeholder="Celular"
            className="form-control form-clientes"
            {...register("celular", { required: true })}
          />
        </div>
        {errors.celular && <span>Este campo es requerido</span>}

        <div className="col-md-6">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            placeholder="Direccion"
            className="form-control form-clientes"
            {...register("direccion", { required: true })}
          />
        </div>
        {errors.direccion && <span>Este campo es requerido</span>}

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
            <i class="bi bi-send-check-fill me-2"></i>Enviar
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
              <h5>¿Estás seguro de que deseas eliminar este Cliente?</h5>
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

      <div
        className={`modal ${showSaleModal ? "show" : ""}`}
        style={{
          display: showSaleModal ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title titulos">
                Cliente Registrado Correctamente{" "}
                <i class="bi bi-person-check-fill text-success ms-2"></i>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setShowSaleModal(false)}
              ></button>
            </div>
            <div className="modal-body mt-3">
              <h5 className="modalcliente">¿Desea crear una venta?</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelSale}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleConfirmSale}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
