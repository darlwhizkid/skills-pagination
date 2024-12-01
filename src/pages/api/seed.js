import dbConnect from './db/connect';
import Skill from '../../models/Skill';
import { skills } from '../../data/skillsData';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    // Convert skills data to array format
    const skillsArray = [
      ...skills.digital.map(skill => ({ ...skill, category: 'digital' })),
      ...skills.physical.map(skill => ({ ...skill, category: 'physical' }))
    ];

    await Skill.deleteMany({}); // Clear existing data
    await Skill.insertMany(skillsArray);

    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
