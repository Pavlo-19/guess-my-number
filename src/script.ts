'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

if (localStorage.getItem('highscore')) {
  highscore = +localStorage.getItem('highscore');
}

document.getElementById('highscore').textContent = '' + highscore;

const displayMessage = function (message: string) {
  document.getElementById('message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(
    (document.getElementById('guess') as HTMLInputElement).value
  );

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.getElementById('number').textContent = '' + secretNumber;

    document.querySelector('body').style.backgroundColor = '#38bd10';
    document.getElementById('number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      localStorage.setItem('highscore', '' + highscore);
      document.getElementById('highscore').textContent = '' + highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.getElementById('score').textContent = '' + score;
    } else {
      displayMessage('💥 You lost the game!');
      document.getElementById('score').textContent = '0';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.getElementById('score').textContent = '' + score;
  document.getElementById('number').textContent = '?';
  (document.getElementById('guess') as HTMLInputElement).value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.getElementById('number').style.width = '15rem';
});
