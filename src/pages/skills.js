import React from 'react';
import { SkillsProvider } from '../context/SkillsContext';
import SkillsList from '../components/SkillsList';

export default function SkillsPage() {
  return (
    <SkillsProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 px-4">Skills Directory</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 px-4">Digital Skills</h2>
          <SkillsList type="digital" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 px-4">Physical Skills</h2>
          <SkillsList type="physical" />
        </div>
      </div>
    </SkillsProvider>
  );
}
