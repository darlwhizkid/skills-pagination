import dbConnect from '../db/connect';
import Skill from '../../../models/Skill';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const skills = await Skill.find({});
        res.status(200).json(skills);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
