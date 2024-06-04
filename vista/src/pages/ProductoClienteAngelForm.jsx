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
      if(product.stock === 0){
        alert('Producto no disponible');
      };
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
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        className="row g-3 needs-validation container_clientes_angel"
      >
        <h1 className="titulos">Ingrese su venta Clientes Angel</h1>
        <div className="col-md-3">
          <label className="form-label">Cliente:</label>
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
        </div>
        {errors.cliente && <span>Debe seleccionar un cliente.</span>}
        <div className="col-md-3">
          <label className="form-label">Producto:</label>
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
        </div>
        {errors.producto && <span>Debe seleccionar un producto.</span>}
        <div className="col-md-3">
          <label className="form-label">Cantidad a vender:</label>
          <input
            type="number"
            placeholder="Cantidad del producto"
            className="form-control form-clientes"
            onChange={handleCantidadChange}
            {...register("cantidad", { required: true })}
          />
        </div>
        {errors.cantidad && <span>Debe ingresar una cantidad.</span>}

        <div className="col-md-3">
          <label className="form-label">
            <i class="bi bi-currency-dollar"></i>Precio:
          </label>
          <input
            type="number"
            className="form-control form-clientes"
            value={precio}
            placeholder="Precio"
            readOnly
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            className="form-control form-clientes"
            value={stock}
            placeholder="Stock"
            readOnly
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">
            <i class="bi bi-currency-dollar"></i>Total a Pagar:
          </label>
          <input
            type="number"
            className="form-control form-clientes"
            placeholder="Total a Pagar"
            {...register("total_pagar", { required: true })}
            readOnly
          />
        </div>
        {errors.total_pagar && <span>Debe ingresar el total a pagar.</span>}
        <div className="col-md-3">
          <label className="form-label">Fecha de venta:</label>
          <input
            className="form-control form-clientes"
            type="date"
            {...register("fecha_venta", { required: true })}
          />
        </div>
        {errors.fecha_venta && (
          <span>Debe seleccionar una fecha de venta.</span>
        )}
      <div className="col-md-3">
      <label className="form-label">Estado del Pago:</label>
        <select className="form-select form-clientes" {...register("estado", { required: true })}>
          <option value="">Selecciona el Estado del Pago</option>
          <option value="pendiente">Pendiente</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
        {errors.estado && <span>Debe seleccionar un estado.</span>}
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
            <button type="submit"  className="btn btn-primary">
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
    </div>
  );
}
