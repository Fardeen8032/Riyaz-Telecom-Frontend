const Pagination = ({currentPage,totalPages,onPageChange}) => {

    if (totalPages <= 1) {
        return null;
    }

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-md border border-border px-3 py-2 text-sm text-text transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-9 min-w-9 rounded-md px-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-secondary"
                : "border border-border text-text hover:border-primary hover:text-primary"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-md border border-border px-3 py-2 text-sm text-text transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;