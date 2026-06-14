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

  const speed = 5; 
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
    if (keys.w) {
      positionBottom += speed;
      if (positionBottom > 350) positionBottom = 350;
    }
    if (keys.s) {
      positionBottom -= speed;
      if (positionBottom < 0) positionBottom = 0;
    }
    if (keys.d) {
      positionLeft += speed;
    }
    if (keys.a) {
      positionLeft -= speed;
      if (positionLeft < 0) positionLeft = 0;
    }
  }
});