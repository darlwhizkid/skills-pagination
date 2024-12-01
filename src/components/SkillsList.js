// components/SkillsList.js
import React, { useState } from 'react';
import AddSkillModal from './AddSkillModal';
import { useSkills } from '../context/SkillsContext';

const SkillsList = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { skills, addSkill } = useSkills();

  const handleAddSkill = (newSkill) => {
    addSkill(newSkill);
  };

  const displaySkills = skills[type] || [];

  return (
    <>
      <div className="flex justify-end mb-6 px-4">
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
        {displaySkills.map(skill => (
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

      <AddSkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSkill}
      />
    </>
  );
};

export default SkillsList;
