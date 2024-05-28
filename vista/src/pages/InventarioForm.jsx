import { getAllFacturas } from "../api/facturas.api";
import { useEffect, useState } from "react";
import { createInventario, deleteInventario, updateInventario, getInventario } from "../api/inventario.api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
export function InventarioForm() {
  const [facturas, setFacturas] = useState([]);

  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function cargarFacturas() {
      const res = await getAllFacturas();
      setFacturas(res.data);
    }
    cargarFacturas();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateInventario(params.id, data)
    } else {
      await createInventario(data);
    }
    navigate("/inventario");
  });
  useEffect(()=>{
    async function actualizarInventario() {
      if (params.id) {
       const {data}=  await getInventario(params.id);
       setValue('codigo', data.codigo)
       setValue('producto', data.producto)
       setValue('cantidad_ingresar',data.cantidad_ingresar)
       setValue('precio', data.precio)
       setValue('stock', data.stock)
       setValue('descripcion', data.descripcion)
       setValue('talla', data.talla)
       setValue('fecha_ingresa_producto', data.fecha_ingresa_producto)
       setValue('modelo', data.modelo)
       setValue('proveedor', data.proveedor)
      }
    }
    actualizarInventario()
  },[])


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Ingrese el código"
          {...register("codigo", { required: true })}
        />
        <input
          type="text"
          placeholder="Ingrese el producto"
          {...register("producto", { required: true })}
        />
        <input
          type="number"
          placeholder="Cantidad del producto"
          {...register("cantidad_ingresar", { required: true })}
        />
        <input
          type="number"
          placeholder="Precio del producto"
          {...register("precio", { required: true })}
        />
        <input
          type="number"
          placeholder="Stock"
          {...register("stock", { required: true })}
        />
        <textarea
          placeholder="Descripcion"
          {...register("descripcion", { required: true })}
        ></textarea>
        <input
          type="text"
          placeholder="talla"
          {...register("talla", { required: true })}
        />
        <input
          type="date"
          {...register("fecha_ingresa_producto", { required: true })}
        />
        <label>Modelo</label>
        <select {...register("modelo", { required: true })}>
          <option value="">Selecciona el Modelo</option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>
        <label>Proveedor</label>
        <select {...register("proveedor", { required: true })}>
          <option>Seleccione el proveedor</option>
          {facturas.map((factura) => (
            <option key={factura.id} value={factura.id}>
              {factura.proveedor}
            </option>
          ))}
        </select>
        <button>Enviar</button>
      </form>

      {params.id && (
        <button
          onClick={async () => {
            const acepta = window.confirm("Estas seguro de eliminarlo");
            if (acepta) {
              await deleteInventario(params.id);
              navigate("/inventario");
            }
          }}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      )}
    </div>
  );
}
