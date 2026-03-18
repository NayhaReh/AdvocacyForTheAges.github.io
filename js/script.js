// =====================
// FALLING SHAPES
// =====================
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'shapes-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const COLORS = ['#8494e1', '#c59ccf', '#a78bd4', '#b8a9e8', '#d4b8f0'];
  const SHAPE_TYPES = ['circle', 'triangle', 'square', 'diamond'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createShape() {
    const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    return {
      type,
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(-80, -10),
      size: randomBetween(8, 22),
      speed: randomBetween(0.4, 1.1),
      drift: randomBetween(-0.3, 0.3),
      rotation: randomBetween(0, Math.PI * 2),
      rotSpeed: randomBetween(-0.012, 0.012),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: randomBetween(0.18, 0.55),
    };
  }

  const shapes = Array.from({ length: 38 }, createShape);

  function drawShape(s) {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rotation);

    if (s.type === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (s.type === 'square') {
      const h = s.size / 2;
      ctx.fillRect(-h, -h, s.size, s.size);
    } else if (s.type === 'diamond') {
      const h = s.size / 2;
      ctx.beginPath();
      ctx.moveTo(0, -h * 1.3);
      ctx.lineTo(h, 0);
      ctx.lineTo(0, h * 1.3);
      ctx.lineTo(-h, 0);
      ctx.closePath();
      ctx.fill();
    } else if (s.type === 'triangle') {
      const h = s.size;
      ctx.beginPath();
      ctx.moveTo(0, -h / 2);
      ctx.lineTo(h / 2, h / 2);
      ctx.lineTo(-h / 2, h / 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(s => {
      s.y += s.speed;
      s.x += s.drift;
      s.rotation += s.rotSpeed;
      if (s.y > canvas.height + 40) {
        Object.assign(s, createShape());
        s.y = randomBetween(-80, -10);
      }
      drawShape(s);
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

// =====================
// SHOOTING STARS (hero only)
// =====================
function createStar() {
  const container = document.getElementById('stars-container');
  if (!container) return;
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top  = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth  + 'px';
  star.style.setProperty('--x-dest', (Math.random() * 200 - 100) + 'px');
  star.style.setProperty('--y-dest', (Math.random() * 200 - 100) + 'px');
  container.appendChild(star);
  setTimeout(() => star.remove(), 3000);
}
setInterval(createStar, 20);

// =====================
// NAVBAR HIDE ON SCROLL
// =====================
let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > window.innerHeight) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScrollY = window.scrollY;
});

// =====================
// FADE-IN ON SCROLL
// Only applies to .fade-in elements that are BELOW the fold.
// Elements already visible on load get .visible added immediately.
// =====================
window.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Already visible on page load? Show right away, no flicker.
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
});