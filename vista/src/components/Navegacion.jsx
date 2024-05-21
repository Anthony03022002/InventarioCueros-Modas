import "../index.css";
import { Link } from "react-router-dom";


export function Navegacion() {
  const iconStyle = {
    fontSize: "2rem", // Aquí defines el tamaño del ícono
  };

  return (
    <div className="nav_bar">
      <button
        className="btn p-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <i className="bi bi-list" style={iconStyle}></i>
      </button>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header menu">
          <h3 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Inventario
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body menu">
          <ul className="navbar-nav">
          <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle navegacion"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bag-plus p-2 iconos"></i>Ventas
              </a>
              <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item " to="/clientesIbarra">
                      Ibarra
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesAngel">
                      El Angel
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesAtuntaqui">
                      Atuntaqui
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesBolivar">
                      Bolivar
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesCayambe">
                      Cayambe
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesLagoagrio">
                      LagoAgrio
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesOtavalo">
                      Otavalo
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesMira">
                      Mira
                    </Link>
                  </li>
                  <li>
                  <Link className="dropdown-item" to="/clientesPimampiro">
                      Pimampiro
                    </Link>
                  </li>
                </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link navegacion" to='/inventario'>
                <i className="bi bi-file-earmark-bar-graph p-2 iconos"></i>
                Inventario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navegacion" to='/kardex'>
                <i className="bi bi-menu-button-wide p-2 iconos"></i>Kardex
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navegacion" to='/facturas'>
                <i className="bi bi-file-text p-2 iconos"></i>Factura
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navegacion" to='/devoluciones'>
                <i className="bi bi-arrow-repeat p-2 iconos"></i> Devoluciones
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}
