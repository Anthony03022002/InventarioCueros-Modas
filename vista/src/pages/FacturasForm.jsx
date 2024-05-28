import { useForm } from "react-hook-form";
import { createFacturas, deleteFacturas } from "../api/facturas.api";
import { useNavigate, useParams } from "react-router-dom";


export function FacturasForm() {
  const { register, handleSubmit, formState:{
    errors
  } } = useForm();

  const navigate = useNavigate()
  const params = useParams();


  const onSubmit = handleSubmit(async data=>{
   await createFacturas(data)
   navigate('/facturas')
  })


  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="proveedor"
          {...register("proveedor", { required: true })}
        />
        {errors.proveedor && <span>Este campo es requerido</span>}
        <input
          type="date"
          placeholder="Fecha"
          {...register("fecha", { required: true })}
        />
        {errors.fecha && <span>Este campo es requerido</span>}

        <input type="file" {...register("file", { required: true })} />
        {errors.file && <span>Este campo es requerido</span>}

        <button>Guardar</button>
      </form>
      {params.id && (
      <button onClick={async()=>{
        const acepta = window.confirm('Estas seguro de eliminarlo')
        if (acepta) {
          await deleteFacturas(params.id)
          navigate('/facturas')
        }
      }}>Eliminar</button>
      )}
    </div>
  );
}
