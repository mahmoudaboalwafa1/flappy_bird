let bird = document.getElementById("bird");
const wallBottom = document.querySelector(".wall-bottom");
const wallTop = document.querySelector(".wall-top");
const start_game = document.querySelector(".start-game button");
const game_bird = document.querySelector(".game-bird");
const score_aria = document.querySelector(".score");
const sad_sound = new Audio("./static/sad.mp3");
const jump_sound = new Audio("./static/jump.mp3");
let counter = 0;
let jumps = 0;
let score = 1;
let jumping = false;

// move wall

// move bird
let currentJump = getComputedStyle(bird).getPropertyValue("top");

function moving() {
  if (currentJump >= "290px") {
    down();
  }
}

start_game.onclick = () => {
  start_game.parentElement.remove();
  wallBottom.classList.add("animation");
  wallTop.classList.add("animation");
  moving();
  jump();
  down();

  wallBottom.addEventListener("animationiteration", () => {
    score++;
    wallTop.style.top = `${Math.floor(Math.random() * 500)}px`;
  });
};

function down() {
  let startDown = setInterval(function () {
    if (jumps >= 400) {
      window.location.reload();
      clearInterval(startDown);
      document.body.classList.add("stop");
      sad_sound.play();
      alert("Game Over");

      score = 0;
    }
    jumps += 30;
    bird.style.top = parseInt(currentJump) + jumps + "px";
  }, 80);
}

function jump() {
  document.body.addEventListener("click", () => {
    jump_sound.play();
    jumps -= 100;
    bird.style.top = parseInt(currentJump) + jumps + "px";

    if (
      bird.getBoundingClientRect().x + bird.getBoundingClientRect().width >=
        wallTop.getBoundingClientRect().x &&
      bird.getBoundingClientRect().x <=
        wallTop.getBoundingClientRect().x +
          wallTop.getBoundingClientRect().width &&
      bird.getBoundingClientRect().top + bird.getBoundingClientRect().height >=
        wallTop.getBoundingClientRect().top &&
      bird.getBoundingClientRect().top <=
        wallTop.getBoundingClientRect().top +
          wallTop.getBoundingClientRect().height
    ) {
      score_aria.innerHTML = `${score}`;
    } else if (
      bird.getBoundingClientRect().x + bird.getBoundingClientRect().width >=
        wallBottom.getBoundingClientRect().x &&
      bird.getBoundingClientRect().x <=
        wallBottom.getBoundingClientRect().x +
          wallBottom.getBoundingClientRect().width &&
      bird.getBoundingClientRect().top + bird.getBoundingClientRect().height >=
        wallBottom.getBoundingClientRect().top &&
      bird.getBoundingClientRect().top <=
        wallBottom.getBoundingClientRect().top +
          wallBottom.getBoundingClientRect().height
    ) {
      sad_sound.play();
      alert("Game Over");
    }
  });
}
