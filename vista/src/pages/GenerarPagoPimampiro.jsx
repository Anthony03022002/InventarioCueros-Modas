import { useForm } from "react-hook-form";
import { createPagosPimampiro } from "../api/generarPagoPimampiro.api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { getClientePimampiro } from "../api/clientesPimampiro.api";


export function GenerarPagoPimampiroForm() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const clienteId = location.state?.clienteId || "";
  const deudaRestante = location.state?.debe || 0;
  const [clienteNombre, setClienteNombre] = useState("");


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (clienteId) {
      setValue("cliente", clienteId);
  
      getClientePimampiro(clienteId).then(response => {
        setClienteNombre(response.data.nombre_completo);
      }).catch(error => {
        console.error("Error al obtener el nombre del cliente:", error);
      });
    }
  }, [clienteId, setValue]);

  const generatePDF = (data, deudaRestante) => {
    const doc = new jsPDF();
    const nuevoDebe = deudaRestante - parseFloat(data.cantidad_pagada);
    
    const marginLeft = 10;
    let marginTop = 20; 

    const pageWidth = doc.internal.pageSize.getWidth();
    const title = "Comprobante de Pago C & M SPORTS";
    doc.setFontSize(18);
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;
    doc.text(title, textX, marginTop); 

    doc.setFontSize(12);
    doc.text(
      `El cliente ${clienteNombre}  ha hecho el pago por el monto de $${parseFloat(data.cantidad_pagada).toFixed(2)}`,
      marginLeft,
      (marginTop += 20)
    );
    doc.text(`Fecha del pago: ${data.fecha_pago}`, marginLeft, (marginTop += 10));
    if (data.descuento) {
      doc.text("Pago por descuento", marginLeft, (marginTop += 10));
    }
    doc.text(
      `Deuda Restante: $${nuevoDebe.toFixed(2)}`,
      marginLeft,
      (marginTop += 10)
    );

    doc.setLineWidth(0.5);
    doc.line(marginLeft, marginTop + 5, pageWidth - marginLeft, marginTop + 5); 

    doc.save(`C_Pago_${clienteNombre}.pdf`);
  };

  const onSubmit = handleSubmit(async (data) => {
    await createPagosPimampiro(data);
    generatePDF(data, deudaRestante);
    navigate('/clientePimampiroProducto');
  });

  return (
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        className="row g-3 needs-validation container_inventario"
      >
        <h1 className="titulos">Formulario de pagos</h1>
        <div className="col-md-4">
          <label className="form-label">Fecha de pago</label>
          <input
            className="form-control"
            type="date"
            {...register("fecha_pago", { required: true })}
          />
        </div>
        {errors.fecha_pago && <span>Este campo es requerido</span>}
        <div className="col-md-4">
          <label className="form-label">Cantidad a Pagar:</label>
          <input
            type="number"
            placeholder="cantidad a pagar"
            className="form-control"
            step="0.01"
            {...register("cantidad_pagada", { required: true })}
          />
        </div>
        {errors.cantidad_pagada && <span>Este campo es requerido</span>}
        <div className="col-md-4">
          <label className="form-label">ID cliente</label>
          <input
            type="text"
            placeholder="cliente"
            value={clienteId}
            className="form-control"
            {...register("cliente", { required: true })}
          />
        </div>
        {errors.cliente && <span>Este campo es requerido</span>}
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("descuento")}
          />
          <label className="form-check-label">Descuento</label>
        </div>
        <div className="col-12 text-end">
          <button className="btn btn-primary">
            <i className="bi bi-send-check-fill me-2"></i>Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
