import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import { Navegacion } from "./components/Navegacion";
import { Facturas } from "./pages/Facturas";
import { Inventario } from "./pages/Inventario";
import { Devoluciones } from "./pages/Devoluciones";
import { Kardex } from "./pages/Kardex";
import { ClientesAngelList } from "./components/ClientesAngelList";
import { ClientesAtuntaquiList } from "./components/ClientesAtuntaquiList";
import { ClientesBolivarList } from "./components/ClientesBolivarList";
import { ClientesCayambeList } from "./components/ClientesCayambeList";
import { ClientesIbarraList } from "./components/ClientesIbarraList";
import { ClientesLagoagrioList } from "./components/ClientesLagoagrioList";
import { ClientesMiraList } from "./components/ClientesMiraList";
import { ClientesOtavaloList } from "./components/ClientesOtavaloList";
import { ClientesPimampiroList } from "./components/ClientesPimampiroList";
function App() {
  return (
    <BrowserRouter>
      <Navegacion/>
      <Routes>
        <Route path="/" element={<Navigate to='/inicio'/>}/>
        <Route path="/inicio" element={<Home/>}/>
        <Route path="/facturas" element={<Facturas/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
        <Route path="/devoluciones" element={<Devoluciones/>}/>
        <Route path="/kardex" element={<Kardex/>}/>
        <Route path="/clientesAngel" element={<ClientesAngelList/>}/>
        <Route path="/clientesAtuntaqui" element={<ClientesAtuntaquiList/>}/>
        <Route path="/clientesBolivar" element={<ClientesBolivarList/>}/>
        <Route path="/clientesCayambe" element={<ClientesCayambeList/>}/>
        <Route path="/clientesIbarra" element={<ClientesIbarraList/>}/>
        <Route path="/clientesLagoagrio" element={<ClientesLagoagrioList/>}/>
        <Route path="/clientesMira" element={<ClientesMiraList/>}/>
        <Route path="/clientesOtavalo" element={<ClientesOtavaloList/>}/>
        <Route path="/clientesPimampiro" element={<ClientesPimampiroList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
