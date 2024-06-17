
export const Pagination = ({ currentPage, totalPages, handlePageClick }) => {
    const getPaginationItems = () => {
      let items = [];
      const maxPagesToShow = 5;
      const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  
      if (startPage > 1) {
        items.push(
          <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageClick(1)}>
              {1}
            </button>
          </li>
        );
        if (startPage > 2) {
          items.push(
            <li key="ellipsis-start" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageClick(i)}>
              {i}
            </button>
          </li>
        );
      }
  
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push(
            <li key="ellipsis-end" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
        items.push(
          <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageClick(totalPages)}>
              {totalPages}
            </button>
          </li>
        );
      }
  
      return items;
    };
  
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
          </li>
          {getPaginationItems()}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  