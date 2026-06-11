window.addEventListener('DOMContentLoaded', () => {

const Spaceship = document.querySelector('.Spaceship')
let postionBottom = 50;
window.addEventListener('keydown', (event) => {
if (event.key === 'w' || event.key === 'W') {
 postionBottom += 2;
 Spaceship.style.bottom = postionBottom + "%"
}
});
});
