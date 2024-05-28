import { getAllproductoClienteAngel } from "../api/productoAngel.api";
import { getAllClientesAngel } from "../api/clientesAngel.api";
import { getAllInventario } from "../api/inventario.api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function ProductoClienteAngelList() {
  const [productosAngel, setProductosAngel] = useState([]);
  const [clientesAngel, setClientesAngel] = useState([]);
  const [inventarios, setInventario] = useState([]);
  const navigate = useNavigate()


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
    <div className="container pt-4">
      <h1 className="text-center">Ventas Angel</h1>
      <Link to="/crear-productosAngel">Crear venta</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad del producto</th>
            <th scope="col">Total a pagar</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosAngel.map((productos) => (
            <tr key={productos.id}>
              <th>
                {
                  clientesAngel.find(
                    (cliente) => cliente.id === productos.cliente
                  )?.nombre_completo
                }
              </th>
              <td>{findProductNameById(productos.producto)}</td>
              <td>{productos.cantidad}</td>
              <td>{productos.total_pagar}</td>
              <td>{productos.estado}</td>
              <td>
                <button
                  onClick={()=>{
                    navigate(`/productosAngel/${productos.id}`)
                  }}
                >
                  <i className="bi bi-pen-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
