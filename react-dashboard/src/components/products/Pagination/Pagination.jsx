import "./Pagination.css";

function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className="ghost-button"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          className={page === currentPage ? "page-button active" : "page-button"}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="ghost-button"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
