import React from "react";
import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const [resultsPerPage, setResultsPerPage] = useState(10);

  //returns an array like (4,8): [4,5,6,7,8]
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  

  const handleClick = (page) => {
    onPageChange(page, resultsPerPage);
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(event.target.value);
    console.log(event.target.value)
    onPageChange(0, Number(event.target.value)); // Reset the current page to 0 when changing the results per page
  };

  const renderPageNumbers = () => {
    const pageNumbers = range(0, totalPages-1);

    return pageNumbers.map((page) => (
      
      <div key={page}>
        <a
          href="#"
          className={`${
            currentPage == page ? "bg-gray-500 text-white" : "bg-white"
          } border-gray-500 border px-4 py-2 mx-1 rounded-lg hover:bg-gray-200`}
          onClick={() => handleClick(page)}
        >
          {page}
        </a>
      </div>
    ));
  };

  const renderResultsPerPageDropdown = () => {
    const options = [5, 10, 20];
    return (
      <select
        className="border-gray-500 border px-4 py-2 mx-1 rounded-lg"
        value={resultsPerPage}
        onChange={handleResultsPerPageChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="flex justify-center my-4">
      <nav className="inline-flex shadow-lg">
        {/* Previous button */}
        <a
          href="#"
          className={`${
            currentPage === 0
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          } text-gray-600 hover:text-gray-800 rounded-l-lg py-2 px-4`}
          onClick={() => currentPage === 0 || handleClick(Math.floor(currentPage - 1,0))}
          disabled={currentPage === 0}
        >
          Previous
        </a>

        {/* Pagination buttons */}
        <div className="flex">{renderPageNumbers()}</div>

        {/* Next button */}
        <a
          href="#"
          className={`${
            currentPage === totalPages-1
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400"
          } text-gray-600 hover:text-gray-800 rounded-r-lg py-2 px-4`}
          onClick={(event) => { currentPage === totalPages-1 || handleClick(currentPage + 1) }}
        >
          Next
        </a>
        {/* Results per page dropdown */}
        <div className="flex items-center mx-2">
          <label htmlFor="results-per-page" className="mr-2">
            Results per page:
          </label>
          {renderResultsPerPageDropdown()}
        </div>
      </nav>
    </div>
  );
};

export default Pagination;