// pages/skills.js
import React, { useState, useEffect } from 'react';
import SkillsList from '../components/SkillsList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const SkillsPage = () => {
  const [skills, setSkills] = useState({ digital: [], physical: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const skillsPerPage = 4;

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      
      // Organize skills by category
      const digitalSkills = data.filter(skill => skill.category === 'digital');
      const physicalSkills = data.filter(skill => skill.category === 'physical');
      
      setSkills({ digital: digitalSkills, physical: physicalSkills });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setLoading(false);
    }
  };

  // Get filtered and paginated skills
  const getFilteredSkills = () => {
    let filteredSkills = [];
    
    if (category === 'all') {
      filteredSkills = [...skills.digital, ...skills.physical];
    } else {
      filteredSkills = skills[category] || [];
    }

    if (searchTerm) {
      filteredSkills = filteredSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredSkills;
  };

  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = getFilteredSkills().slice(indexOfFirstSkill, indexOfLastSkill);
  const totalPages = Math.ceil(getFilteredSkills().length / skillsPerPage);

  if (loading) {
    return <div>Loading skills...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Skills Directory</h1>
      <div className="mb-6">
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mr-4 p-2 border rounded"
        >
          <option value="all">All Skills</option>
          <option value="digital">Digital Skills</option>
          <option value="physical">Physical Skills</option>
        </select>
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      
      {currentSkills.length > 0 ? (
        <>
          <SkillsList skills={currentSkills} />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="text-center text-gray-600">No skills found matching your search.</p>
      )}
    </div>
  );
};

export default SkillsPage;
