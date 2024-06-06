import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { getAllFacturas } from "../api/facturas.api";
import {
  getAllInventario,
  createInventario,
  updateInventario,
  getInventario,
  deleteInventario,
} from "../api/inventario.api";
import { createStockHistoria } from "../api/stockhistorial.api";

export function InventarioForm() {
  const [facturas, setFacturas] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const { register, handleSubmit, setValue, control, watch } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [existingInventario, setExistingInventario] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  useEffect(() => {
    async function cargarFacturas() {
      const res = await getAllFacturas();
      setFacturas(res.data);
    }
    cargarFacturas();
  }, []);

  useEffect(() => {
    async function actualizarInventario() {
      if (params.id) {
        const { data } = await getInventario(params.id);
        setValue("codigo", { value: data.codigo, label: data.codigo });
        setValue("producto", data.producto);
        setValue("cantidad_ingresar", data.cantidad_ingresar);
        setValue("precio", data.precio);
        setValue("stock", data.stock);
        setValue("descripcion", data.descripcion);
        setValue("talla", data.talla);
        setValue("fecha_ingresa_producto", data.fecha_ingresa_producto);
        setValue("modelo", data.modelo);
        setValue("proveedor", { value: data.proveedor, label: data.proveedor });
      }
    }
    actualizarInventario();
  }, [params.id, setValue]);

  const handleCodigoChange = (selectedOption) => {
    setValue("codigo", selectedOption);

    const inventario = inventarios.find(
      (item) => item.codigo === selectedOption.value
    );
    if (inventario) {
      setExistingInventario(inventario);
      setValue("producto", inventario.producto);
      setValue("stock", inventario.stock);
      setValue("talla", inventario.talla);
    } else {
      setExistingInventario(null);
      setValue("producto", "");
      setValue("stock", "");
      setValue("talla", "");
    }
  };
  const handleDelete = async () => {
    await deleteInventario(params.id);
    navigate("/inventario");
  };

  const cantidadIngresar = watch("cantidad_ingresar");
  const stock = watch("stock");

  useEffect(() => {
    if (existingInventario) {
      setValue(
        "stock",
        parseInt(existingInventario.stock) + parseInt(cantidadIngresar || 0)
      );
    } else {
      setValue("stock", cantidadIngresar);
    }
  }, [cantidadIngresar, existingInventario, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = {
      ...data,
      codigo: data.codigo.value,
      proveedor: data.proveedor.value,
    };

    const precioTotal = data.cantidad_ingresar * data.precio;

    if (existingInventario) {
      const updatedStock =
        parseInt(existingInventario.stock) + parseInt(data.cantidad_ingresar);
      await updateInventario(existingInventario.id, {
        ...formData,
        stock: updatedStock,
      });

      await createStockHistoria({
        codigo: data.codigo.value,
        cantidad_ingresada: data.cantidad_ingresar,
        fecha: data.fecha_ingresa_producto,
        precio: precioTotal,
        comentario: `Se realizo el ingreso del producto: ${data.producto}`,
      });
    } else {
      await createInventario(formData);

      await createStockHistoria({
        codigo: data.codigo.value,
        cantidad_ingresada: data.cantidad_ingresar,
        fecha: data.fecha_ingresa_producto,
        precio: precioTotal,
        comentario: `Se realizo el ingreso del producto: ${data.producto}`,
      });
    }
    const res = await getAllInventario();
    setInventario(res.data);

    navigate("/inventario");
  });

  return (
    <div className="container mt-3">
      <form onSubmit={onSubmit} className="row g-3 needs-validation container_inventario">
      <Link to='/inventario' className="fs-3"><i className="bi bi-arrow-left-circle-fill"></i></Link>
        <h1 className="titulos">Ingrese un Producto</h1>
        <div className="col-md-4">
          <label className="form-label">Código:</label>
          <Controller
            name="codigo"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                className="form-clientes"
                options={inventarios.map((inventario) => ({
                  value: inventario.codigo,
                  label: inventario.codigo,
                }))}
                placeholder="Ingrese o seleccione un código"
                onChange={(value) => {
                  field.onChange(value);
                  handleCodigoChange(value);
                }}
              />
            )}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Ingrese el nombre del producto:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            className="form-control form-clientes"
            {...register("producto", { required: true })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Cantidad del producto</label>
          <input
            type="number"
            className="form-control form-clientes"
            placeholder="Cantidad del producto"
            {...register("cantidad_ingresar", { required: true })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">
            <i className="bi bi-currency-dollar"></i>Precio
          </label>
          <input
            type="number"
            className="form-control form-clientes"
            placeholder="Precio del producto"
            {...register("precio", { required: true })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Descripcion:</label>
          <textarea
            placeholder="Descripción"
            className="form-control form-clientes"
            {...register("descripcion", { required: true })}
          ></textarea>
        </div>
        <div className="col-md-3">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            placeholder="Stock"
            className="form-control form-clientes"
            readOnly
            {...register("stock", { required: true })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Talla:</label>
          <input
            type="text"
            placeholder="Talla"
            className="form-control form-clientes"
            {...register("talla", { required: true })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Fecha Ingresa Producto:</label>
          <input
            type="date"
            className="form-control form-clientes"
            {...register("fecha_ingresa_producto", { required: true })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Modelo</label>
          <select
            className="form-select form-clientes"
            {...register("modelo", { required: true })}
          >
            <option value="">Selecciona el Modelo</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Proveedor</label>
          <Controller
            name="proveedor"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="form-clientes"
                options={facturas.map((factura) => ({
                  value: factura.id,
                  label: factura.proveedor,
                }))}
                placeholder="Seleccione el proveedor"
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
        <div className="row mt-4">
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
              <h5>¿Estás seguro de eliminar este Producto?</h5>
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
