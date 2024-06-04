import { useForm } from "react-hook-form";
import {
  createFacturas,
  deleteFacturas,
  getFactura,
  updateFacturas,
} from "../api/facturas.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function FacturasForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("proveedor", data.proveedor);
    formData.append("fecha", data.fecha);
    if (data.file[0]) {
      formData.append("file", data.file[0]);
    }
    if (params.id) {
      await updateFacturas(params.id, formData);
    } else {
      await createFacturas(formData);
    }
    navigate("/facturas");
  });

  useEffect(() => {
    async function actualizarFacturas() {
      if (params.id) {
        const { data } = await getFactura(params.id);
        setValue("proveedor", data.proveedor);
        setValue("fecha", data.fecha);
        setFileUrl(data.fileUrl);
      }
    }
    actualizarFacturas();
  }, [params.id, setValue]);

  const handleDelete = async () => {
    await deleteFacturas(params.id);
    navigate("/facturas");
  };

  return (
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="row g-3 needs-validation container_clientes_angel"
      >
        <h1 className="titulos">Ingrese su Factura</h1>
        <div className="col-md-6">
          <label className="form-label">Proveedor:</label>
          <input
            type="text"
            placeholder="Proveedor"
            className="form-control form-clientes"
            {...register("proveedor", { required: true })}
          />
        </div>
        {errors.proveedor && <span>Este campo es requerido</span>}
        <div className="col-md-6">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            placeholder="Fecha"
            className="form-control form-clientes"
            {...register("fecha", { required: true })}
          />
        </div>
        {errors.fecha && <span>Este campo es requerido</span>}

          <div className="col-md-12">
            <label className="form-label">Ingrese archivo de factura (img, png, jpg, pdf.)</label>
        <input className="form-control form-clientes" type="file" {...register("file", { required: true })} />
          </div>
        {errors.file && <span>Este campo es requerido</span>}

        {fileUrl && (
          <div>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Ver archivo actual
            </a>
          </div>
        )}
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
              <h5>¿Estás seguro de eliminar está factura?</h5>
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
