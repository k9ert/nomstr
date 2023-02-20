import React from "react";
import { useState } from 'react';

const PageNavElement = ({selected, hoverEffect, disabled, onClick, argument, children}) => {
  return(
    <div
      key="prev-ellipsis"
      className={
        `
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }
          ${selected ? "bg-gray-500 text-white" : "bg-white"} 
          border-gray-500 border py-2 px-4 py-1 mx-1 rounded-lg 
          ${ hoverEffect ? "hover:bg-gray-200":""}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

const NoPageElement = () => {
  return (
    <PageNavElement selected={false} hoverEffect={false} onClick={(e) => e.preventDefault()}>
      ...
    </PageNavElement>
  )

}

const PageElement = ({page, currentPage, handleClick}) => {
  return (  
    <PageNavElement selected={currentPage === page } hoverEffect={true} onClick={() => handleClick(page)}>
      {page}
    </PageNavElement>
  )
}


const PageNumbers = ({currentPage, totalPages, handleClick }) => {
  const start = currentPage - 1 < 0 ? 0 : currentPage-1
  const end = currentPage + 1 > totalPages ? totalPages : currentPage +1
  const pageNumbers = [...Array(end - start + 1)].map((_, i) => start + i);

  const renderPages = () => {
    const pages = [];
    /* Previous button */
    pages.push(
      <PageNavElement selected={false} hoverEffect={false} disabled={currentPage === 0} 
        onClick={() => currentPage === 0 || handleClick(Math.floor(currentPage - 1,0))}>
          Previous
      </PageNavElement>
    );
    /* 0 Button and a seperator (if necessary */
    if (currentPage >= 3) {
      pages.push(
        <PageElement page={0} currentPage={currentPage} handleClick={handleClick}/>
      );
      pages.push(
        <NoPageElement/>
      );
    }

    /* Three pagebutton (number or array elements) for individual pages */
    pageNumbers.forEach((page) => {
      pages.push(
        <PageElement page={page} currentPage={currentPage} handleClick={handleClick}/>
      );
    });

    /* seperator and maxPage Button (if necessary */
    if (currentPage+2 < totalPages) {
      pages.push(
        <NoPageElement/>
      );
      pages.push(
        <PageElement page={totalPages} currentPage={currentPage} handleClick={handleClick}/>
      );
    }
    /* Next button */
    pages.push(
      <PageNavElement selected={false} hoverEffect={false} disabled={currentPage === totalPages-1} 
      onClick={(event) => { currentPage === totalPages-1 || handleClick(currentPage + 1) }}>
        Next
      </PageNavElement>
    );

    return pages;
  };

  return <>{renderPages()}</>;
};

const ResultsPerPageDropdown = ({resultsPerPage, handleResultsPerPageChange}) => {
  const options = [5, 10, 20, 50];
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


const Slider = ({ value, min, max, step, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
  };

  const handleMouseUp = () => {
    onChange(sliderValue);
  };

  return (
    <div className="flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        className="slider"
      />
      <span className="ml-3 text-gray-700">{sliderValue}</span>
    </div>
  );
};


const Pagination = ({ currentPage, totalPages, pageSize, slider, sliderValueProps, onPageChange , onSliderChange}) => {
  const [resultsPerPage, setResultsPerPage] = useState(pageSize);
  const [sliderValue, setSliderValue] = useState(sliderValueProps)

  const handleClick = (page) => {
    console.log("new page: " +page )
    onPageChange(page, resultsPerPage);
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    onPageChange(0, Number(event.target.value)); // Reset the current page to 0 when changing the results per page
  };

  const handleSliderChange = (value) => {
    
    setSliderValue(value)
    onSliderChange(value)
  }

  return (
    <div className="flex justify-center my-4">
      <nav className="inline-flex shadow-lg">
        {/* Pagination buttons */}
        <div className="flex">
          <PageNumbers currentPage={currentPage} totalPages={totalPages} handleClick={handleClick}/>
        </div>

        {/* Results per page dropdown */}
        <div className="flex items-center mx-2">
          <label htmlFor="results-per-page" className="mr-2">
            Results per page:
          </label>
          <ResultsPerPageDropdown resultsPerPage={resultsPerPage} handleResultsPerPageChange={handleResultsPerPageChange}/>
        </div>
              
        { slider ? (
          <Slider min={0} max={400} value={sliderValue} onChange={handleSliderChange}></Slider>
        ):<></> }
        
      </nav>
    </div>
  );
};

export default Pagination;