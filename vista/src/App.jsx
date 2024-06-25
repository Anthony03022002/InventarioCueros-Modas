import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import { Navegacion } from "./components/Navegacion";
import { Facturas } from "./components/Facturas";
import { Inventario } from "./components/Inventario";
import { DevolucionesList } from "./components/DevolucionesList";
import { DevolucionForm } from "./pages/DevolucionForm";
import { ClientesAngelList } from "./components/ClientesAngelList";
import { ClientesAtuntaquiList } from "./components/ClientesAtuntaquiList";
import { ClientesBolivarList } from "./components/ClientesBolivarList";
import { ClientesCayambeList } from "./components/ClientesCayambeList";
import { ClientesIbarraList } from "./components/ClientesIbarraList";
import { ClientesLagoagrioList } from "./components/ClientesLagoagrioList";
import { ClientesMiraList } from "./components/ClientesMiraList";
import { ClientesOtavaloList } from "./components/ClientesOtavaloList";
import { ClientesPimampiroList } from "./components/ClientesPimampiroList";
import { FacturasForm } from "./pages/FacturasForm";
import { ClientesAngelForm } from "./pages/ClientesAngelForm";
import { ProductoClienteAngelList } from "./components/ProductoClienteAngelList";
import { ProductoClienteAngelForm } from "./pages/ProductoClienteAngelForm";
import { InventarioForm } from "./pages/InventarioForm";
import { StockHistorial } from "./components/StockHistorial";
import { VentasHistorial } from "./components/VentasHistorial";
import { DevolucionesHistorial } from "./components/DevolucionesHistorial";
import { GenerarPagoAngelForm } from "./pages/GenerarPagoAngelForm";
import { Pagos } from "./components/Pagos";
import { PagosForm } from "./pages/PagosForm";
import { ClientesAtuntaquiForm } from "./pages/ClientesAtuntaquiForm";
import { ClientesBolivarForm } from "./pages/ClientesBolivarForm";
import { ClientesCayambeForm } from "./pages/ClientesCayambeForm";
import { ClientesIbarraForm } from "./pages/ClientesIbarraForm";
import { ClientesLagoagrioForm } from "./pages/ClientesLagoagrioForm";
import { ClientesMiraForm } from "./pages/ClientesMiraForm";
import { ClientesOtavaloForm } from "./pages/ClientesOtavaloForm";
import { ClientesPimampiroForm } from "./pages/ClientesPimapiroForm";
import { VentasAtuntaquiList } from "./components/VentasAtuntaquiList";
import { VentasAtuntaquiForm } from "./pages/VentasAtuntaquiForm";
import { GenerarPagoAtuntaquiForm } from "./pages/GenerarPagoAtuntaquiForm";
import { GenerarPagoBolivarForm } from "./pages/GenerarPagoBolivarForm";
import { GenerarPagoCayambeForm } from "./pages/GenerarPagoCayambeForm";
import { GenerarPagoIbarraForm } from "./pages/GenerarPagoIbarraForm";
import { PagosAtuntaquiForm } from "./pages/PagosAtuntaquiForm";
import { VentasBolivarList } from "./components/VentasBolivarList";
import { VentasBolivarForm } from "./pages/VentasBolivarForm";
import { VentasCayambeList } from "./components/VentasCayambeList";
import { VentasCayambeForm } from "./pages/VentasCayambeForm";
import { VentasIbarraList } from "./components/VentasIbarraList";
import { VentasIbarraForm } from "./pages/VentasIbarraForm";
import { PagosBolivarForm } from "./pages/PagosBolivarForm";
import { PagosCayambeForm } from "./pages/PagosCayambeForm";
import { PagosIbarraForm } from "./pages/PagosIbarraForm";
import { VentasLagoagrioList } from "./components/VentasLagoagrioList";
import { VentasLagoagrioForm } from "./pages/VentasLagoagrioForm";
import { GenerarPagoLagoagrioForm } from "./pages/GenerarPagoLagoagrioForm";
import { PagosLagoagrioForm } from "./pages/PagosLagoagrioForm";
import { VentasMiraList } from "./components/VentasMiraList";
import { VentasMiraForm } from "./pages/VentasMiraForm";
import { GenerarPagoMiraForm } from "./pages/GenerarPagoMiraForm";
import { PagosMiraForm } from "./pages/PagosMiraForm";
import { VentasOtavaloList } from "./components/VentasOtavaloList";
import { VentasOtavaloForm } from "./pages/VentasOtavaloForm";
import { PagosOtavaloForm } from "./pages/PagosOtavaloForm";
import { GenerarPagoOtavaloForm } from "./pages/GenerarPagoOtavaloForm";
import { VentasPimampiroList } from "./components/VentasPimampiroList";
import { VentasPimampiroForm } from "./pages/VentasPimampiroForm";
import { GenerarPagoPimampiroForm } from "./pages/GenerarPagoPimampiro";
import { PagosPimampiroForm } from "./pages/PagosPimampiroForm";
import { ClienteAngelProducto } from "./components/ClienteAngelProducto";
import { ClienteAtuntaquiProducto } from "./components/ClienteAtuntaquiProducto";
import { ClienteBolivarProducto } from "./components/ClienteBolivarProducto";
import { ClienteCayambeProducto } from "./components/ClienteCayambeProducto";
import { ClienteIbarraProducto } from "./components/ClienteIbarraProducto";
import { ClienteLagoagrioProducto } from "./components/ClienteLagoagrioProducto";
import { ClienteMiraProducto } from "./components/ClienteMiraProducto";
import { ClienteOtavaloProducto } from "./components/ClienteOtavaloProducto";
import { ClientePimampiroProducto } from "./components/ClientePimampiroProducto";
function App() {
  return (
    <BrowserRouter>
      <Navegacion/>
      <Routes>
        {/* inicio */}
        <Route path="/" element={<Navigate to='/inicio'/>}/>
        <Route path="/inicio" element={<Home/>}/>
        <Route path="/pagos" element={<Pagos/>}/>
        <Route path="/clienteAngelProducto" element={<ClienteAngelProducto/>}/>
        <Route path="/clienteAtuntaquiProducto" element={<ClienteAtuntaquiProducto/>}/>
        <Route path="/clienteBolivarProducto" element={<ClienteBolivarProducto/>}/>
        <Route path="/clienteCayambeProducto" element={<ClienteCayambeProducto/>}/>
        <Route path="/clienteIbarraProducto" element={<ClienteIbarraProducto/>}/>
        <Route path="/clienteLagoagrioProducto" element={<ClienteLagoagrioProducto/>}/>
        <Route path="/clienteMiraProducto" element={<ClienteMiraProducto/>}/>
        <Route path="/clienteOtavaloProducto" element={<ClienteOtavaloProducto/>}/>
        <Route path="/clientePimampiroProducto" element={<ClientePimampiroProducto/>}/>
        

        <Route path="/facturas" element={<Facturas/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
        <Route path="/devoluciones" element={<DevolucionesList/>}/>
        <Route path="/stockHistorial" element={<StockHistorial/>}/>
        <Route path="/devolucionesHistorial" element={<DevolucionesHistorial/>}/>
        <Route path="/clientesAngel" element={<ClientesAngelList/>}/>
        <Route path="/clientesAtuntaqui" element={<ClientesAtuntaquiList/>}/>
        <Route path="/clientesBolivar" element={<ClientesBolivarList/>}/>
        <Route path="/clientesCayambe" element={<ClientesCayambeList/>}/>
        <Route path="/clientesIbarra" element={<ClientesIbarraList/>}/>
        <Route path="/clientesLagoagrio" element={<ClientesLagoagrioList/>}/>
        <Route path="/clientesMira" element={<ClientesMiraList/>}/>
        <Route path="/clientesOtavalo" element={<ClientesOtavaloList/>}/>
        <Route path="/clientesPimampiro" element={<ClientesPimampiroList/>}/>
        <Route path="/productosAngel" element={<ProductoClienteAngelList/>}/>
        <Route path="/ventasHistorial" element={<VentasHistorial/>}/>
        <Route path="/ventasAtuntaqui" element={<VentasAtuntaquiList/>}/>
        <Route path="/ventasBolivar" element={<VentasBolivarList/>}/>
        <Route path="/ventasCayambe" element={<VentasCayambeList/>}/>
        <Route path="/ventasIbarra" element={<VentasIbarraList/>}/>
        <Route path="/ventasLagoagrio" element={<VentasLagoagrioList/>}/>
        <Route path="/ventasMira" element={<VentasMiraList/>}/>
        <Route path="/ventasOtavalo" element={<VentasOtavaloList/>}/>
        <Route path="/ventasPimampiro" element={<VentasPimampiroList/>}/>

        {/* crear fomulario */}
        <Route path="/crear-devolucion" element={<DevolucionForm/>}/>
        <Route path="/crear-inventario" element={<InventarioForm/>}/>
        <Route path="/crear-factura" element={<FacturasForm/>}/>
        <Route path="/crear-clienteAngel" element={<ClientesAngelForm/>}/>
        <Route path="/crear-clienteAtuntaqui" element={<ClientesAtuntaquiForm/>}/>
        <Route path="/crear-clienteBolivar" element={<ClientesBolivarForm/>}/>
        <Route path="/crear-clienteCayambe" element={<ClientesCayambeForm/>}/>
        <Route path="/crear-clienteIbarra" element={<ClientesIbarraForm/>}/>
        <Route path="/crear-clienteLagoagrio" element={<ClientesLagoagrioForm/>}/>
        <Route path="/crear-clienteMira" element={<ClientesMiraForm/>}/>
        <Route path="/crear-clienteOtavalo" element={<ClientesOtavaloForm/>}/>
        <Route path="/crear-clientePimampiro" element={<ClientesPimampiroForm/>}/>
        <Route path="/crear-productosAngel" element={<ProductoClienteAngelForm/>}/>
        <Route path="/crear-ventasAtuntaqui" element={<VentasAtuntaquiForm/>}/>
        <Route path="/crear-ventasBolivar" element={<VentasBolivarForm/>}/>
        <Route path="/crear-ventasCayambe" element={<VentasCayambeForm/>}/>
        <Route path="/crear-ventasIbarra" element={<VentasIbarraForm/>}/>
        <Route path="/crear-ventasLagoagrio" element={<VentasLagoagrioForm/>}/>
        <Route path="/crear-ventasMira" element={<VentasMiraForm/>}/>
        <Route path="/crear-ventasOtavalo" element={<VentasOtavaloForm/>}/>
        <Route path="/crear-ventasPimampiro" element={<VentasPimampiroForm/>}/>
        <Route path="/crear-pago" element={<PagosForm/>}/>
        <Route path="/crear-pagoAtuntaqui" element={<PagosAtuntaquiForm/>}/>
        <Route path="/crear-pagoBolivar" element={<PagosBolivarForm/>}/>
        <Route path="/crear-pagoCayambe" element={<PagosCayambeForm/>}/>
        <Route path="/crear-pagoIbarra" element={<PagosIbarraForm/>}/>
        <Route path="/crear-pagoLagoagrio" element={<PagosLagoagrioForm/>}/>
        <Route path="/crear-pagoMira" element={<PagosMiraForm/>}/>
        <Route path="/crear-pagoOtavalo" element={<PagosOtavaloForm/>}/>
        <Route path="/crear-pagoPimampiro" element={<PagosPimampiroForm/>}/>

        {/* actualizar */}
        <Route path="/facturas/:id" element={<FacturasForm/>}/>
        <Route path="/inventario/:id" element={<InventarioForm/>}/>
        <Route path="/devoluciones/:id" element={<DevolucionForm/>}/>
        <Route path="/productosAngel/:id" element={<ProductoClienteAngelForm/>}/>
        <Route path="/clientesAngel/:id" element={<ClientesAngelForm/>}/>
        <Route path="/clientesAtuntaqui/:id" element={<ClientesAtuntaquiForm/>}/>
        <Route path="/clientesBolivar/:id" element={<ClientesBolivarForm/>}/>
        <Route path="/clientesCayambe/:id" element={<ClientesCayambeForm/>}/>
        <Route path="/clientesIbarra/:id" element={<ClientesIbarraForm/>}/>
        <Route path="/clientesLagoagrio/:id" element={<ClientesLagoagrioForm/>}/>
        <Route path="/clientesMira/:id" element={<ClientesMiraForm/>}/>
        <Route path="/clientesOtavalo/:id" element={<ClientesOtavaloForm/>}/>
        <Route path="/clientesPimampiro/:id" element={<ClientesPimampiroForm/>}/>
        <Route path="/ventasAtuntaqui/:id" element={<VentasAtuntaquiForm/>}/>
        <Route path="/ventasBolivar/:id" element={<VentasBolivarForm/>}/>
        <Route path="/ventasCayambe/:id" element={<VentasCayambeForm/>}/>
        <Route path="/ventasIbarra/:id" element={<VentasIbarraForm/>}/>
        <Route path="/ventasLagoagrio/:id" element={<VentasLagoagrioForm/>}/>
        <Route path="/ventasMira/:id" element={<VentasMiraForm/>}/>
        <Route path="/ventasOtavalo/:id" element={<VentasOtavaloForm/>}/>
        <Route path="/ventasPimampiro/:id" element={<VentasPimampiroForm/>}/>

        {/* pago id */}
        <Route path="/pagos/:id" element={<PagosForm/>}/>
        <Route path="/pagosAtuntaqui/:id" element={<PagosAtuntaquiForm/>}/>
        <Route path="/pagosBolivar/:id" element={<PagosBolivarForm/>}/>
        <Route path="/pagosCayambe/:id" element={<PagosCayambeForm/>}/>
        <Route path="/pagosIbarra/:id" element={<PagosIbarraForm/>}/>
        <Route path="/pagosLagoagrio/:id" element={<PagosLagoagrioForm/>}/>
        <Route path="/pagosMira/:id" element={<PagosMiraForm/>}/>
        <Route path="/pagosOtavalo/:id" element={<PagosOtavaloForm/>}/>
        <Route path="/pagosPimampiro/:id" element={<PagosPimampiroForm/>}/>
        

        {/* pago mensuales */}
      

        {/* generar pago */}
        <Route path="/generarPagoAngel" element={<GenerarPagoAngelForm/>}/>
        <Route path="/generarPagoAtuntaqui" element={<GenerarPagoAtuntaquiForm/>}/>
        <Route path="/generarPagoBolivar" element={<GenerarPagoBolivarForm/>}/>
        <Route path="/generarPagoCayambe" element={<GenerarPagoCayambeForm/>}/>
        <Route path="/generarPagoIbarra" element={<GenerarPagoIbarraForm/>}/>
        <Route path="/generarPagoLagoagrio" element={<GenerarPagoLagoagrioForm/>}/>
        <Route path="/generarPagoMira" element={<GenerarPagoMiraForm/>}/>
        <Route path="/generarPagoOtavalo" element={<GenerarPagoOtavaloForm/>}/>
        <Route path="/generarPagoPimampiro" element={<GenerarPagoPimampiroForm/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
