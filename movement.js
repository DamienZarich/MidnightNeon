document.addEventListener("DOMContentLoaded", () => {
const spaceShip = document.querySelector(".Spaceship-Container");
let positionBottom = 50;
let positionLeft = 10;
const keys = {
    w: false,
    a: false,
    d: false,
    s: false
}
window.addEventListener('click', () => {
    positionBottom += 20
 spaceShip.style.bottom = positionBottom + 'px'
});
window.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toLowerCase();
if (pressedKey in keys ) {
 keys[pressedKey] = false;
}
});
});