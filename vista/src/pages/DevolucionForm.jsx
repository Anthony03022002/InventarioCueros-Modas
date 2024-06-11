import { useForm } from "react-hook-form";
import {
  createdevoluciones,
  deleteDevoluciones,
  getDevolucion,
  updateDevoluciones,
} from "../api/devoluciones.api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAllInventario, updateInventario } from "../api/inventario.api";
import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { createDevolucionesHistorial } from "../api/devolucionesHistorial.api";
import { getAllFacturas } from "../api/facturas.api";

export function DevolucionForm() {
  const [inventarios, setInventario] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [proveedor, setProveedor] = useState("");
  const [facturas, setFacturas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const devolucion = "Devolucion";
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function cargarFacturas() {
      const res = await getAllFacturas();
      setFacturas(res.data);
    }
    cargarFacturas();
  }, []);

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateDevoluciones(params.id, data);
    } else {
      await createdevoluciones(data);
    }
    const precioTotal = data.cantidad_devolver * data.precio;
    const selectedProductData = inventarios.find(
      (item) => item.id === data.producto
    );
    if (selectedProductData) {
      const updatedStock = selectedProductData.stock - data.cantidad_devolver;
      await updateInventario(data.producto, {
        ...selectedProductData,
        stock: updatedStock,
      });

      await createDevolucionesHistorial({
        codigo: selectedProductData.codigo,
        cantidad_devolucion: data.cantidad_devolver,
        fecha: data.fecha_devolucion,
        proveedor: data.proveedor,
        comentario: `Se realizó la devolucion del producto: ${selectedProductData.producto}`,
        responsable: data.responsable,
        precio: precioTotal,
      });
    }

    navigate("/devoluciones");
  });
  const handleDelete = async () => {
    await deleteDevoluciones(params.id);
    navigate("/devoluciones");
  };

  useEffect(() => {
    async function actualizarDevoluciones() {
      if (params.id) {
        const { data } = await getDevolucion(params.id);
        setValue("devolucion", data.devolucion);
        setValue("cantidad_devolver", data.cantidad_devolver);
        setValue("proveedor", data.proveedor);
        setValue("producto", data.producto);
        setValue("fecha_devolucion", data.fecha_devolucion);
        setValue("observacion", data.observacion);
        setValue("responsable", data.responsable);

        const selectedProduct =
          inventarios.find((item) => item.id === data.producto) || {};
        setSelectedProduct({
          value: data.producto,
          label: selectedProduct.codigo,
        });
        setPrecio(selectedProduct.precio || 0);
        setStock(selectedProduct.stock || 0);
        setProveedor(selectedProduct.proveedor || "");
      }
    }
    actualizarDevoluciones();
  }, [params.id, setValue, inventarios]);

  const handleProductChange = useCallback(
    (selectedOption) => {
      const selectedProductId = selectedOption?.value;
      const product = inventarios.find(
        (item) => item.id === selectedProductId
      ) || { precio: 0, stock: 0,codigo:"", proveedor: "" };


      setSelectedProduct(selectedOption);
      setValue("producto", selectedProductId || "");
      setPrecio(product.precio);
      setStock(product.stock);
      setProveedor(product.proveedor);
      setValue("proveedor", product.proveedor || "");
    },
    [inventarios, setValue]
  );

  return (
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        className="row g-3 needs-validation container_clientes_angel"
      >
      <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/devoluciones" className="fs-3">
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>
          <div className="flex-grow-1 d-flex justify-content-center">
            <h1 className="titulos">Ingrese su devolucion</h1>
          </div>
          <div className="fs-3" style={{ visibility: "hidden" }}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label">Devolucion:</label>
          <input
            type="text"
            className="form-control"
            defaultValue={devolucion}
            {...register("devolucion", { required: true })}
            readOnly
          />
        </div>
        {errors.devolucion && <span>Ingrese devolucion</span>}

        <div className="col-md-4">
          <label className="form-label">Producto</label>
          <Select
            value={selectedProduct}
            onChange={handleProductChange}
            options={inventarios.map((inventario) => ({
              value: inventario.id,
              label: inventario.codigo,
            }))}
            placeholder="Buscar producto"
            isSearchable
          />
        </div>
        {errors.producto && <span>Ingrese producto</span>}
        <div className="col-md-4">
          <label className="form-label">Cantidad a devolver:</label>
          <input
            type="number"
            className="form-control form-clientes"
            placeholder="cantidad a devolver"
            {...register("cantidad_devolver", { required: true })}
          />
        </div>
        {errors.cantidad_devolver && <span>Ingrese cantidad a devolver</span>}

        {selectedProduct && (
          <>
            <div className="col-md-4">
              <label className="form-label">Precio:</label>
              <input
                type="text"
                placeholder="Precio"
                className="form-control form-clientes"
                value={precio}
                {...register("precio", { required: true })}
                readOnly
              />
            </div>
            {errors.precio && <span>Ingrese precio</span>}
            <div className="col-md-4">
            <label className="form-label">Stock:</label>
            <input
              type="text"
              placeholder="Stock"
              className="form-control form-clientes"
              value={stock}
              {...register("stock", { required: true })}
              readOnly
            />
            </div>
            {errors.stock && <span>Ingrese stock</span>}
            <div className="col-md-4">
            <label className="form-label">ID Proveedor:</label>
            <input
              type="text"
              placeholder="Proveedor"
              className="form-control form-clientes"
              value={proveedor}
              {...register("proveedor", { required: true })}
              readOnly
            />
            </div>
            {errors.proveedor && <span>Ingrese proveedor</span>}
          </>
        )}

        <div className="col-md-4">
          <label className="form-label">Fecha devolucion</label>
        <input
          type="date"
          className="form-control form-clientes"
          {...register("fecha_devolucion", { required: true })}
        />
        </div>
        {errors.fecha_devolucion && <span>Ingrese fecha_devolucion</span>}

        <div className="col-md-4">
          <label className="fomr-label">Observacion:</label>
        <textarea
          placeholder="observación"
          className="form-control"
          {...register("observacion", { required: true })}
        ></textarea>
        </div>
        {errors.observacion && <span>Ingrese observacion</span>}

        <div className="col-md-4">
        <label className="form-label">Responsable:</label>
        <select className="form-select form-clientes" {...register("responsable", { required: true })}>
          <option value="">Ingrese el responsable</option>
          <option value="persona1">Persona 1</option>
          <option value="persona2">Persona 2</option>
        </select>
        </div>
        {errors.responsable && <span>Ingrese responsable</span>}

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
            <button type="submit"className="btn btn-primary">
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
            <div class="modal-header">
              <h5>
                <i class="bi bi-exclamation-circle-fill text-danger me-2"></i>
                Confirmación de Eliminación
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body mt-3">
              <h5>¿Estás seguro de eliminar esta Devolución?</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
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
