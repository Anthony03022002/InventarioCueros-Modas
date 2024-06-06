import { useForm } from "react-hook-form";
import { createPagosOtavalo } from "../api/generarPagoOtavalo.api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect} from "react";
import { jsPDF } from "jspdf";

export function GenerarPagoOtavaloForm() {
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
    const { data: producto } = await getProductoOtavalo(ventaId);
    const { data: pagos } = await getAllPagosOtavalo();
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
    let marginTop = 20; 
  
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = "Comprobante de Pago C & M SPORTS";
    doc.setFontSize(18);
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;
    doc.text(title, textX, marginTop); 
  
    
    doc.setFontSize(12);
    doc.text(
      `Usted ha hecho el pago por el monto de $${data.cantidad_pagada}`,
      marginLeft,
      (marginTop += 20) 
    );
    doc.text(`Fecha del pago: ${data.fecha_pago}`, marginLeft, (marginTop += 10)); 
    if (data.descuento) {
      doc.text("Pago por descuento", marginLeft, (marginTop += 10)); 
    }
    doc.text(
      `Monto adeudado: $${nuevoDebe.toFixed(2)}`,
      marginLeft,
      (marginTop += 10) 
    );
  
   
    doc.setLineWidth(0.5);
    doc.line(marginLeft, marginTop + 5, pageWidth - marginLeft, marginTop + 5); 
  
    
    doc.save(`C_Pago_${data.venta}_${data.fecha_pago}.pdf`);
  };
  

  const onSubmit = handleSubmit(async (data) => {
    await createPagosOtavalo(data);
    generatePDF(data);
    navigate(`/ventasOtavalo/${params.id}/pagosMensualesOtavalo`);
  });

  return (
    <div className="container mt-3">
      <form
        onSubmit={onSubmit}
        className="row g-3 needs-validation container_inventario"
        
      >
        <h1 className="titulos">Formulario de pagos Otavalo</h1>
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
