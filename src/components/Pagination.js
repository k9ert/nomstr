import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const handleClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = range(1, totalPages);

    return pageNumbers.map((page) => (
      <div key={page}>
        <a
          href="#"
          className={`${
            currentPage === page ? "bg-gray-500 text-white" : "bg-white"
          } border-gray-500 border px-4 py-2 mx-1 rounded-lg hover:bg-gray-200`}
          onClick={() => handleClick(page)}
        >
          {page}
        </a>
      </div>
    ));
  };

  return (
    <div className="flex justify-center my-4">
      <nav className="inline-flex shadow-lg">
        {/* Previous button */}
        <a
          href="#"
          className={`${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          } text-gray-600 hover:text-gray-800 rounded-l-lg py-2 px-4`}
          onClick={() => handleClick(Math.floor(currentPage - 1,0))}
          disabled={currentPage === 1}
        >
          Previous
        </a>

        {/* Pagination buttons */}
        <div className="flex">{renderPageNumbers()}</div>

        {/* Next button */}
        <a
          href="#"
          className={`${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          } text-gray-600 hover:text-gray-800 rounded-r-lg py-2 px-4`}
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </a>
      </nav>
    </div>
  );
};

export default Pagination;