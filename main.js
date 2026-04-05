/* =========================================================
   TechWall — main.js  |  Premium Interactions & Animations
   ========================================================= */

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function ringFollow() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(ringFollow);
})();

document.querySelectorAll('a,button,.tc,.s-card,.f-pill,.g-cell,.wall-cell').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-big'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-big'));
});

/* ─── PARTICLES CANVAS ─── */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const PARTICLE_COUNT = 70;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? '#00ff88' : Math.random() > 0.5 ? '#00d4ff' : '#9b59ff';
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += 0.02;
    this.currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.currentOpacity;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

// Draw connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 120) * 0.08;
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();

/* ─── SCROLL PROGRESS ─── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ─── PARALLAX HERO ORBS ─── */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const orbs = document.querySelectorAll('.hero-orb');
  orbs.forEach((o, i) => {
    const speed = [0.3, 0.2, 0.4][i] || 0.3;
    o.style.transform = `translateY(${sy * speed}px)`;
  });
}, { passive: true });

/* ─── WALL PREVIEW RENDERER ─── */
function renderWallPreview() {
  const wg = document.getElementById('wallGrid');
  if (!wg) return;
  wallEmojis.forEach(({ e, c, l }) => {
    const d = document.createElement('div');
    d.className = `wall-cell ${c}`;
    d.title = l;
    d.innerHTML = `<span>${e}</span><span class="wc-tip">${l}</span>`;
    wg.appendChild(d);
  });
  // Random twinkle effect
  setInterval(() => {
    const cells = wg.querySelectorAll('.wall-cell');
    const idx = Math.floor(Math.random() * cells.length);
    cells[idx].style.background = 'rgba(0,255,136,0.12)';
    cells[idx].style.borderColor = 'rgba(0,255,136,0.4)';
    setTimeout(() => {
      cells[idx].style.background = '';
      cells[idx].style.borderColor = '';
    }, 600);
  }, 300);
}

/* ─── TECH GRID RENDERER ─── */
const techGridEl = document.getElementById('techGrid');

function renderGrid(filter) {
  if (!techGridEl) return;
  techGridEl.innerHTML = '';
  const items = filter === 'all' ? techs : techs.filter(t => t.type === filter);
  items.forEach((t, i) => {
    const card = document.createElement('a');
    const [page, anchor] = t.slug.split('#');
    card.href = `pages/${page}.html${anchor ? '#' + anchor : ''}`;
    card.className = 'tc';
    card.style.cssText = `--tc-c:${t.c};--tc-a:${t.a};animation-delay:${i * 0.035}s; text-decoration: none; display: block;`;
    card.innerHTML = `
      <span class="tc-icon">${t.icon}</span>
      <span class="tc-name">${t.name}</span>
      <span class="tc-type">${t.type}</span>
    `;
    techGridEl.appendChild(card);
  });
  // Re-attach cursor hover
  document.querySelectorAll('.tc').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-big'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-big'));
  });
}

function filterTech(type, btn) {
  document.querySelectorAll('.fpill').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderGrid(type);
}

/* ─── STUDENT RENDERER ─── */
function renderStudents() {
  const sg = document.getElementById('studentsGrid');
  const countEl = document.getElementById('sCount');
  if (!sg) return;
  const all = [guide, ...students];
  if (countEl) countEl.textContent = all.length;

  all.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = s.isGuide ? 's-card guide' : 's-card';
    card.style.cssText = `--sc-c:${s.c};--sc-a:${s.a}`;
    const id = s.isGuide ? 'FACULTY-GUIDE' : `STU-${String(i).padStart(3,'0')}`;
    card.innerHTML = `
      ${s.isGuide ? '<span class="guide-tag">GUIDE</span>' : ''}
      <span class="s-id">${id}</span>
      <div class="s-ava">${s.emoji}</div>
      <span class="s-name">${s.name}</span>
      <span class="s-role">${s.role}</span>
      <span class="s-skill">${s.skill}</span>
      <span class="s-big">${s.isGuide ? '★' : String(i).padStart(2,'0')}</span>
    `;
    sg.appendChild(card);
    // cursor
    card.addEventListener('mouseenter', () => document.body.classList.add('cursor-big'));
    card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-big'));
  });
}

/* ─── STAT COUNTER ANIMATION ─── */
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const raw = el.textContent;
    const num = parseFloat(raw.replace(/[^0-9.]/g,''));
    const suffix = raw.replace(/[0-9.]/g,'');
    if (!num) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease out quart
      const value = eased * num;
      el.textContent = (Number.isInteger(num) ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    el.closest('.stat-item')?.classList.add('done');
  });
}

const statsSection = document.querySelector('.stats-wrap');
if (statsSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateStats();
    }
  }, { threshold: 0.5 }).observe(statsSection);
}

/* ─── FORM SUBMIT ─── */
function handleSubmit(e) {
  e.preventDefault();
  const ok = document.getElementById('formOk');
  if (ok) ok.style.display = 'block';
  e.target.reset();
  setTimeout(() => { if (ok) ok.style.display = 'none'; }, 6000);
}

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─── MAGNETIC BUTTONS ─── */
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ─── TILT ON IMPACT CARDS ─── */
document.querySelectorAll('.i-card,.s-card,.tc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-7px) rotateX(${-cy * 6}deg) rotateY(${cx * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── GLITCH HERO TITLE ─── */
const heroTitle = document.querySelector('.hero-title .t2');
if (heroTitle) {
  setInterval(() => {
    heroTitle.style.filter = 'blur(1px)';
    setTimeout(() => heroTitle.style.filter = '', 80);
  }, 5000);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderWallPreview();
  renderGrid('all');
  renderStudents();
});
