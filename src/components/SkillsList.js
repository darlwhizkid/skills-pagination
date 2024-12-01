// components/SkillsList.js
import React, { useState, useEffect, useCallback } from 'react';
import AddSkillModal from './AddSkillModal';
import { useSkills } from '../context/SkillsContext';

const SkillsList = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('itemsPerPage')) || 4;
    }
    return 4;
  });

  const { skills, addSkill } = useSkills();
  const displaySkills = skills[type] || [];
  const totalPages = Math.ceil(displaySkills.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displaySkills.slice(indexOfFirstItem, indexOfLastItem);

  // Save items per page preference
  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  // Keyboard navigation
  const handleKeyNavigation = useCallback((e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setJumpToPage('');
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 px-4">
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="px-3 py-2 border rounded-lg"
        >
          <option value={4}>4 per page</option>
          <option value={8}>8 per page</option>
          <option value={12}>12 per page</option>
        </select>

        <button 
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Skill
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {currentItems.map(skill => (
          <div 
            key={skill.id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{skill.name}</h3>
            <p className="text-gray-600 mb-4">{skill.description}</p>
            <div className="flex justify-between items-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                View Learners
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>

          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {typeof page === 'number' ? (
                <button
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span className="px-2">...</span>
              )}
            </React.Fragment>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>

        <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            className="w-16 px-2 py-1 border rounded"
            placeholder="Page"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go
          </button>
        </form>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="px-3 py-2 border rounded"
        >
          <option value={4}>4 per page</option>
          <option value={8}>8 per page</option>
          <option value={12}>12 per page</option>
          <option value={16}>16 per page</option>
        </select>
      </div>

      <AddSkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addSkill}
      />
    </>
  );
};

export default SkillsList;
