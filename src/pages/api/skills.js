import { skills } from '../../../data/skillsData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Convert the skills object into an array format that matches the frontend expectations
    const skillsArray = [
      ...skills.digital.map(skill => ({ ...skill, category: 'digital' })),
      ...skills.physical.map(skill => ({ ...skill, category: 'physical' }))
    ];
    
    res.status(200).json(skillsArray);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
