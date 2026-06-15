document.addEventListener("DOMContentLoaded", () => {
const spaceShip = document.querySelector(".Spaceship-Container");
  let positionBottom = 50;
  let positionLeft = 10;
  const keys = {
    w: false,
    a: false,
    s: false,
    d: false
  };

  const speed = 6; 
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
  function gameLoop() {
    let moved = false
    if (keys.w) {
      positionBottom += speed;
      if (positionBottom > 1000) positionBottom = 1000;
      moved = true
    }
    if (keys.s) {
      positionBottom -= speed;
      if (positionBottom < 0) positionBottom = 0;
      moved = true
    }
    if (keys.d) {
      positionLeft += speed;
      moved = true
    }
    if (keys.a) {
      positionLeft -= speed;
      if (positionLeft < 0) positionLeft = 0;
      moved = true
    }
    if (moved) {
      spaceShip.style.transform = `translate3d(${positionLeft}px, ${-positionBottom}px, 0px)`
    }
     requestAnimationFrame(gameLoop);
  }
 gameLoop()
});