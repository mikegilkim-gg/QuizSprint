
import puter from 'puter.js';

export async function generateQuestion(topic) {
  const prompt = `Generate a challenging trivia question about ${topic}. Only return the question text, no explanations.`;
  const response = await puter.chat(prompt);
  return response.message;
}
