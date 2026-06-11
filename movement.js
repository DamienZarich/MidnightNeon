const Spaceship = document.querySelector('.Spaceship')
let postionBottom = 50;
let postionLeft = 10;
const keys = {
    w: false,
    a: false,
    d: false,
    s: false
}
window.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toLowerCase();
if (pressedKey in keys ) {
 keys[pressedKey] = false;
}
});
