import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { getAllClientesAngel } from "../api/clientesAngel.api";
import { getAllInventario } from "../api/inventario.api";
import { useForm } from "react-hook-form";
import { creatproductoClienteAngel, deleteProductoClienteAngel, updateProductoClienteAngel, getProductoAngel } from "../api/productoAngel.api";
import { useNavigate, useParams } from "react-router-dom";

export function ProductoClienteAngelForm() {
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [setCantidad] = useState(0);
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
      updateProductoClienteAngel(params.id, data)
    }else{
      await creatproductoClienteAngel(data);
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

  useEffect(() => {
    async function actualizarProducto() {
      if (params.id) {
        const { data } = await getProductoAngel(params.id);

        setValue("cantidad", data.cantidad);
        setValue("estado", data.estado);
        setValue("fecha_venta", data.fecha_venta);
        setValue("total_pagar", data.total_pagar);

        const clienteSeleccionado = clientesAngel.find(cliente => cliente.id === data.cliente);
        const productoSeleccionado = inventarios.find(producto => producto.id === data.producto);

        setSelectedClient(clienteSeleccionado ? { value: clienteSeleccionado.id, label: clienteSeleccionado.nombre_completo } : null);
        setSelectedProduct(productoSeleccionado ? { value: productoSeleccionado.id, label: productoSeleccionado.producto } : null);

        setValue("cliente", data.cliente);
        setValue("producto", data.producto);
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
          <option value="pagado">Pagado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        {errors.estado && <span>Debe seleccionar un estado.</span>}
        <br />
        <button>Enviar</button>
        {params.id && (
        <button
          onClick={async()=>{
            const acepta = window.confirm("Estas seguro de eliminarlo")
            if (acepta) {
              await deleteProductoClienteAngel(params.id)
              navigate("/productosAngel")
            }
          }}
        ><i className="bi bi-trash3-fill"></i></button>
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
    </div>
  );
}
