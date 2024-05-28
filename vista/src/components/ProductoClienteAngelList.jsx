import { getAllproductoClienteAngel } from "../api/productoAngel.api";
import { getAllClientesAngel } from "../api/clientesAngel.api";
import { getAllInventario } from "../api/inventario.api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function ProductoClienteAngelList() {
  const [productosAngel, setProductosAngel] = useState([]);
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);

  const findProductNameById = (productId) => {
    const producto = inventarios.find((p) => p.id === productId);
    return producto ? producto.producto : "Producto no encontrado";
  };

  useEffect(() => {
    async function cargarInventario() {
      const res = await getAllInventario();
      setInventario(res.data);
    }
    cargarInventario();
  }, []);

  useEffect(() => {
    async function cargarClientesAngel() {
      const res = await getAllClientesAngel();
      setClientesAngel(res.data);
    }
    cargarClientesAngel();
  }, []);

  useEffect(() => {
    async function cargarProductosAngel() {
      const res = await getAllproductoClienteAngel();
      setProductosAngel(res.data);
    }
    cargarProductosAngel();
  }, []);
  
  return (
    <div>
      <Link to='/crear-productosAngel'>Crear venta</Link>
      {productosAngel.map((productos) => (
        <div key={productos.id}>
          <h1>
            {
              clientesAngel.find((cliente) => cliente.id === productos.cliente)
                ?.nombre_completo
            }
          </h1>
          <h1>{productos.cantidad}</h1>
          <p>{findProductNameById(productos.producto)}</p>
        </div>
      ))}
    </div>
  );
}
