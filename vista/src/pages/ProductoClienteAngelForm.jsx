import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { getAllClientesAngel } from "../api/clientesAngel.api";
import { getAllInventario, updateInventario } from "../api/inventario.api";
import { useForm } from "react-hook-form";
import {
  creatproductoClienteAngel,
  deleteProductoClienteAngel,
  updateProductoClienteAngel,
  getProductoAngel,
} from "../api/productoAngel.api";
import { useNavigate, useParams } from "react-router-dom";
import { createVentasHistorial } from "../api/ventasHistorial.api";

export function ProductoClienteAngelForm() {
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
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

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateProductoClienteAngel(params.id, data);
    } else {
      await creatproductoClienteAngel(data);
    }

    const selectedProductData = inventarios.find(
      (item) => item.id === data.producto
    );
    if (selectedProductData) {
      const updatedStock = selectedProductData.stock - data.cantidad;
      await updateInventario(data.producto, {
        ...selectedProductData,
        stock: updatedStock,
      });

      await createVentasHistorial({
        codigo: selectedProductData.codigo,
        cantidad_venta: data.cantidad,
        fecha: data.fecha_venta,
        precio: data.total_pagar,
        comentario: `Se realizó la venta del producto: ${selectedProductData.producto}`,
      });
    }

    navigate("/productosAngel");
  });

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
      setIsButtonDisabled(product.stock === 0);
    },
    [inventarios, setValue]
  );

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10) || 0;
    setCantidad(nuevaCantidad);
    const totalPagar = nuevaCantidad * precio;
    setValue("total_pagar", totalPagar);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "cantidad") {
        const nuevaCantidad = parseInt(value.cantidad, 10) || 0;
        const totalPagar = nuevaCantidad * precio;
        setValue("total_pagar", totalPagar);
      }
    });
    return () => subscription.unsubscribe();
  }, [precio, setValue, watch]);

  const handleDelete = async () => {
    await deleteProductoClienteAngel(params.id);
    navigate("/productosAngel");
  };

  useEffect(() => {
    async function actualizarProducto() {
      if (params.id) {
        const { data } = await getProductoAngel(params.id);

        setValue("cantidad", data.cantidad);
        setValue("estado", data.estado);
        setValue("fecha_venta", data.fecha_venta);
        setValue("total_pagar", data.total_pagar);

        const clienteSeleccionado = clientesAngel.find(
          (cliente) => cliente.id === data.cliente
        );
        const productoSeleccionado = inventarios.find(
          (producto) => producto.id === data.producto
        );

        setSelectedClient(
          clienteSeleccionado
            ? {
                value: clienteSeleccionado.id,
                label: clienteSeleccionado.nombre_completo,
              }
            : null
        );
        setSelectedProduct(
          productoSeleccionado
            ? {
                value: productoSeleccionado.id,
                label: productoSeleccionado.producto,
              }
            : null
        );

        setValue("cliente", data.cliente);
        setValue("producto", data.producto);
        setIsButtonDisabled(
          productoSeleccionado ? productoSeleccionado.stock === 0 : true
        );
      }
    }
    actualizarProducto();
  }, [params.id, clientesAngel, inventarios]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="cliente">Cliente:</label>
        <Select
          value={selectedClient}
          onChange={(selectedOption) => {
            setSelectedClient(selectedOption);
            setValue("cliente", selectedOption.value);
          }}
          options={clientesAngel.map((cliente) => ({
            value: cliente.id,
            label: cliente.nombre_completo,
          }))}
          placeholder="Buscar cliente..."
        />
        {errors.cliente && <span>Debe seleccionar un cliente.</span>}
        <br />
        <label htmlFor="producto">Producto:</label>
        <Select
          {...register("producto", { required: true })}
          value={selectedProduct}
          onChange={handleProductChange}
          options={inventarios.map((inventario) => ({
            value: inventario.id,
            label: inventario.producto,
          }))}
          placeholder="Buscar Producto..."
          isSearchable
        />
        {errors.producto && <span>Debe seleccionar un producto.</span>}
        <input
          type="number"
          placeholder="Cantidad del producto"
          onChange={handleCantidadChange}
          {...register("cantidad", { required: true })}
        />
        {errors.cantidad && <span>Debe ingresar una cantidad.</span>}
        <br />
        <input
          type="number"
          placeholder="Total a Pagar"
          {...register("total_pagar", { required: true })}
          readOnly
        />
        {errors.total_pagar && <span>Debe ingresar el total a pagar.</span>}
        <input type="date" {...register("fecha_venta", { required: true })} />
        {errors.fecha_venta && (
          <span>Debe seleccionar una fecha de venta.</span>
        )}
        <label>Estado del Pago:</label>
        <select {...register("estado", { required: true })}>
          <option value="">Selecciona el Estado del Pago</option>
          <option value="pendiente">Pendiente</option>
          <option value="cancelado">Cancelado</option>
        </select>
        {errors.estado && <span>Debe seleccionar un estado.</span>}
        <br />
        <button type="submit" disabled={isButtonDisabled}>
          Enviar
        </button>
        {params.id && (
          <>
            <button type="button" onClick={() => setShowModal(true)}>
              <i className="bi bi-trash3-fill"></i>
            </button>
          </>
        )}
      </form>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="precio">Precio:</label>
            </td>
            <td>
              <input
                type="number"
                value={precio}
                placeholder="Precio"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="stock">Stock:</label>
            </td>
            <td>
              <input type="number" value={stock} placeholder="Stock" readOnly />
            </td>
          </tr>
        </tbody>
      </table>
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
    </div>
  );
}
