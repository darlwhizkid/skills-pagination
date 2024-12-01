import dbConnect from './db/connect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    return res.status(200).json({ 
      success: true, 
      message: 'Database connection successful' 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Database connection failed', 
      error: error.message 
    });
  }
}