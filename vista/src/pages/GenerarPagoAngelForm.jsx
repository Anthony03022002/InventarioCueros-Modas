import { useForm } from "react-hook-form";
import { createPagosAngel } from "../api/generarPagoAngel.api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

export function GenerarPagoAngelForm() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const debe = location.state?.debe || 0;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.id) {
      setValue("venta", params.id);
    }
  }, [params.id, setValue]);

  const recalculateDebe = async (ventaId) => {
    const { data: producto } = await getProductoAngel(ventaId);
    const { data: pagos } = await getAllPagosAngel();
    const pagosFiltrados = pagos.filter(
      (pago) => pago.venta === parseInt(ventaId)
    );
    const totalPagado = pagosFiltrados.reduce(
      (total, pago) => total + parseFloat(pago.cantidad_pagada),
      0
    );
    setDebe(parseFloat(producto.total_pagar) - totalPagado);
  };
  const generatePDF = (data) => {
    const doc = new jsPDF();
    const nuevoDebe = debe - parseFloat(data.cantidad_pagada);
    // Establecer márgenes
    const marginLeft = 10;
    let marginTop = 20; // Inicialmente establecido en 20
  
    // Agregar título centrado
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = "Comprobante de Pago C & M SPORTS";
    doc.setFontSize(18);
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;
    doc.text(title, textX, marginTop); // Coordenada Y para el título
  
    // Agregar contenido del pago
    doc.setFontSize(12);
    doc.text(
      `Usted ha hecho el pago por el monto de $${data.cantidad_pagada}`,
      marginLeft,
      (marginTop += 20) // Ajuste de coordenada Y
    );
    doc.text(`Fecha del pago: ${data.fecha_pago}`, marginLeft, (marginTop += 10)); // Ajuste de coordenada Y
    if (data.descuento) {
      doc.text("Pago por descuento", marginLeft, (marginTop += 10)); // Ajuste de coordenada Y
    }
    doc.text(
      `Monto adeudado: $${nuevoDebe.toFixed(2)}`,
      marginLeft,
      (marginTop += 10) // Ajuste de coordenada Y
    );
  
    // Dibujar línea debajo del monto adeudado
    doc.setLineWidth(0.5);
    doc.line(marginLeft, marginTop + 5, pageWidth - marginLeft, marginTop + 5); // Línea debajo del monto adeudado
  
    // Mejorar vista del PDF
    doc.save(`C_Pago_${data.venta}_${data.fecha_pago}.pdf`);
  };
  

  const onSubmit = handleSubmit(async (data) => {
    await createPagosAngel(data);
    generatePDF(data);
    navigate(`/productosAngel/${params.id}/pagosMensualesAngel`);
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
            {...register("cantidad_pagada", { required: true })}
          />
        </div>
        {errors.cantidad_pagada && <span>Este campo es requerido</span>}
        <div className="col-md-4">
          <label className="form-label">ID cliente</label>
          <input
            type="text"
            placeholder="cliente"
            className="form-control"
            {...register("venta", { required: true })}
            readOnly
          />
        </div>
        {errors.venta && <span>Este campo es requerido</span>}
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
