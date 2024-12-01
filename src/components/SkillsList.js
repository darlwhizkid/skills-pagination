// components/SkillsList.js
import React from 'react';

const SkillsList = ({ skills }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {skills.map(skill => (
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
  );
};

export default SkillsList;
