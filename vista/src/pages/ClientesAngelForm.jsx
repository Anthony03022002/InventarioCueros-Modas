import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createClienteAngel } from "../api/clientesAngel.api";

export function ClientesAngelForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async data=>{
    await createClienteAngel(data);

    const confirmacion = window.confirm("¿Desea crear una venta?");
    if (confirmacion) {
      navigate('/crear-productosAngel');
    }
  });


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
        <button type="submit">Enviar</button>
      </form>

    </div>
  );
}
