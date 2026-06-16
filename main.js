/* =========================================================
   USCS E-WALL — main.js  |  Premium Interactions & Animations
   ========================================================= */

// Detect if we are in the 'pages' directory
const IS_SUBPAGE = window.location.pathname.includes('/pages/');
const ASSETS_PATH = IS_SUBPAGE ? '../' : '';

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && cursorRing) {
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
}

function initCursorHover() {
  document.querySelectorAll('a,button,.tc,.s-card,.f-pill,.g-cell,.wall-cell').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-big'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-big'));
  });
}
initCursorHover();

/* ─── PARTICLES CANVAS ─── */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
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
      const p1 = window.TECH_THEME_COLOR || '#00ff88';
      const p2 = window.TECH_THEME_COLOR || '#00d4ff';
      const p3 = window.TECH_THEME_COLOR || '#9b59ff';
      this.color = Math.random() > 0.6 ? p1 : Math.random() > 0.5 ? p2 : p3;
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
          ctx.strokeStyle = window.TECH_THEME_COLOR || '#00ff88';
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
}

/* ─── SCROLL PROGRESS ─── */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });
}

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s');
if (revealEls.length > 0) {
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { 
          e.target.classList.add('in'); 
          revealObs.unobserve(e.target); 
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }
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
  
  let pop = document.querySelector('.wall-popover');
  if (!pop) {
    pop = document.createElement('div');
    pop.className = 'wall-popover';
    pop.innerHTML = '<span class="wp-name"></span><p class="wp-desc"></p><span style="display:block;margin-top:8px;font-size:0.6rem;color:var(--green);font-family:var(--font-mono);letter-spacing:1px;">CLICK TO EXPLORE ◈</span>';
    document.body.appendChild(pop);
  }

  wg.innerHTML = '';
  wallEmojis.forEach((item) => {
    const { i, c, l, d, s } = item;
    const dCell = document.createElement('div');
    dCell.className = `wall-cell ${c}`;
    
    // Fix icon paths if on subpage
    let iconHtml = i;
    if (IS_SUBPAGE) iconHtml = i.replace('src="icon/', 'src="../icon/');
    
    dCell.innerHTML = `<span>${iconHtml}</span><span class="wc-tip">${l}</span>`;
    
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

    dCell.addEventListener('click', (e) => {
      if (s) {
        window.location.href = (IS_SUBPAGE ? '' : 'pages/') + s + '.html';
      } else {
        e.stopPropagation();
        pop.classList.toggle('active');
        positionPopover(e, dCell);
      }
    });

    wg.appendChild(dCell);
  });

  function positionPopover(e, cell) {
    const rect = cell.getBoundingClientRect();
    const popRect = pop.getBoundingClientRect();
    let top = rect.top - popRect.height - 15;
    let left = rect.left + (rect.width / 2) - (popRect.width / 2);
    pop.classList.remove('pop-below');
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

  document.addEventListener('click', () => {
    pop.classList.remove('active');
  });
  
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
    
    // Slug handling
    let pagePath = t.slug;
    if (!pagePath.includes('.html')) pagePath += '.html';
    
    card.href = (IS_SUBPAGE ? '' : 'pages/') + pagePath;
    card.className = 'tc';
    card.style.cssText = `--tc-c:${t.c};--tc-a:${t.a};animation-delay:${i * 0.035}s; text-decoration: none; display: block;`;
    
    // Fix icon paths if on subpage
    let iconHtml = t.icon;
    if (IS_SUBPAGE) iconHtml = t.icon.replace('src="icon/', 'src="../icon/');

    card.innerHTML = `
      <span class="tc-icon">${iconHtml}</span>
      <span class="tc-name">${t.name}</span>
      <span class="tc-type">${t.type}</span>
    `;
    techGridEl.appendChild(card);
  });
  initCursorHover();
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
  const all = typeof director !== 'undefined' && typeof guide !== 'undefined' && typeof students !== 'undefined' ? [director, guide, ...students] : [];
  
  if (countEl) countEl.textContent = all.length;

  if (!sg) return;

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

    // Fix image path if on subpage
    let emojiHtml = s.emoji;
    if (IS_SUBPAGE) emojiHtml = s.emoji.replace('src="img/', 'src="../img/');

    card.innerHTML = `
      ${tag}
      <span class="s-id">${idLabel}</span>
      <div class="s-ava">${emojiHtml}</div>
      <span class="s-name">${s.name}</span>
      <span class="s-role">${isStudent ? s.skill : s.role}</span>
      <span class="s-skill">${isStudent ? s.role : s.skill}</span>
      <p class="s-desc">${s.desc}</p>
      <span class="s-big">${bigIcon}</span>
    `;
    sg.appendChild(card);
  });
  initCursorHover();
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
      const eased = 1 - Math.pow(1 - progress, 4); 
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
    if (entries[0].isIntersecting) animateStats();
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
    const href = a.getAttribute('href');
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

/* ─── AURA THEME LOGIC ─── */
const auraColors = {
  cyan:   { hex: '#00d4ff', glow: 'rgba(0, 212, 255, 0.3)' },
  green:  { hex: '#00ff88', glow: 'rgba(0, 255, 136, 0.3)' },
  pink:   { hex: '#ff4d9b', glow: 'rgba(255, 77, 155, 0.3)' },
  orange: { hex: '#ff6b2b', glow: 'rgba(255, 107, 43, 0.3)' },
  purple: { hex: '#9b59ff', glow: 'rgba(155, 89, 255, 0.3)' }
};

function initAura() {
  if (IS_SUBPAGE) return; // Subpages use their own tech-specific theme
  const btns = document.querySelectorAll('.aura-btn');
  const trigger = document.querySelector('.aura-trigger');
  const savedAura = localStorage.getItem('uscs-aura') || 'cyan';
  applyAura(savedAura);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-aura');
      applyAura(color);
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('uscs-aura', color);
    });
    if (btn.getAttribute('data-aura') === savedAura) btn.classList.add('active');
  });
}

function applyAura(colorKey) {
  const aura = auraColors[colorKey];
  const root = document.documentElement;
  root.style.setProperty('--aura-color', aura.hex);
  root.style.setProperty('--aura-glow', aura.glow);
  root.style.setProperty('--cyan', aura.hex);
  root.style.setProperty('--green', colorKey === 'green' ? '#00ff88' : aura.hex);
  const trigger = document.querySelector('.aura-trigger');
  if (trigger) {
    trigger.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => trigger.style.transform = '', 500);
  }
}

/* ─── CLI TERMINAL LOGIC ─── */
const termOverlay = document.getElementById('terminal-overlay');
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');
const termOpenBtn = document.getElementById('cli-open');
const termTime = document.getElementById('term-time');

function updateTermTime() {
  if (termTime) termTime.textContent = new Date().toLocaleTimeString();
}

function openTerminal() {
  if (termOverlay) {
    termOverlay.classList.add('active');
    if (termInput) termInput.focus();
    updateTermTime();
  }
}

function closeTerminal() {
  if (termOverlay) termOverlay.classList.remove('active');
}

function addTermLine(text, type = 'res') {
  if (!termOutput) return;
  const line = document.createElement('span');
  line.className = `term-line ${type}`;
  line.innerHTML = text;
  termOutput.appendChild(line);
  termOutput.scrollTop = termOutput.scrollHeight;
}

const commands = {
  help: () => {
    addTermLine('AVAILABLE COMMANDS:', 'res');
    addTermLine(' - help: Show this list', 'res');
    addTermLine(' - clear: Clear the screen', 'res');
    addTermLine(' - who [name]: Information about team members', 'res');
    addTermLine(' - go [page]: Navigate to a section (e.g., go cloud, go webdev)', 'res');
    addTermLine(' - list: List all technologies on the wall', 'res');
    addTermLine(' - aura [color]: Change the site aura (cyan, green, pink, etc.)', 'res');
    addTermLine(' - exit: Close the terminal', 'res');
  },
  clear: () => { if (termOutput) termOutput.innerHTML = ''; },
  exit: () => closeTerminal(),
  list: () => {
    addTermLine('TECH STACK ON THE WALL:', 'res');
    const techNames = techs.map(t => t.name).join(', ');
    addTermLine(techNames, 'res');
  },
  who: (args) => {
    if (!args[0]) {
      addTermLine('THE TEAM:', 'res');
      const team = [director, guide, ...students].map(s => s.name).join(', ');
      addTermLine(team, 'res');
      return;
    }
    const query = args.join(' ').toLowerCase();
    const person = [director, guide, ...students].find(s => s.name.toLowerCase().includes(query));
    if (person) {
      addTermLine(`NAME: ${person.name.toUpperCase()}`, 'res');
      addTermLine(`ROLE: ${person.role}`, 'res');
      addTermLine(`SKILL: ${person.skill}`, 'res');
      addTermLine(`BIO: ${person.desc}`, 'res');
    } else {
      addTermLine(`User "${query}" not found in system records.`, 'error');
    }
  },
  go: (args) => {
    if (!args[0]) {
      addTermLine('Usage: go [section]. Available: about, wall, impact, team, cloud, ai, webdev, apps...', 'error');
      return;
    }
    const target = args[0].toLowerCase();
    const subpages = ['ai', 'apps', 'bigdata', 'cloud', 'cyber', 'dbms', 'dino', 'prog', 'webdev', 'wifi'];
    
    if (['about', 'wall', 'impact', 'team'].includes(target)) {
      const map = { team: 'creators' };
      const hash = map[target] || target;
      window.location.href = (IS_SUBPAGE ? '../index.html#' : '#') + hash;
      addTermLine(`Navigating to section: ${target}...`, 'res');
      setTimeout(closeTerminal, 800);
    } else if (subpages.includes(target)) {
      addTermLine(`Loading secure subpage: ${target}.html...`, 'res');
      setTimeout(() => window.location.href = (IS_SUBPAGE ? '' : 'pages/') + `${target}.html`, 800);
    } else {
      addTermLine(`Section "${target}" not found.`, 'error');
    }
  },
  aura: (args) => {
    const color = args[0]?.toLowerCase();
    if (auraColors[color]) {
      applyAura(color);
      addTermLine(`Aura sequence initiated. Color set to: ${color}`, 'res');
    } else {
      addTermLine(`Aura "${color}" not recognized. Valid: cyan, green, pink, orange, purple`, 'error');
    }
  }
};

if (termInput) {
  termInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const rawInput = termInput.value.trim();
      if (!rawInput) return;
      addTermLine(rawInput, 'cmd');
      termInput.value = '';
      const [cmd, ...args] = rawInput.split(' ');
      if (commands[cmd.toLowerCase()]) commands[cmd.toLowerCase()](args);
      else addTermLine(`Command not found: ${cmd}. Type 'help' for options.`, 'error');
    }
    if (e.key === 'Escape') closeTerminal();
  });
}

if (termOpenBtn) termOpenBtn.addEventListener('click', openTerminal);
window.addEventListener('keydown', e => {
  if (e.key === '`') openTerminal(); 
  if (e.key === 'Escape') closeTerminal();
});

/* ─── IMPACT CALCULATOR LOGIC ─── */
const deviceImpactData = {
  laptop:   { gold: 0.2,   copper: 0.5,   plastic: 1.0, co2: 25, lead: 2.5, mercury: 0.5 },
  desktop:  { gold: 0.5,   copper: 1.5,   plastic: 3.0, co2: 50, lead: 15.0, mercury: 1.2 },
  phone:    { gold: 0.03,  copper: 0.015, plastic: 0.1, co2: 5,  lead: 0.8, mercury: 0.0 },
  monitor:  { gold: 0.1,   copper: 0.4,   plastic: 2.0, co2: 20, lead: 20.0, mercury: 4.5 },
  keyboard: { gold: 0.005, copper: 0.05,  plastic: 0.8, co2: 2,  lead: 0.1, mercury: 0.0 }
};

function initImpactCalc() {
  const deviceSelect = document.getElementById('calc-device');
  const qtyInput = document.getElementById('calc-qty');
  if (!deviceSelect || !qtyInput) return;
  const updateResults = () => {
    const device = deviceSelect.value;
    const qty = parseInt(qtyInput.value) || 0;
    const data = deviceImpactData[device];
    if (!data) return;
    animateValue('res-gold', (data.gold * qty).toFixed(2));
    animateValue('res-copper', (data.copper * qty).toFixed(2));
    animateValue('res-plastic', (data.plastic * qty).toFixed(2));
    animateValue('res-co2', Math.round(data.co2 * qty));
    animateValue('res-lead', (data.lead * qty).toFixed(2));
    animateValue('res-mercury', (data.mercury * qty).toFixed(2));
  };
  deviceSelect.addEventListener('change', updateResults);
  qtyInput.addEventListener('input', updateResults);
  updateResults();
}

function updateQty(delta) {
  const input = document.getElementById('calc-qty');
  if (!input) return;
  let val = (parseInt(input.value) || 0) + delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  input.value = val;
  input.dispatchEvent(new Event('input'));
}

function animateValue(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = parseFloat(el.textContent) || 0;
  const end = parseFloat(target);
  const duration = 600;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); 
    const current = start + (end - start) * eased;
    el.textContent = id === 'res-co2' ? Math.round(current) : current.toFixed(2);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ─── WASTE GAME LOGIC ─── */
let gameScore = 0;
let gameTime = 30;
let gameInterval;
let spawnInterval;
let isGameActive = false;

function initWasteGame() {
  const gameOverlay = document.getElementById('game-overlay');
  const openBtn = document.getElementById('game-open');
  const closeBtn = document.getElementById('game-close');
  const startBtn = document.getElementById('game-start-btn');
  const canvas = document.getElementById('game-canvas');
  const bins = document.querySelectorAll('.g-bin');
  if (!gameOverlay || !openBtn) return;
  openBtn.addEventListener('click', () => {
    gameOverlay.classList.add('active');
    resetGame();
  });
  closeBtn.addEventListener('click', () => {
    gameOverlay.classList.remove('active');
    stopGame();
  });
  if (startBtn) startBtn.addEventListener('click', startGame);
  bins.forEach(bin => {
    bin.addEventListener('dragover', e => { e.preventDefault(); bin.classList.add('drag-over'); });
    bin.addEventListener('dragleave', () => bin.classList.remove('drag-over'));
    bin.addEventListener('drop', e => {
      e.preventDefault();
      bin.classList.remove('drag-over');
      const partType = e.dataTransfer.getData('type');
      const binType = bin.getAttribute('data-type');
      const partId = e.dataTransfer.getData('id');
      if (partType === binType) {
        updateScore(10);
        bin.style.transform = 'scale(1.1)';
        setTimeout(() => bin.style.transform = '', 200);
      } else {
        updateScore(-5);
        bin.style.borderColor = 'var(--pink)';
        setTimeout(() => bin.style.borderColor = '', 300);
      }
      const partEl = document.getElementById(partId);
      if (partEl) partEl.remove();
    });
  });
}

function startGame() {
  isGameActive = true;
  const startScreen = document.getElementById('game-start');
  if (startScreen) startScreen.style.display = 'none';
  gameScore = 0;
  gameTime = 30;
  updateScore(0);
  gameInterval = setInterval(() => {
    gameTime--;
    const timerEl = document.getElementById('g-timer');
    if (timerEl) timerEl.textContent = `${gameTime}s`;
    if (gameTime <= 0) endGame();
  }, 1000);
  spawnInterval = setInterval(spawnPart, 1200);
}

function stopGame() {
  isGameActive = false;
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  const canvas = document.getElementById('game-canvas');
  if (canvas) {
    const parts = canvas.querySelectorAll('.falling-part');
    parts.forEach(p => p.remove());
  }
}

function resetGame() {
  stopGame();
  const startScreen = document.getElementById('game-start');
  if (startScreen) startScreen.style.display = 'flex';
  const results = document.querySelector('.g-results');
  if (results) results.remove();
  const timerEl = document.getElementById('g-timer');
  if (timerEl) timerEl.textContent = '30s';
  updateScore(0);
}

function spawnPart() {
  if (!isGameActive) return;
  const canvas = document.getElementById('game-canvas');
  if (!canvas || typeof wasteParts === 'undefined') return;
  const partData = wasteParts[Math.floor(Math.random() * wasteParts.length)];
  const part = document.createElement('div');
  const id = 'p-' + Math.random().toString(36).substr(2, 9);
  part.id = id;
  part.className = 'falling-part';
  part.draggable = true;
  part.innerHTML = `<span class="fp-ico">${partData.icon}</span><span class="fp-name">${partData.name}</span>`;
  const startX = Math.random() * (canvas.offsetWidth - 80) + 10;
  part.style.left = `${startX}px`;
  part.style.top = '-80px';
  part.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', partData.type);
    e.dataTransfer.setData('id', id);
    part.style.opacity = '0.5';
  });
  part.addEventListener('dragend', () => part.style.opacity = '1');
  canvas.appendChild(part);
  let posY = -80;
  const speed = 1.5 + Math.random() * 2;
  function fall() {
    if (!isGameActive || !part.parentElement) return;
    posY += speed;
    part.style.top = `${posY}px`;
    if (posY > canvas.offsetHeight) {
      part.remove();
      updateScore(-2);
    } else requestAnimationFrame(fall);
  }
  requestAnimationFrame(fall);
}

function updateScore(delta) {
  gameScore += delta;
  if (gameScore < 0) gameScore = 0;
  const scoreEl = document.getElementById('g-score');
  if (scoreEl) scoreEl.textContent = gameScore.toString().padStart(3, '0');
}

function endGame() {
  stopGame();
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const results = document.createElement('div');
  results.className = 'g-results';
  const lbData = [
    { n: 'Utkarsh (Pro)', s: 280 },
    { n: 'Deepak (Coord)', s: 245 },
    { n: 'Ayush (Web)', s: 210 },
    { n: 'YOU', s: gameScore, me: true },
    { n: 'Kunal (PCB)', s: 180 }
  ].sort((a, b) => b.s - a.s);
  let lbHTML = lbData.map((r, i) => `
    <div class="lb-row ${r.me ? 'me' : ''}">
      <span>#${i + 1} ${r.n}</span>
      <span>${r.s} PTS</span>
    </div>
  `).join('');
  results.innerHTML = `
    <h2>MISSION COMPLETE</h2>
    <div class="final-score">FINAL SCORE: ${gameScore}</div>
    <div class="g-leaderboard">
      <div style="font-family:var(--font-mono); font-size:0.6rem; color:var(--green); margin-bottom:15px; letter-spacing:2px;">GLOBAL_RANKINGS.LOG</div>
      ${lbHTML}
    </div>
    <button class="btn-primary" onclick="resetGame()">RETRY MISSION</button>
  `;
  canvas.appendChild(results);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderWallPreview();
  renderGrid('all');
  renderStudents();
  initAura();
  updateTermTime();
  initImpactCalc();
  initWasteGame();
  const mmLinks = document.querySelectorAll('#mobile-menu a');
  mmLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu && menu.classList.contains('active')) toggleMenu();
    });
  });
});
