document.addEventListener("DOMContentLoaded", () => {
const thruster = document.querySelector(".thruster")
const spaceShip = document.querySelector(".Spaceship-Container");
  let positionBottom = 50;
  let positionLeft = 10;
  let isGameOver = false
  const keys = {
    w: false,
    a: false,
    s: false,
    d: false
  };
  function gameOver() {
  if (isGameOver) return;
  isGameOver = true;
  const screen = document.getElementById('gameOverScreen')
  screen.classList.remove('hidden')
  spaceShip.style.opacity = "0%"
}
function collision() {
  if (positionLeft < 20 && positionBottom < 60) return;
  const shipRect = spaceShip.getBoundingClientRect();
  coconutsthrown.forEach(c => {
    const cocoRect = c.coconut.getBoundingClientRect();

    if (
      shipRect.left < cocoRect.right &&
      shipRect.right > cocoRect.left &&
      shipRect.top < cocoRect.bottom &&
      shipRect.bottom > cocoRect.top
    ) {
    gameOver();
  }
  });
}
    const coconutsthrown = [];
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      coconutsthrown.forEach(c => {
        c.coconut.remove();
        c.fire.remove();
      });
      coconutsthrown.length = 0;
    }
  });
  let currentduration = 3.0
    function spawnCoconut() {
    if (coconutsthrown.length >= 4) return;
    let randomY;
    let isTooClose = true;
    const minDistance = 400;
    while (isTooClose) {
      randomY = Math.floor(Math.random() * (window.innerHeight-200));
      isTooClose = coconutsthrown.some(c => Math.abs(parseInt(c.coconut.style.top) - randomY) < minDistance);
      if (isTooClose && Math.random() > 0.9) break;
    }
    const coconut = document.createElement('img');
    coconut.src = 'coconut.png.png';
    coconut.className = 'coconut';

    const fire = document.createElement('img');
    fire.src = 'fire.png.png';
    fire.className = 'fire';

  coconut.style.top = randomY + 'px'; 
    fire.style.top = randomY + 'px';
    
    coconut.style.setProperty('--duration', `${currentduration}s`)
    fire.style.setProperty('--duration', `${currentduration}s`)

    document.body.appendChild(coconut);
    document.body.appendChild(fire);

    const coconutSet = {coconut, fire };
    coconutsthrown.push(coconutSet);

    coconut.classList.add('coconut-animation')
    fire.classList.add('fire-follow');

     coconut.addEventListener('animationend', () => {
    coconut.remove();
    fire.remove();
    coconutsthrown.splice(coconutsthrown.indexOf(coconutSet), 1);
    setTimeout(spawnCoconut, 4000)
     });
  }
  for (let i = 0; i <4; i++) {
    setTimeout(spawnCoconut, i * 1000)
  }
  const speed = 450; 
  let lastTime = performance.now();
  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key in keys) {
      keys[key] = true;
    }
  });
  window.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key in keys) {
      keys[key] = false;
    }
  });
  function gameLoop(currentTime) {
    if (isGameOver) return;
    let deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
        let moved = false
    const distance = speed * deltaTime;
    if (keys.w) {
      positionBottom += distance;
      if (positionBottom > 800) positionBottom = 800;
      moved = true
    }
    if (keys.s) {
      positionBottom -= distance;
      if (positionBottom < 20) positionBottom = 20;
      moved = true
    }
    if (keys.d) {
      positionLeft += distance;
       if (positionLeft > 1500) positionLeft = 1500
      moved = true
    }
    if (keys.a) {
      positionLeft -= distance;
      if (positionLeft < 40) positionLeft = 40;
      moved = true
    }
collision();

      spaceShip.style.transform = `translate3d(${positionLeft}px, ${-positionBottom}px, 0px)`
if (keys.d) {
thruster.style.transform = `rotate(180deg) scale(1.8, 0.9)`;
} else if (keys.a) {
  thruster.style.transform = `rotate(180deg) scale(0.8, 0.5) translateX( -40px)`;
} else {
  thruster.style.transform = `rotate(180deg) scale(1, 0.9) translateX(-25px)`;
}
     requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame((time) => {
 lastTime = time
 gameLoop(time)
  });
});
