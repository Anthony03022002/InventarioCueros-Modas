import { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { getAllClientesCayambe } from "../api/clientesCayambe.api";
import { getAllInventario, updateInventario } from "../api/inventario.api";
import { useForm } from "react-hook-form";
import {
  creatVentasCayambe,
  deleteVentasCayambe,
  updateVentasCayambe,
  getVentaCayambe,
} from "../api/ventasCayambe.api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createVentasHistorial } from "../api/ventasHistorial.api";

export function VentasCayambeForm() {
  const [clientesCayambe, setClientesCayambe] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [saldoAnterior, setSaldoAnterior] = useState(0);

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
    async function cargarclientesCayambe() {
      const res = await getAllClientesCayambe();
      setClientesCayambe(res.data);
    }
    cargarclientesCayambe();
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
      await updateVentasCayambe(params.id, data);
    } else {
      await creatVentasCayambe(data);

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
    }

    setShowConfirmationModal(true);
  });

  const handleProductChange = useCallback(
    (selectedOption) => {
      const selectedProductId = selectedOption?.value;
      const product = inventarios.find(
        (item) => item.id === selectedProductId
      ) || { precio: 0, stock: 0, codigo: "" };

      setSelectedProduct(selectedOption);
      setValue("producto", selectedProductId || "");
      setPrecio(product.precio);
      setStock(product.stock);
      setValue("total_pagar", product.precio);
      if (product.stock === 0) {
        setShowOutOfStockModal(true);
      }
    },
    [inventarios, setValue]
  );
  const handleConfirmation = (decision) => {
    setShowConfirmationModal(false);
    if (!decision) {
      navigate("/ventasCayambe");
    }
  };

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10) || 0;
    setCantidad(nuevaCantidad);
    const totalPagar = nuevaCantidad * precio + saldoAnterior;
    setValue("total_pagar", totalPagar);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "cantidad" || name === "cantidad_adeudada") {
        const nuevaCantidad = parseInt(value.cantidad, 10) || 0;
        const nuevoSaldoAnterior = parseInt(value.cantidad_adeudada, 10) || 0;
        const totalPagar = nuevaCantidad * precio + nuevoSaldoAnterior;
        setValue("total_pagar", totalPagar);
      }
    });
    return () => subscription.unsubscribe();
  }, [precio, setValue, watch]);

  const handleDelete = async () => {
    await deleteVentasCayambe(params.id);
    navigate("/ventasCayambe");
  };

  useEffect(() => {
    async function actualizarProducto() {
      if (params.id) {
        const { data } = await getVentaCayambe(params.id);

        setValue("cantidad", data.cantidad);
        setValue("estado", data.estado);
        setValue("cantidad_adeudada", data.cantidad_adeudada);
        setValue("fecha_venta", data.fecha_venta);
        setValue("total_pagar", data.total_pagar);

        setSaldoAnterior(data.cantidad_adeudada);

        const clienteSeleccionado = clientesCayambe.find(
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
                label: productoSeleccionado.codigo,
              }
            : null
        );

        setValue("cliente", data.cliente);
        setValue(
          "producto",
          productoSeleccionado ? productoSeleccionado.id : ""
        );
      }
    }
    actualizarProducto();
  }, [params.id, clientesCayambe, inventarios]);

  return (
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        className="row g-3 needs-validation container_clientes_angel"
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/ventasCayambe" className="fs-3">
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>
          <div className="flex-grow-1 d-flex justify-content-center">
            <h1 className="titulos">Ingrese su venta Clientes Cayambe</h1>
          </div>
          <div className="fs-3" style={{ visibility: "hidden" }}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">Cliente:</label>
          <Select
            value={selectedClient}
            onChange={(selectedOption) => {
              setSelectedClient(selectedOption);
              setValue("cliente", selectedOption.value);
            }}
            options={clientesCayambe.map((cliente) => ({
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
              label: inventario.codigo,
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
          <label className="form-label">Saldo anterior:</label>
          <input
            type="number"
            placeholder="Cantidad del producto"
            className="form-control form-clientes"
            {...register("cantidad_adeudada", { required: true })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">
            <i className="bi bi-currency-dollar"></i>Precio:
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
            <i className="bi bi-currency-dollar"></i>Total a Pagar:
          </label>
          <input
            type="number"
            className="form-control form-clientes"
            placeholder="Total a Pagar"
            {...register("total_pagar", { required: true })}
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
          <select
            className="form-select form-clientes"
            {...register("estado", { required: true })}
          >
            <option value="">Selecciona el Estado del Pago</option>
            <option value="pendiente">Pendiente</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        {errors.estado && <span>Debe seleccionar un estado.</span>}
        <div className="row mt-3 pt-3">
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
              <h5>¿Estás seguro de que deseas eliminar esta venta?</h5>
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
      {showConfirmationModal && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Producto registrado correctamente
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmationModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-start">
                <p>¿Desea ingresar otro producto?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleConfirmation(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleConfirmation(true)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showOutOfStockModal && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                  Producto no disponible
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowOutOfStockModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-start">
                <p>El producto seleccionado no tiene stock disponible.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowOutOfStockModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
