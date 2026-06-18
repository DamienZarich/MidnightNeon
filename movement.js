document.addEventListener("DOMContentLoaded", () => {
const thruster = document.querySelector(".thruster")
const spaceShip = document.querySelector(".Spaceship-Container");
  let positionBottom = 50;
  let positionLeft = 10;
  const keys = {
    w: false,
    a: false,
    s: false,
    d: false
  };
  let currentduration = 3.0
  const coconut = document.querySelector('.coconut');
  function ThrowCoconut() {
    const randomY = Math.floor(Math.random() * (window.innerHeight - 150));
    coconut.style.top = randomY + 'px';
    coconut.style.setProperty('--duration', currentduration + 's')
    coconut.classList.remove('coconut-animation')
    void coconut.offsetWidth;
    coconut.classList.add('coconut-animation');
    if (currentduration < 0.5) (
      currentduration -= 0.1
    )
  }
  setInterval(ThrowCoconut, 3000)
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
    let deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
        let moved = false
    const distance = speed * deltaTime;
    if (keys.w) {
      positionBottom += distance;
      if (positionBottom > 1000) positionBottom = 1000;
      moved = true
    }
    if (keys.s) {
      positionBottom -= distance;
      if (positionBottom < 100) positionBottom = 100;
      moved = true
    }
    if (keys.d) {
      positionLeft += distance;
       if (positionLeft > 2100) positionLeft = 2100
      moved = true
    }
    if (keys.a) {
      positionLeft -= distance;
      if (positionLeft < 80) positionLeft = 80;
      moved = true
    }

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