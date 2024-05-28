import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAllClientesAngel } from "../api/clientesAngel.api";
import { getAllInventario } from "../api/inventario.api";
import Select from "react-select";
import {
  creatproductoClienteAngel,
  deleteProductoClienteAngel,
  updateProductoClienteAngel,
  getProductoAngel,
} from "../api/productoAngel.api";

export function ProductoClienteAngelForm() {
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [productoInfo, setProductoInfo] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productos",
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function cargarClientesAngel() {
      const res = await getAllClientesAngel();
      setClientesAngel(res.data);
    }
    cargarClientesAngel();
  }, []);

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  const clienteOptions = clientesAngel.map((cliente) => ({
    value: cliente.id,
    label: cliente.nombre_completo,
  }));

  const inventarioOptions = inventarios.map((producto) => ({
    value: producto.id,
    label: producto.producto,
  }));

  const handleProductChange = (selectedOption, index) => {
    const selectedProduct = inventarios.find(
      (producto) => producto.id === selectedOption.value
    );
    const newProductoInfo = [...productoInfo];
    newProductoInfo[index] = {
      stock: selectedProduct.stock,
      precio: selectedProduct.precio,
    };
    setProductoInfo(newProductoInfo);
    setValue("producto", selectedOption.value);
    setValue("total_pagar", selectedProduct.precio);
  };

  const handleCantidadChange = (e, index) => {
    const cantidad = parseInt(e.target.value, 10) || 0;
    const precio = productoInfo[index]?.precio || 0;
    const totalPagar = cantidad * precio;
    setValue("cantidad", cantidad);
    setValue("total_pagar", totalPagar);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateProductoClienteAngel(params.id, data);
    } else {
      await creatproductoClienteAngel(data);
      const addMore = window.confirm("¿Desea ingresar otro producto?");
      if (!addMore) {
        setRedirect(true);
      }
      navigate("/productosAngel");
    }
  });

  useEffect(() => {
    async function actualizarProductos() {
      if (params.id) {
        try {
          const { data } = await getProductoAngel(params.id);

          if (clienteOptions && data && data.cliente) {

            const selectedCliente = clienteOptions.find(
              (option) => option.value === data.cliente
            );
            if (selectedCliente) {
              setValue("cliente", selectedCliente.value);
              setValue("estado", data.estado);
              setValue("fecha_venta", data.fecha_venta);
              setValue("cantidad", data.cantidad);
              setValue("total_pagar", data.total_pagar);
            }
          }
        } catch (error) {
          console.error("Error al obtener producto:", error);
        }
      }
    }

    actualizarProductos();
  }, [params.id, setValue, clienteOptions]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Controller
          name="cliente"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={clienteOptions}
              onChange={(selectedOption) => {
                field.onChange(selectedOption.value); // Actualiza solo el valor (ID) en el formulario
                setValue("cliente", selectedOption.value); // Actualiza solo el valor (ID) del Select
              }}
              placeholder="Seleccionar Cliente"
              value={
                clienteOptions.find((option) => option.value === field.value) ||
                null
              } // Asegúrate de que el valor actual se refleje en el Select
            />
          )}
        />
        <input type="date" {...register("fecha_venta")} />
        {fields.map((item, index) => (
          <div key={item.id}>
            <Select
              options={inventarioOptions}
              onChange={(selectedOption) =>
                handleProductChange(selectedOption, index)
              }
              placeholder="Seleccionar Producto"
            />
            <input
              type="number"
              {...register("cantidad")}
              placeholder="Cantidad"
              onChange={(e) => handleCantidadChange(e, index)}
            />
            <input
              type="number"
              {...register("total_pagar")}
              placeholder="Total a pagar"
              readOnly
            />
            <button type="button" onClick={() => remove(index)}>
              Eliminar Producto
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ producto: "", cantidad: 0, total_pagar: 0 })}
        >
          Agregar Producto
        </button>
        <label className="form-label">Estado del Pago:</label>
        <select
          className="form-select"
          {...register("estado", { required: true })}
        >
          <option value="">Selecciona el Estado del Pago</option>
          <option value="Pendiente">Pendiente</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
      {fields.map((item, index) => (
        <div key={index}>
          <div>Stock: {productoInfo[index]?.stock}</div>
          <div>Precio: {productoInfo[index]?.precio}</div>
        </div>
      ))}
      {params.id && (
        <button
          onClick={async () => {
            const acepta = window.confirm("Estas seguro de eliminarlo");
            if (acepta) {
              await deleteProductoClienteAngel(params.id);
              navigate("/productosAngel");
            }
          }}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      )}
    </div>
  );
}
