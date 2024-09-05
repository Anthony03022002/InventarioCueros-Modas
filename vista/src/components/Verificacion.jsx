import { useEffect, useState } from "react";
import { getAllInventario } from "../api/inventario.api";
import { getAllStockHistoria } from "../api/stockhistorial.api";

export function Verificacion() {
  const [repetidosInventario, setRepetidosInventario] = useState([]);
  const [repetidosStockHistorial, setRepetidosStockHistorial] = useState([]);
  const [productosSinRegistroStock, setProductosSinRegistroStock] = useState([]);
  const [productosSoloEnStockHistorial, setProductosSoloEnStockHistorial] = useState([]);

  useEffect(() => {
    async function verificarProductos() {
      const inventarioRes = await getAllInventario();
      const stockHistorialRes = await getAllStockHistoria();

      const inventario = inventarioRes.data;
      const stockHistorial = stockHistorialRes.data;

      const productosRepetidosInventario = inventario.reduce((acc, producto) => {
        const codigo = producto.codigo;
        acc[codigo] = (acc[codigo] || 0) + 1;
        return acc;
      }, {});

      const repetidosInventario = Object.keys(productosRepetidosInventario).filter(codigo => productosRepetidosInventario[codigo] > 1);

      const productosRepetidosStock = stockHistorial.reduce((acc, stock) => {
        const codigo = stock.codigo;
        acc[codigo] = (acc[codigo] || 0) + 1;
        return acc;
      }, {});

      const repetidosStockHistorial = Object.keys(productosRepetidosStock).filter(codigo => productosRepetidosStock[codigo] > 1);

      const codigosInventario = new Set(inventario.map(producto => producto.codigo));
      const codigosStockHistorial = new Set(stockHistorial.map(stock => stock.codigo));

      const productosSinRegistroStock = inventario.filter(producto => !codigosStockHistorial.has(producto.codigo));

      const productosSoloEnStockHistorial = stockHistorial.filter(stock => !codigosInventario.has(stock.codigo));

      setRepetidosInventario(repetidosInventario);
      setRepetidosStockHistorial(repetidosStockHistorial);
      setProductosSinRegistroStock(productosSinRegistroStock);
      setProductosSoloEnStockHistorial(productosSoloEnStockHistorial);
    }

    verificarProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Verificación de Productos</h1>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              Productos repetidos en inventario
            </div>
            <div className="card-body">
              {repetidosInventario.length > 0 ? (
                <ul className="list-group">
                  {repetidosInventario.map((codigo, index) => (
                    <li key={index} className="list-group-item">
                      {codigo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No se encontraron productos repetidos en inventario.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              Productos repetidos en Kardex Entradas
            </div>
            <div className="card-body">
              {repetidosStockHistorial.length > 0 ? (
                <ul className="list-group">
                  {repetidosStockHistorial.map((codigo, index) => (
                    <li key={index} className="list-group-item">
                      {codigo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No se encontraron productos repetidos en Kardex Entradas.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              Productos sin registro en Kardex Entradas
            </div>
            <div className="card-body">
              {productosSinRegistroStock.length > 0 ? (
                <ul className="list-group">
                  {productosSinRegistroStock.map((producto) => (
                    <li key={producto.codigo} className="list-group-item">
                      {producto.codigo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Todos los productos tienen registro en Kardex Entradas.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              Productos solo en Kardex Entradas y no en inventario
            </div>
            <div className="card-body">
              {productosSoloEnStockHistorial.length > 0 ? (
                <ul className="list-group">
                  {productosSoloEnStockHistorial.map((stock) => (
                    <li key={stock.codigo} className="list-group-item">
                      {stock.codigo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No se encontraron productos en el Kardex Entradas que no estén en el inventario.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
