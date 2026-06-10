/* =========================================================
   USCS E-WALL — main.js  |  Premium Interactions & Animations
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
if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { 
        e.target.classList.add('in'); 
        revealObs.unobserve(e.target); 
      }
    });
  }, { threshold: 0.1 }); // Slightly lower threshold for better reliability
  revealEls.forEach(el => revealObs.observe(el));
} else {
  // Fallback for older browsers
  revealEls.forEach(el => el.classList.add('in'));
}

/* ─── PARALLAX HERO ORBS ─── */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const orbs = document.querySelectorAll('.hero-orb');
  if (orbs.length > 0) {
    orbs.forEach((o, i) => {
      const speed = [0.3, 0.2, 0.4][i] || 0.3;
      o.style.transform = `translateY(${sy * speed}px)`;
    });
  }
}, { passive: true });

/* ─── WALL PREVIEW RENDERER ─── */
function renderWallPreview() {
  const wg = document.getElementById('wallGrid');
  if (!wg || typeof wallEmojis === 'undefined') return;
  
  // Create popover element if it doesn't exist
  let pop = document.querySelector('.wall-popover');
  if (!pop) {
    pop = document.createElement('div');
    pop.className = 'wall-popover';
    pop.innerHTML = '<span class="wp-name"></span><p class="wp-desc"></p>';
    document.body.appendChild(pop);
  }

  wg.innerHTML = ''; // Clear just in case
  wallEmojis.forEach(({ i, c, l, d }) => {
    const dCell = document.createElement('div');
    dCell.className = `wall-cell ${c}`;
    dCell.innerHTML = `<span>${i}</span><span class="wc-tip">${l}</span>`;
    
    // Hover interactions
    dCell.addEventListener('mouseenter', (e) => {
      pop.querySelector('.wp-name').textContent = l;
      pop.querySelector('.wp-desc').textContent = d || 'A foundational technology in modern computing.';
      pop.classList.add('active');
      positionPopover(e, dCell);
    });

    dCell.addEventListener('mousemove', (e) => {
      positionPopover(e, dCell);
    });

    dCell.addEventListener('mouseleave', () => {
      pop.classList.remove('active');
    });

    // Click interaction
    dCell.addEventListener('click', (e) => {
      e.stopPropagation();
      pop.classList.toggle('active');
      positionPopover(e, dCell);
    });

    wg.appendChild(dCell);
  });

  function positionPopover(e, cell) {
    const rect = cell.getBoundingClientRect();
    const popRect = pop.getBoundingClientRect();
    
    // Position above the cell
    let top = rect.top - popRect.height - 15;
    let left = rect.left + (rect.width / 2) - (popRect.width / 2);

    pop.classList.remove('pop-below');

    // Keep within viewport
    if (top < 10) {
      top = rect.bottom + 15;
      pop.classList.add('pop-below');
    }
    if (left < 10) left = 10;
    if (left + popRect.width > window.innerWidth - 10) {
      left = window.innerWidth - popRect.width - 10;
    }

    pop.style.top = `${top}px`;
    pop.style.left = `${left}px`;
  }

  // Hide popover on global click
  document.addEventListener('click', () => {
    pop.classList.remove('active');
  });
  
  // Random twinkle effect
  setInterval(() => {
    const cells = wg.querySelectorAll('.wall-cell');
    if (cells.length === 0) return;
    const idx = Math.floor(Math.random() * cells.length);
    const cell = cells[idx];
    if (cell) {
      cell.style.background = 'rgba(0,255,136,0.12)';
      cell.style.borderColor = 'rgba(0,255,136,0.4)';
      setTimeout(() => {
        cell.style.background = '';
        cell.style.borderColor = '';
      }, 600);
    }
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
  const all = [director, guide, ...students];
  if (countEl) countEl.textContent = all.length;

  let studentIndex = 1;
  all.forEach((s, i) => {
    const card = document.createElement('div');
    
    let cardClass = 's-card';
    if (s.isDirector) cardClass += ' director';
    else if (s.isGuide) cardClass += ' guide';
    card.className = cardClass;

    card.style.cssText = `--sc-c:${s.c};--sc-a:${s.a}`;
    
    let idLabel = '';
    let bigIcon = '';
    let tag = '';

    if (s.isDirector) {
      idLabel = 'DIRECTOR';
      bigIcon = '✧';
      tag = '<span class="director-tag">DIRECTOR</span>';
    } else if (s.isGuide) {
      idLabel = 'FACULTY-GUIDE';
      bigIcon = '★';
      tag = '<span class="guide-tag">GUIDE</span>';
    } else {
      idLabel = `STU-${String(studentIndex).padStart(3,'0')}`;
      bigIcon = String(studentIndex).padStart(2,'0');
      studentIndex++;
    }

    const isStudent = !s.isDirector && !s.isGuide;

    card.innerHTML = `
      ${tag}
      <span class="s-id">${idLabel}</span>
      <div class="s-ava">${s.emoji}</div>
      <span class="s-name">${s.name}</span>
      <span class="s-role">${isStudent ? s.skill : s.role}</span>
      <span class="s-skill">${isStudent ? s.role : s.skill}</span>
      <p class="s-desc">${s.desc}</p>
      <span class="s-big">${bigIcon}</span>
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

/* ─── MOBILE MENU ─── */
function toggleMenu() {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  }
}

const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderWallPreview();
  renderGrid('all');
  renderStudents();
  
  // Close mobile menu on link click (already handled by inline onclick, but as safety)
  const mmLinks = document.querySelectorAll('#mobile-menu a');
  mmLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu && menu.classList.contains('active')) toggleMenu();
    });
  });
});
