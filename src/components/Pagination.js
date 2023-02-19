import React from "react";
import { useState } from 'react';

const NoPageElement = () => {
  return (
    <div
      key="prev-ellipsis"
      className="border-gray-500 border px-4 py-1 mx-1 rounded-lg hover:bg-gray-200 cursor-not-allowed"
      onClick={(e) => e.preventDefault()}
    >
      ...
    </div>
  )

}

const PageElement = ({page, currentPage, handleClick}) => {
  return (  <div
      key={page}
      className={`${
        currentPage === page ? "bg-gray-500 text-white" : "bg-white"
      } border-gray-500 border px-4 py-1 mx-1 rounded-lg hover:bg-gray-200`}
      onClick={() => handleClick(page)}
    >
      {page}
    </div>
  )
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange }) => {
  const [resultsPerPage, setResultsPerPage] = useState(pageSize);

  const handleClick = (page) => {
    console.log(typeof( page ))
    onPageChange(page, resultsPerPage);
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    onPageChange(0, Number(event.target.value)); // Reset the current page to 0 when changing the results per page
  };

  const PageNumbers = ({currentPage}) => {
    console.log({ currentPage: Number(currentPage)})
    const start = currentPage - 1 < 0 ? 0 : currentPage-1
    const end = currentPage + 1 > totalPages ? totalPages : currentPage +1
    console.log({start:start,end:end})
    const pageNumbers = [...Array(end - start + 1)].map((_, i) => start + i);
    console.log(pageNumbers)

    const renderPages = () => {
      const pages = [];

      if (currentPage >= 3) {
        pages.push(
          <PageElement page={0} currentPage={currentPage} handleClick={handleClick}/>
        );
        pages.push(
          <NoPageElement/>
        );
      }

      pageNumbers.forEach((page) => {
        pages.push(
          <PageElement page={page} currentPage={currentPage} handleClick={handleClick}/>
        );
      });

      if (currentPage+2 < totalPages) {
        pages.push(
          <NoPageElement/>
        );
        pages.push(
          <PageElement page={totalPages} currentPage={currentPage} handleClick={handleClick}/>
        );
      }

      return pages;
    };

    return <>{renderPages()}</>;
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
        <div
          className={`${
            currentPage === 0
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          } text-gray-600 hover:text-gray-800 rounded-l-lg py-2 px-4`}
          onClick={() => currentPage === 0 || handleClick(Math.floor(currentPage - 1,0))}
          disabled={currentPage === 0}
        >
          Previous
        </div>

        {/* Pagination buttons */}
        <div className="flex">
          <PageNumbers currentPage={currentPage}/>
        </div>

        {/* Next button */}
        <div
          className={`${
            currentPage === totalPages-1
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400"
          } text-gray-600 hover:text-gray-800 rounded-r-lg py-2 px-4`}
          onClick={(event) => { currentPage === totalPages-1 || handleClick(currentPage + 1) }}
        >
          Next
        </div>
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