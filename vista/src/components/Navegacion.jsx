import '../index.css'

export function Navegacion() {
  const iconStyle = {
    fontSize: "2rem", // Aquí defines el tamaño del ícono
  };

  
  return (
    <div className=''>
      <button
        className="btn  p-3"
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
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Inventario
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link navegacion" href="#">
              <i className="bi bi-bag-plus p-2"></i>Ventas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link navegacion" href="#">
              <i class="bi bi-file-earmark-bar-graph p-2"></i>Inventario
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link navegacion" href="#">
              <i class="bi bi-menu-button-wide p-2"></i>Kardex
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link navegacion" href="#">
              <i class="bi bi-file-text p-2"></i>Factura
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link navegacion" href="#">
              <i class="bi bi-arrow-repeat p-2"></i> Devoluciones
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
