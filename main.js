const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const countTime = document.querySelector('.count-time');
const countCarrot = document.querySelector('.count-carrot');
const imgContainer = document.querySelector('.imgs-container');
const endCondition = document.querySelector('.end-condition');
const refreshBtn = document.querySelector('.game-refresh');
const gameResult = document.querySelector('.game-result');
const bgAudio = new Audio('./sound/bg.mp3');
const alertAudio = new Audio('./sound/alert.waw');
const bugAudio = new Audio('./sound/bug_pull.mp3');
const carrotAudio = new Audio('./sound/carrot_pull.mp3');
const winAudio = new Audio('./sound/game_win.mp3');

// Audio Setting
bgAudio.loop = true;

let interval;

function gameEndVisible() {
  startBtn.classList.add('unvisible');
  endCondition.classList.remove('unvisible');
  stopBtn.classList.add('clicked');
  bgAudio.pause();
}

const setCountCarrot = () => {};

function timeOverGame(interval) {
  clearInterval(interval);
  gameEndVisible();
  gameResult.innerText = 'YOU LOST';
  alertAudio.play();
  imgContainer.style.pointerEvents = 'none';
}

const setCountTimes = () => {
  let maxTime = 10;
  countTime.innerText = `0:${maxTime}`;
  interval = setInterval(() => {
    countTime.innerText = `0:${maxTime - 1}`;
    maxTime--;
    if (maxTime === 0) {
      timeOverGame(interval);
    }
  }, 1000);
};

// Paint Images

const paintBugs = (count) => {
  while (count > 0) {
    const bugs = document.createElement('img');
    const x = Math.random() * (650 - 2) + 2;
    const y = Math.random() * (200 - 2) + 2;
    bugs.src = './img/bug.png';
    bugs.setAttribute('class', 'bug');
    bugs.style.top = `${y}px`;
    bugs.style.left = `${x}px`;
    imgContainer.appendChild(bugs);
    --count;
  }
};

const paintCarrots = (count) => {
  while (count > 0) {
    const carrot = document.createElement('img');
    const x = Math.random() * (650 - 2) + 2;
    const y = Math.random() * (170 - 2) + 2;
    carrot.src = './img/carrot.png';
    carrot.setAttribute('class', 'carrot');
    carrot.style.top = `${y}px`;
    carrot.style.left = `${x}px`;
    imgContainer.appendChild(carrot);
    --count;
  }
};

function paintImg() {
  countCarrot.innerText = '10';
  paintBugs(7);
  paintCarrots(10);
}

// Button Click event
function onClickStartBtn(e) {
  startBtn.classList.add('unvisible');
  stopBtn.classList.remove('unvisible');
  setCountTimes();
  paintImg();
  bgAudio.play();
}

function onClickStopBtn(e) {
  timeOverGame(interval);
}

function onClickRefreshBtn(e) {
  endCondition.classList.add('unvisible');
  stopBtn.classList.remove('clicked');
  setCountTimes();
  imgContainer.innerHTML = '';
  paintImg();
  bgAudio.play();
  imgContainer.style.pointerEvents = 'auto';
}

startBtn.addEventListener('click', onClickStartBtn);
stopBtn.addEventListener('click', onClickStopBtn);
refreshBtn.addEventListener('click', onClickRefreshBtn);

// Images clicked event
function onClickImg(e) {
  if (e.target.nodeName === 'IMG') {
    let carrotCount = countCarrot.innerText;
    if (e.target.classList.contains('carrot')) {
      e.target.remove();
      --carrotCount;
      countCarrot.innerText = carrotCount;
      carrotAudio.play();
    } else if (e.target.classList.contains('bug')) {
      timeOverGame(interval);
      bugAudio.play();
    }
    if (carrotCount === 0) {
      timeOverGame(interval);
      gameResult.innerText = 'You Won🎉';
      winAudio.play();
    }
  }
}

imgContainer.addEventListener('click', onClickImg);
