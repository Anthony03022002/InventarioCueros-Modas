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
import { PagosMensualesAngel } from "./components/PagosMensualesAngel";
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
function App() {
  return (
    <BrowserRouter>
      <Navegacion/>
      <Routes>
        {/* inicio */}
        <Route path="/" element={<Navigate to='/inicio'/>}/>
        <Route path="/inicio" element={<Home/>}/>
        <Route path="/pagos" element={<Pagos/>}/>
        <Route path="/facturas" element={<Facturas/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
        <Route path="/devoluciones" element={<DevolucionesList/>}/>
        <Route path="/stockHistorial" element={<StockHistorial/>}/>
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
        <Route path="/devolucionesHistorial" element={<DevolucionesHistorial/>}/>

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
        <Route path="/crear-pago" element={<PagosForm/>}/>

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

        <Route path="/pagos/:id" element={<PagosForm/>}/>
        


        {/* pago mensuales */}
        <Route path="/productosAngel/:id/pagosMensualesAngel" element={<PagosMensualesAngel/>}/>

        {/* generar pago */}
        <Route path="/productosAngel/:id/generarPagoAngel" element={<GenerarPagoAngelForm/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
