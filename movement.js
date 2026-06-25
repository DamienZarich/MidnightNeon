document.addEventListener("DOMContentLoaded", () => {
const thruster = document.querySelector(".thruster")
const spaceShip = document.querySelector(".Spaceship-Container");
const startScreen = document.getElementById("startScreen"); 
const startButton = document.querySelector(".startbtn");
  let positionBottom = 50;
  let positionLeft = 10;
  let isGameOver = false
  let startTime = performance.now()
  const keys = {
    w: false,
    a: false,
    s: false,
    d: false
  };
function startGame() {
    startScreen.classList.add('hidden');
    startTime = performance.now(); 
    requestAnimationFrame((time) => {
      lastTime = time;
      gameLoop(time);
    });
   for (let i = 0; i < 4; i++) {
   setTimeout(spawnCoconut, i * 1000);
  }
  }
  function gameOver() {
  if (isGameOver) return;
  isGameOver = true;
  const screen = document.getElementById('gameOverScreen')
  screen.classList.remove('hidden')
  void screen.offsetWidth;
  spaceShip.style.opacity = "0%"
 coconutsthrown.forEach(c => {
    c.coconut.style.animationPlayState = "paused";
    c.fire.style.animationPlayState = "paused";
  });
}
function collision() {
  if (performance.now() - startTime < 1000) return;

  const shipRect = spaceShip.getBoundingClientRect();
  if (shipRect.width === 0) return;

  const padding = 40;
  const shipHitbox = {
    left: shipRect.left + padding,
    right: shipRect.right - padding,
    top: shipRect.top + padding,
    bottom: shipRect.bottom - padding
  };

  coconutsthrown.forEach(c => {
   const cocoRect = c.coconut.getBoundingClientRect();
     if (cocoRect.width === 0) return;

   const isColliding = (
       shipHitbox.left < cocoRect.right &&
       shipHitbox.right > cocoRect.left &&
       shipHitbox.top < cocoRect.bottom &&
       shipHitbox.bottom > cocoRect.top
  );
     if (isColliding) {
        console.log("Collision detected! Ship:", shipHitbox, "Coconut:", cocoRect);
        gameOver();
     }
 });
}
    const coconutsthrown = [];
  document.addEventListener("visibilitychange", () => {
      const isHidden = document.visibilityState === "hidden";
      const state = isHidden ? "paused" : "running";
      coconutsthrown.forEach(c => {
        c.coconut.style.animationPlayState = state;
        c.fire.style.animationPlayState = state;
      });
      if (!isHidden) {
        lastTime = performance.now();
    }
  });
  let currentduration = 3.5
    function spawnCoconut() {
      if (isGameOver) return; 
    if (coconutsthrown.length >= 4) return;
   const laneHeight = (window.innerHeight - 220) / 4;
    const lanes = [
      Math.floor(40),
      Math.floor(40 + laneHeight),
      Math.floor(40 + laneHeight * 2),
      Math.floor(40 + laneHeight * 3.5)
    ];
    const occupiedLanes = coconutsthrown.map(c => parseInt(c.coconut.style.top));
    const freeLanes = lanes.filter(laneY => 
      !occupiedLanes.some(occupiedY => Math.abs(occupiedY - laneY) < laneHeight)
    );
    if (freeLanes.length === 0) {
      setTimeout(spawnCoconut, 200);
      return;
    }
const baseLaneY = freeLanes[Math.floor(Math.random() * freeLanes.length)];
const maxJitter = 35;
    const jitter = Math.floor(Math.random() * (maxJitter * 2)) - maxJitter;
    const randomY = Math.max(20, Math.min(window.innerHeight - 180, baseLaneY + jitter));
    
    const coconut = document.createElement('img');
    coconut.src = 'coconut.png.png';
    coconut.className = 'coconut';

    const fire = document.createElement('img');
    fire.src = 'fire.png.png';
    fire.className = 'fire';

  coconut.style.top = randomY + 'px'; 
    fire.style.top = randomY + 'px';

    currentduration = Math.max(1, currentduration - 0.05);

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
      const randomDelay = 400 + Math.random() * 400; 
      setTimeout(spawnCoconut, randomDelay);
     });
  }
  for (let i = 0; i <4; i++) {
    setTimeout(spawnCoconut, i * 1000)
  }
  const speed = 650; 
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
    deltaTime = Math.min(deltaTime, 0.1);
    lastTime = currentTime;
        let moved = false
    const distance = speed * deltaTime;
    const shipHeight = 120;
    const shipWidth = 180;
    const margin = 20;
    if (keys.w) {
     positionBottom = Math.min(positionBottom + distance, window.innerHeight - shipHeight - margin);
    }
    if (keys.s) {
     positionBottom = Math.max(positionBottom - distance, margin);
    }
    if (keys.d) {
      positionLeft = Math.min(positionLeft + distance, window.innerWidth - shipWidth - margin);
    }
    if (keys.a) {
      positionLeft = Math.max(positionLeft - distance, margin);
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
startButton.addEventListener("click", startGame);
});
