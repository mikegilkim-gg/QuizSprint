
import { generateQuestion } from '../src/ai.js';

export default async (req, res) => {
  const { topic } = req.query;
  try {
    const question = await generateQuestion(topic || 'General Knowledge');
    res.status(200).json({ question });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate question' });
  }
};
