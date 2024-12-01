import React, { createContext, useContext, useState, useEffect } from 'react';
import { skills as initialSkills } from '../../data/skillsData';

const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [skills, setSkills] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSkills = localStorage.getItem('skills');
      return savedSkills ? JSON.parse(savedSkills) : initialSkills;
    }
    return initialSkills;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('skills', JSON.stringify(skills));
    }
  }, [skills]);

  const addSkill = (newSkill) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [newSkill.type]: [...(prevSkills[newSkill.type] || []), newSkill]
    }));
  };

  return (
    <SkillsContext.Provider value={{ skills, addSkill }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};