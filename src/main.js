
import { createRoom, sendAnswer, onNewQuestion, onGameEnd, updatePlayers } from './socket.js';

const createBtn = document.getElementById('create-room');
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const playersEl = document.getElementById('players');

createBtn.addEventListener('click', async () => {
  const topic = document.getElementById('topic').value;
  const numQuestions = document.getElementById('numQuestions').value || 5;
  const timer = document.getElementById('timerPerQuestion').value || 5;
  
  const roomId = await createRoom(topic, numQuestions, timer);
  window.history.pushState({}, "", `/room/${roomId}`);
  
  homeScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

answerEl.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const answer = answerEl.value.trim();
    if (answer) {
      sendAnswer(answer);
      answerEl.value = '';
    }
  }
});

onNewQuestion((question) => {
  questionEl.textContent = question;
});

updatePlayers((players) => {
  playersEl.innerHTML = '';
  players.forEach(player => {
    playersEl.innerHTML += `<div class="p-2">${player.name}: ${player.points} pts</div>`;
  });
});

onGameEnd((winner) => {
  alert(`Game Over! Winner: ${winner.name} 🏆`);
});
