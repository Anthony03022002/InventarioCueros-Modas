import { getAllInventario } from "../api/inventario.api";
import { getAllStockHistoria } from "../api/stockhistorial.api";

async function verificarProductos() {
  // Obtener datos de inventario y stockHistorial
  const inventarioRes = await getAllInventario();
  const stockHistorialRes = await getAllStockHistoria();
  
  const inventario = inventarioRes.data;
  const stockHistorial = stockHistorialRes.data;

  // 1. Verificar productos repetidos en inventario (por código)
  const productosRepetidosInventario = inventario.reduce((acc, producto) => {
    const codigo = producto.codigo;
    acc[codigo] = (acc[codigo] || 0) + 1;
    return acc;
  }, {});

  const repetidosInventario = Object.keys(productosRepetidosInventario).filter(codigo => productosRepetidosInventario[codigo] > 1);

  // 2. Verificar productos repetidos en stockHistorial (por código)
  const productosRepetidosStock = stockHistorial.reduce((acc, stock) => {
    const codigo = stock.codigo;
    acc[codigo] = (acc[codigo] || 0) + 1;
    return acc;
  }, {});

  const repetidosStockHistorial = Object.keys(productosRepetidosStock).filter(codigo => productosRepetidosStock[codigo] > 1);

  // 3. Verificar productos que no tienen registro en stockHistorial
  const codigosInventario = new Set(inventario.map(producto => producto.codigo));
  const codigosStockHistorial = new Set(stockHistorial.map(stock => stock.codigo));

  const productosSinRegistroStock = inventario.filter(producto => !codigosStockHistorial.has(producto.codigo));

  // 4. Verificar productos que están en stockHistorial pero no en inventario
  const productosSoloEnStockHistorial = stockHistorial.filter(stock => !codigosInventario.has(stock.codigo));

  // Resultados
  return {
    repetidosInventario,  // Productos que se repiten en el inventario
    repetidosStockHistorial,  // Productos que se repiten en stockHistorial
    productosSinRegistroStock,  // Productos en inventario que no están en stockHistorial
    productosSoloEnStockHistorial  // Productos en stockHistorial que no están en inventario
  };
}

// Ejecutar el script
verificarProductos().then(resultados => {
  console.log("Productos repetidos en inventario:", resultados.repetidosInventario);
  console.log("Productos repetidos en stockHistorial:", resultados.repetidosStockHistorial);
  console.log("Productos sin registro en stockHistorial:", resultados.productosSinRegistroStock);
  console.log("Productos solo en stockHistorial:", resultados.productosSoloEnStockHistorial);
}).catch(error => {
  console.error("Error al verificar productos:", error);
});
