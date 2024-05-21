import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { createClienteAngel } from "../api/clientesAngel.api";
import { getAllInventario } from "../api/inventario.api";

export function ClientesAngelForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [inventarios, setInventario] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([]);
  

  const cantidadRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    data.producto = selectedProductos.map((p) => p.value);
    await createClienteAngel(data);
    navigate("/clientesAngel");
  });

  const handleProductoChange = (selectedOptions) => {
    setSelectedProductos(selectedOptions);
  };

  const productOptions = inventarios.map((inventario) => ({
    value: inventario.id,
    label: inventario.producto,
    stock: inventario.stock,
    precio: inventario.precio // Assuming stock is the field name in your model
  }));

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          placeholder="Cedula"
          {...register("cedula", { required: true })}
        />
        {errors.cedula && <span>Este campo es requerido</span>}

        <input
          type="text"
          placeholder="Nombre completo"
          {...register("nombre_completo", { required: true })}
        />
        {errors.nombre_completo && <span>Este campo es requerido</span>}

        <input
          type="email"
          placeholder="Correo electronico"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Este campo es requerido</span>}

        <input
          type="number"
          placeholder="Celular"
          {...register("celular", { required: true })}
        />
        {errors.celular && <span>Este campo es requerido</span>}

        <input
          type="text"
          placeholder="Direccion"
          {...register("direccion", { required: true })}
        />
        {errors.direccion && <span>Este campo es requerido</span>}

        <label>Selecciona los productos:</label>
        <Select
          isMulti
          options={productOptions}
          onChange={handleProductoChange}
          placeholder="Busca y selecciona productos..."
        />

        <input
          ref={cantidadRef}
          type="number"
          placeholder="Cantidad del producto"
          {...register("cantidad_producto", { required: true })}
        />
        {errors.cantidad_producto && <span>Este campo es requerido</span>}

        <input
          type="number"
          placeholder="Total a pagar"
          {...register("total_pagar", { required: true })}
        />
        {errors.total_pagar && <span>Este campo es requerido</span>}

        <input type="date" {...register("fecha_venta", { required: true })} />
        {errors.fecha_venta && <span>Este campo es requerido</span>}

        <label>Estado del Pago:</label>
        <select {...register("estado", { required: true })}>
          <option value="pagado">Por pagar</option>
          <option value="cancelado">Cancelado</option>
        </select>
        {errors.estado && <span>Este campo es requerido</span>}

        <button type="submit">Enviar</button>
      </form>

      <h3>Productos Seleccionados</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {selectedProductos.map((producto) => (
            <tr key={producto.value}>
              <td>{producto.label}</td>
              <td>{producto.stock}</td>
              <td>{producto.precio}</td>
              {/* <td>{producto.precio * producto.stock}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
