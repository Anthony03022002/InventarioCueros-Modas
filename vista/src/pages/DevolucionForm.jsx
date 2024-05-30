import { useForm } from "react-hook-form";
import {
  createdevoluciones,
  deleteDevoluciones,
  getDevolucion,
  updateDevoluciones,
} from "../api/devoluciones.api";
import { useNavigate, useParams } from "react-router-dom";
import { getAllInventario } from "../api/inventario.api";
import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";

export function DevolucionForm() {
  const [inventarios, setInventario] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
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
    navigate("/devoluciones");
  });

  useEffect(() => {
    async function actualizarDevoluciones() {
      if (params.id) {
        const { data } = await getDevolucion(params.id);
        setValue('devolucion', data.devolucion);
        setValue('cantidad_devolver', data.cantidad_devolver);
        setValue('proveedor', data.proveedor);
        setValue('producto', data.producto);
        setValue('fecha_devolucion', data.fecha_devolucion);
        setValue('observacion', data.observacion);
        setValue('responsable', data.responsable);

        const selectedProduct = inventarios.find(item => item.id === data.producto) || {};
        setSelectedProduct({ value: data.producto, label: selectedProduct.producto });
        setPrecio(selectedProduct.precio || 0);
        setStock(selectedProduct.stock || 0);
      }
    }
    actualizarDevoluciones();
  }, [params.id, setValue, inventarios]);

  const handleProductChange = useCallback(
    (selectedOption) => {
      const selectedProductId = selectedOption?.value;
      const product = inventarios.find(
        (item) => item.id === selectedProductId
      ) || { precio: 0, stock: 0 };

      setSelectedProduct(selectedOption);
      setValue("producto", selectedProductId || "");
      setPrecio(product.precio);
      setStock(product.stock);
      setValue("total_pagar", product.precio);
    },
    [inventarios, setValue]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          defaultValue={devolucion}
          {...register("devolucion", { required: true })}
          readOnly
        />
        {errors.devolucion && <span>Ingrese devolucion</span>}

        <input
          type="number"
          placeholder="cantidad a devolver"
          {...register("cantidad_devolver", { required: true })}
        />
        {errors.cantidad_devolver && <span>Ingrese cantidad a devolver</span>}

        <label>Producto</label>
        <Select
          value={selectedProduct}
          onChange={handleProductChange}
          options={inventarios.map((inventario) => ({
            value: inventario.id,
            label: inventario.producto,
          }))}
          placeholder="Buscar producto"
          isSearchable
        />
        {errors.producto && <span>Ingrese producto</span>}

        {selectedProduct && (
          <>
            <input
              type="text"
              placeholder="Precio"
              value={precio}
              {...register("precio", { required: true })}
              readOnly
            />
            {errors.precio && <span>Ingrese precio</span>}

            <input
              type="text"
              placeholder="Stock"
              value={stock}
              {...register("stock", { required: true })}
              readOnly
            />
            {errors.stock && <span>Ingrese stock</span>}
          </>
        )}

        <label>ID Proveedor:</label>
        <input
          type="text"
          placeholder="Proveedor"
          {...register("proveedor", { required: true })}
          readOnly
        />
        {errors.proveedor && <span>Ingrese proveedor</span>}

        <input
          type="date"
          {...register("fecha_devolucion", { required: true })}
        />
        {errors.fecha_devolucion && <span>Ingrese fecha_devolucion</span>}

        <textarea
          placeholder="observación"
          {...register("observacion", { required: true })}
        ></textarea>
        {errors.observacion && <span>Ingrese observacion</span>}

        <label>Responsable:</label>
        <select {...register("responsable", { required: true })}>
          <option value="">Ingrese el responsable</option>
          <option value="persona1">Persona 1</option>
          <option value="persona2">Persona 2</option>
        </select>
        {errors.responsable && <span>Ingrese responsable</span>}

        <button>Enviar</button>
        {params.id && (
          <button
            type="button"
            onClick={async () => {
              const acepta = window.confirm("Estas seguro de eliminarlo");
              if (acepta) {
                await deleteDevoluciones(params.id);
                navigate("/devoluciones");
              }
            }}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        )}
      </form>
    </div>
  );
}
