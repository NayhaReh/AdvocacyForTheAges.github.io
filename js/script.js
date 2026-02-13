// Floating elements animation
const floatingContainer = document.getElementById('floating-elements');
const shapes = ['star', 'star', 'book', 'pen', 'pen']; // more pens for visibility
const numberOfShapes = 25; // increased for dense filling

for (let i = 0; i < numberOfShapes; i++) {
  const shape = document.createElement('div');
  const type = shapes[Math.floor(Math.random() * shapes.length)];
  shape.classList.add('floating-shape', type);

  // Balanced positioning across left, middle, and right thirds
  const section = i % 3; // 0 = left, 1 = middle, 2 = right
  let leftPosition;

  if (section === 0) {
    // Left third: 0-40%
    leftPosition = Math.random() * 40 + '%';
  } else if (section === 1) {
    // Middle third: 30-70%
    leftPosition = (30 + Math.random() * 40) + '%';
  } else {
    // Right third: 60-100%
    leftPosition = (60 + Math.random() * 40) + '%';
  }

  shape.style.left = leftPosition;
  shape.style.top = Math.random() * 100 + '%';

  // Add random horizontal drift for more scattering
  const horizontalDrift = (Math.random() - 0.5) * 200; // -100px to +100px
  shape.style.setProperty('--horizontal-drift', `${horizontalDrift}px`);

  // Random animation duration & delay for natural movement
  const duration = 15 + Math.random() * 10; // 15-25 seconds (slower, smoother)
  const delay = Math.random() * 8; // 0-8 seconds
  shape.style.animationDuration = `${duration}s`;
  shape.style.animationDelay = `${delay}s`;

  floatingContainer.appendChild(shape);
}


let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > window.innerHeight) {
    // scrolling down past hero
    navbar.classList.add('hidden');
  } else {
    // scrolling up
    navbar.classList.remove('hidden');
  }
  lastScrollY = window.scrollY;
});
