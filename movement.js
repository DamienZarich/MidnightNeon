document.addEventListener("DOMContentLoaded", () => {
  const spaceShip = document.querySelector(".Spaceship-Container");
  let positionBottom = 50;
  let positionLeft = 10;
  
  const keys = {
    w: false,
    a: false,
    d: false,
    s: false
  };

  spaceShip.style.bottom = positionBottom + 'px';
  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'w') {
      positionBottom += 20;
      spaceShip.style.bottom = positionBottom + 'px';
    }
    else if (key === 's') {
      positionBottom -= 20;
      if (positionBottom < 0) {
        positionBottom = 0;
      }
      spaceShip.style.bottom = positionBottom + 'px';
    }
  });
});