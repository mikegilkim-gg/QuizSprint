
import io from 'socket.io-client';

const socket = io();

export function createRoom(topic, numQuestions, timer) {
  return new Promise((resolve) => {
    socket.emit('create-room', { topic, numQuestions, timer }, (roomId) => {
      resolve(roomId);
    });
  });
}

export function sendAnswer(answer) {
  socket.emit('send-answer', answer);
}

export function onNewQuestion(callback) {
  socket.on('new-question', callback);
}

export function updatePlayers(callback) {
  socket.on('update-players', callback);
}

export function onGameEnd(callback) {
  socket.on('game-end', callback);
}
