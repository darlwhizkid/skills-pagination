// components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);
  
  return (
    <div className="flex justify-center gap-3 my-8">
      {pages.map(page => (
        <button 
          key={page} 
          onClick={() => onPageChange(page)} 
          disabled={currentPage === page}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            currentPage === page 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
