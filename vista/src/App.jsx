import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Navegacion } from "./components/Navegacion";
import { VentasPage } from "./pages/VentasPage";

function App() {
  return (
    <BrowserRouter>
      <Navegacion/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/ventas" element={<VentasPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
