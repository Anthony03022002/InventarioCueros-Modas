import { useForm } from "react-hook-form";
import { createFacturas, deleteFacturas, getFactura, updateFacturas } from "../api/facturas.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function FacturasForm() {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [fileUrl, setFileUrl] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('proveedor', data.proveedor);
    formData.append('fecha', data.fecha);
    if (data.file[0]) {
      formData.append('file', data.file[0]);
    }
    if (params.id) {
      await updateFacturas(params.id, formData);
    } else {
      await createFacturas(formData);
    }
    navigate('/facturas');
  });

  useEffect(() => {
    async function actualizarFacturas() {
      if (params.id) {
        const { data } = await getFactura(params.id);
        setValue('proveedor', data.proveedor);
        setValue('fecha', data.fecha);
        setFileUrl(data.fileUrl); 
      }
    }
    actualizarFacturas();
  }, [params.id, setValue]);

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Proveedor"
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
      {fileUrl && (
        <div>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">Ver archivo actual</a>
        </div>
      )}
      {params.id && (
        <button onClick={async () => {
          const acepta = window.confirm('Estas seguro de eliminarlo');
          if (acepta) {
            await deleteFacturas(params.id);
            navigate('/facturas');
          }
        }}>Eliminar</button>
      )}
    </div>
  );
}
