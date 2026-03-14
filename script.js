// ============================================================
// 3D INTERACTIVE PORTFOLIO - SCRIPT
// Matching the style of 3D-interactive-portfolio
// ============================================================

import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.3/build/runtime.js';

// ===== Skills Data (matching the Spline keyboard keycap names) =====
const SKILLS = {
    js: { label: "JavaScript", desc: "yeeting code into the DOM since '95, no cap!" },
    ts: { label: "TypeScript", desc: "JavaScript's overachieving cousin who's always flexing" },
    html: { label: "HTML", desc: "the internet's granddad, still bussin' fr fr!" },
    css: { label: "CSS", desc: "styling with the ultimate drip, no cap" },
    react: { label: "React", desc: '"use using" — using use = useUsing("use")' },
    vue: { label: "Vue", desc: "the chill pill for your frontend, it hits different!" },
    nextjs: { label: "Next.js", desc: "the drama queen of front-end frameworks, and we stan!" },
    tailwind: { label: "Tailwind", desc: "utility classes hitting different fr fr" },
    nodejs: { label: "Node.js", desc: "JavaScript said 'sike, I'm backend now', deadass!" },
    express: { label: "Express", desc: "middlewares go dummy hard, no cap!" },
    postgres: { label: "PostgreSQL", desc: "SQL but make it fashion, purr" },
    mongodb: { label: "MongoDB", desc: "flexin' with that NoSQL drip, respectfully!" },
    git: { label: "Git", desc: "the code's personal bodyguard, no cap!" },
    github: { label: "GitHub", desc: "sliding into those pull requests, IYKYK!" },
    prettier: { label: "Prettier", desc: "making your code not a whole mess, thank u next" },
    npm: { label: "NPM", desc: "package manager said 'I gotchu fam', period!" },
    firebase: { label: "Firebase", desc: "your app's ultimate wingman!" },
    wordpress: { label: "WordPress", desc: "the grandpa of CMS, still rocking that cane" },
    linux: { label: "Linux", desc: "where 'chmod 777' is the ultimate flex" },
    docker: { label: "Docker", desc: "The best containerization!" },
    nginx: { label: "NginX", desc: "reverse proxy go zoom zoom, sheesh!" },
    aws: { label: "AWS", desc: "always extra, making everything more complicated, period!" },
    vim: { label: "Vim", desc: "exit? In this economy? Ight, imma head out!" },
    vercel: { label: "Vercel", desc: "The triangle company, helps you deploy and go touch grass!" },
};

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateParticleColor();
    updateSplineTheme(next);
});

// ===== Preloader =====
const preloaderFill = document.getElementById('preloaderFill');
const preloaderText = document.getElementById('preloaderText');
let loadProgress = 0;
let splineLoaded = false;

function animatePreloader() {
    // Slow down if spline hasn't loaded yet
    const target = splineLoaded ? 100 : 85;
    loadProgress += (target - loadProgress) * 0.04;
    preloaderFill.style.width = loadProgress + '%';
    preloaderText.textContent = Math.round(loadProgress) + '%';

    if (loadProgress < 99.5) {
        requestAnimationFrame(animatePreloader);
    }
}
animatePreloader();

function finishLoading() {
    preloaderFill.style.width = '100%';
    preloaderText.textContent = '100%';
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        triggerHeroAnimations();
    }, 400);
}

// Fallback: if spline takes too long, load anyway after 6s
setTimeout(() => {
    if (!splineLoaded) {
        splineLoaded = true;
        finishLoading();
    }
}, 6000);

// ===== Hero Blur-In Animations =====
function triggerHeroAnimations() {
    const blurElements = document.querySelectorAll('.hero-section .blur-in');
    blurElements.forEach(el => {
        const delay = parseFloat(el.dataset.delay || 0) * 1000;
        setTimeout(() => el.classList.add('visible'), delay);
    });
}

// ===== Spline 3D Keyboard =====
let splineApp = null;
let activeSection = 'hero';
const skillDisplay = document.getElementById('skillDisplay');
const skillHeading = document.getElementById('skillHeading');
const skillDesc = document.getElementById('skillDesc');

const KEYBOARD_STATES = {
    hero: {
        scale: { x: 0.25, y: 0.25, z: 0.25 },
        position: { x: 400, y: -200, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
    },
    about: {
        scale: { x: 0.35, y: 0.35, z: 0.35 },
        position: { x: 0, y: -40, z: 0 },
        rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    skills: {
        scale: { x: 0.4, y: 0.4, z: 0.4 },
        position: { x: 0, y: -40, z: 0 },
        rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    projects: {
        scale: { x: 0.3, y: 0.3, z: 0.3 },
        position: { x: 0, y: -40, z: 0 },
        rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    experience: {
        scale: { x: 0.25, y: 0.25, z: 0.25 },
        position: { x: 300, y: -100, z: 0 },
        rotation: { x: 0.2, y: -Math.PI / 6, z: 0 },
    },
    contact: {
        scale: { x: 0.3, y: 0.3, z: 0.3 },
        position: { x: 0, y: -60, z: 0 },
        rotation: { x: -0.3, y: Math.PI / 4, z: 0.1 },
    },
};

// Mobile states (smaller scale)
const KEYBOARD_STATES_MOBILE = {
    hero: {
        scale: { x: 0.15, y: 0.15, z: 0.15 },
        position: { x: 0, y: -200, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
    },
    about: {
        scale: { x: 0.18, y: 0.18, z: 0.18 },
        position: { x: 0, y: -40, z: 0 },
        rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
    skills: {
        scale: { x: 0.2, y: 0.2, z: 0.2 },
        position: { x: 0, y: -40, z: 0 },
        rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
    projects: {
        scale: { x: 0.18, y: 0.18, z: 0.18 },
        position: { x: 0, y: -40, z: 0 },
        rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    experience: {
        scale: { x: 0.15, y: 0.15, z: 0.15 },
        position: { x: 0, y: -100, z: 0 },
        rotation: { x: 0.2, y: -Math.PI / 6, z: 0 },
    },
    contact: {
        scale: { x: 0.18, y: 0.18, z: 0.18 },
        position: { x: 0, y: -60, z: 0 },
        rotation: { x: -0.3, y: Math.PI / 4, z: 0.1 },
    },
};

function isMobile() {
    return window.innerWidth <= 768;
}

function getKeyboardState(section) {
    const states = isMobile() ? KEYBOARD_STATES_MOBILE : KEYBOARD_STATES;
    return states[section] || states.hero;
}

async function initSpline() {
    try {
        const splineCanvas = document.getElementById('spline-canvas');
        splineApp = new Application(splineCanvas);
        await splineApp.load('skills-keyboard.spline');

        splineLoaded = true;
        finishLoading();

        // Set initial keyboard state
        applyKeyboardState('hero', true);

        // Setup keyboard interaction events
        setupSplineEvents();

        // Update theme-specific text visibility
        updateSplineTheme(html.getAttribute('data-theme'));

    } catch (err) {
        console.warn('Spline failed to load:', err);
        // Hide spline container if it fails
        document.getElementById('spline-container').style.display = 'none';
        splineLoaded = true;
        finishLoading();
    }
}

function applyKeyboardState(section, immediate) {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName('keyboard');
    if (!kbd) return;

    const state = getKeyboardState(section);
    const duration = immediate ? 0 : 600;

    if (immediate) {
        kbd.scale.x = state.scale.x;
        kbd.scale.y = state.scale.y;
        kbd.scale.z = state.scale.z;
        kbd.position.x = state.position.x;
        kbd.position.y = state.position.y;
        kbd.position.z = state.position.z;
        kbd.rotation.x = state.rotation.x;
        kbd.rotation.y = state.rotation.y;
        kbd.rotation.z = state.rotation.z;
    } else {
        // Smooth lerp animation
        const startScale = { x: kbd.scale.x, y: kbd.scale.y, z: kbd.scale.z };
        const startPos = { x: kbd.position.x, y: kbd.position.y, z: kbd.position.z };
        const startRot = { x: kbd.rotation.x, y: kbd.rotation.y, z: kbd.rotation.z };
        const startTime = performance.now();

        function lerpStep(now) {
            const t = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic

            kbd.scale.x = startScale.x + (state.scale.x - startScale.x) * ease;
            kbd.scale.y = startScale.y + (state.scale.y - startScale.y) * ease;
            kbd.scale.z = startScale.z + (state.scale.z - startScale.z) * ease;

            kbd.position.x = startPos.x + (state.position.x - startPos.x) * ease;
            kbd.position.y = startPos.y + (state.position.y - startPos.y) * ease;
            kbd.position.z = startPos.z + (state.position.z - startPos.z) * ease;

            kbd.rotation.x = startRot.x + (state.rotation.x - startRot.x) * ease;
            kbd.rotation.y = startRot.y + (state.rotation.y - startRot.y) * ease;
            kbd.rotation.z = startRot.z + (state.rotation.z - startRot.z) * ease;

            if (t < 1) requestAnimationFrame(lerpStep);
        }
        requestAnimationFrame(lerpStep);
    }
}

function setupSplineEvents() {
    if (!splineApp) return;

    // Key press events - show skill info
    splineApp.addEventListener('keyDown', (e) => {
        if (!e.target || !e.target.name) return;
        const skill = SKILLS[e.target.name];
        if (skill) {
            showSkillDisplay(skill.label, skill.desc);
            // Also set Spline variables if they exist
            try {
                splineApp.setVariable('heading', skill.label);
                splineApp.setVariable('desc', skill.desc);
            } catch (_) {}
        }
    });

    splineApp.addEventListener('keyUp', () => {
        hideSkillDisplay();
        try {
            splineApp.setVariable('heading', '');
            splineApp.setVariable('desc', '');
        } catch (_) {}
    });

    // Mouse hover on keycaps
    splineApp.addEventListener('mouseHover', (e) => {
        if (!e.target || !e.target.name) return;
        const skill = SKILLS[e.target.name];
        if (skill) {
            showSkillDisplay(skill.label, skill.desc);
            try {
                splineApp.setVariable('heading', skill.label);
                splineApp.setVariable('desc', skill.desc);
            } catch (_) {}
        }
    });
}

function showSkillDisplay(heading, desc) {
    skillHeading.textContent = heading;
    skillDesc.textContent = desc;
    skillDisplay.classList.add('visible');
}

function hideSkillDisplay() {
    skillDisplay.classList.remove('visible');
}

function updateSplineTheme(theme) {
    if (!splineApp) return;
    try {
        // Toggle text layers based on theme
        const textDesktopDark = splineApp.findObjectByName('text-desktop-dark');
        const textDesktopLight = splineApp.findObjectByName('text-desktop');
        const textMobileDark = splineApp.findObjectByName('text-mobile-dark');
        const textMobileLight = splineApp.findObjectByName('text-mobile');

        const isDark = theme === 'dark';
        const mobile = isMobile();

        if (textDesktopDark) textDesktopDark.visible = isDark && !mobile;
        if (textDesktopLight) textDesktopLight.visible = !isDark && !mobile;
        if (textMobileDark) textMobileDark.visible = isDark && mobile;
        if (textMobileLight) textMobileLight.visible = !isDark && mobile;
    } catch (_) {}
}

// Initialize Spline
initSpline();

// ===== Scroll-based section detection for keyboard animation =====
function updateActiveSection() {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollY = window.scrollY;
    let newSection = 'hero';

    for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - window.innerHeight * 0.4) {
            newSection = id;
        }
    }

    if (newSection !== activeSection) {
        activeSection = newSection;
        applyKeyboardState(activeSection, false);
    }
}

window.addEventListener('scroll', updateActiveSection);

// ===== Particle Canvas Background =====
const particleCanvas = document.getElementById('particle-canvas');
const pCtx = particleCanvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 40;
let mouseParticle = { x: 0, y: 0 };

function getParticleColor() {
    return html.getAttribute('data-theme') === 'dark' ? '255, 255, 255' : '0, 0, 0';
}

let currentParticleColor = getParticleColor();

function updateParticleColor() {
    currentParticleColor = getParticleColor();
}

function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function initParticles() {
    resizeParticleCanvas();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
            targetAlpha: Math.random() * 0.5 + 0.1,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            magnetism: 0.1 + Math.random() * 4,
            translateX: 0,
            translateY: 0,
        });
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach((p, i) => {
        const edges = [
            p.x + p.translateX - p.size,
            particleCanvas.width - p.x - p.translateX - p.size,
            p.y + p.translateY - p.size,
            particleCanvas.height - p.y - p.translateY - p.size,
        ];
        const closestEdge = Math.min(...edges);
        const edgeFactor = Math.min(Math.max(closestEdge / 20, 0), 1);

        if (edgeFactor > 0.5) {
            p.alpha += 0.01;
            if (p.alpha > p.targetAlpha) p.alpha = p.targetAlpha;
        } else {
            p.alpha = p.targetAlpha * edgeFactor;
        }

        p.x += p.dx;
        p.y += p.dy;
        p.translateX += (mouseParticle.x / (50 / p.magnetism) - p.translateX) / 50;
        p.translateY += (mouseParticle.y / (50 / p.magnetism) - p.translateY) / 50;

        if (p.x < -p.size || p.x > particleCanvas.width + p.size ||
            p.y < -p.size || p.y > particleCanvas.height + p.size) {
            particles[i] = {
                ...p,
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                alpha: 0,
            };
            return;
        }

        pCtx.beginPath();
        pCtx.arc(p.x + p.translateX, p.y + p.translateY, p.size, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(${currentParticleColor}, ${p.alpha})`;
        pCtx.fill();
    });
}

initParticles();
animateParticles();

document.addEventListener('mousemove', e => {
    const rect = particleCanvas.getBoundingClientRect();
    mouseParticle.x = e.clientX - rect.left - particleCanvas.width / 2;
    mouseParticle.y = e.clientY - rect.top - particleCanvas.height / 2;
});

window.addEventListener('resize', resizeParticleCanvas);

// ===== Three.js 3D Background =====
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 30;

const sphereGroup = new THREE.Group();
scene.add(sphereGroup);
const sphereGeo = new THREE.IcosahedronGeometry(0.3, 1);

for (let i = 0; i < 50; i++) {
    const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.06 + Math.random() * 0.04, 0.8, 0.6),
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
    });
    const mesh = new THREE.Mesh(sphereGeo, mat);
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 60;
    const z = (Math.random() - 0.5) * 30 - 10;
    mesh.position.set(x, y, z);
    mesh.userData = { baseX: x, baseY: y, phase: Math.random() * Math.PI * 2 };
    const s = 0.5 + Math.random() * 1.5;
    mesh.scale.set(s, s, s);
    sphereGroup.add(mesh);
}

function createRing(radius, tube, color, pos, rot) {
    const geo = new THREE.TorusGeometry(radius, tube, 16, 64);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.06 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    scene.add(mesh);
    return mesh;
}

const ring1 = createRing(8, 0.08, 0xFF7A3B, [-15, 5, -25], [Math.PI / 3, 0, 0]);
const ring2 = createRing(5, 0.06, 0xFF7A3B, [18, 8, -22], [Math.PI / 4, Math.PI / 6, 0]);
const ring3 = createRing(3, 0.05, 0xFF7A3B, [-20, -10, -18], [Math.PI / 5, 0, Math.PI / 3]);

let mX = 0, mY = 0, tMX = 0, tMY = 0;
let scrollOffset = 0;

document.addEventListener('mousemove', e => {
    tMX = (e.clientX / window.innerWidth - 0.5) * 2;
    tMY = (e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener('scroll', () => { scrollOffset = window.scrollY; });

let frame = 0;
function animateThree() {
    requestAnimationFrame(animateThree);
    frame++;
    const time = frame * 0.008;

    mX += (tMX - mX) * 0.03;
    mY += (tMY - mY) * 0.03;

    camera.position.x = mX * 3;
    camera.position.y = -mY * 3 - scrollOffset * 0.006;
    camera.lookAt(0, -scrollOffset * 0.006, 0);

    sphereGroup.children.forEach(mesh => {
        mesh.position.x = mesh.userData.baseX + Math.sin(time + mesh.userData.phase) * 2;
        mesh.position.y = mesh.userData.baseY + Math.cos(time * 0.7 + mesh.userData.phase) * 2;
        mesh.material.opacity = 0.1 + Math.sin(time * 1.5 + mesh.userData.phase) * 0.08;
    });

    ring1.rotation.z += 0.002;
    ring2.rotation.z -= 0.003;
    ring2.rotation.y += 0.001;
    ring3.rotation.x += 0.001;
    ring3.rotation.z += 0.002;

    renderer.render(scene, camera);
}
animateThree();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== Navbar =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinkEls.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
});

navToggle.addEventListener('click', () => navLinksContainer.classList.toggle('open'));

navLinkEls.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        navLinksContainer.classList.remove('open');
    });
});

// ===== Scroll Reveal Animations =====
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
            setTimeout(() => entry.target.classList.add('visible'), delay);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .blur-in:not(.hero-section .blur-in)').forEach(el => {
    revealObserver.observe(el);
});

// ===== Counter Animation =====
let countersStarted = false;
const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseFloat(stat.dataset.target);
                const isDecimal = target % 1 !== 0;
                const start = performance.now();
                function update(now) {
                    const progress = Math.min((now - start) / 2000, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    stat.textContent = isDecimal ? (eased * target).toFixed(1) : Math.floor(eased * target);
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
        }
    });
}, { threshold: 0.3 });

const aboutSection = document.getElementById('about');
if (aboutSection) aboutObserver.observe(aboutSection);

// ===== Project Filters =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('filtered-out');
                card.style.position = '';
                card.style.visibility = '';
            } else {
                card.classList.add('filtered-out');
            }
        });
    });
});

// ===== Contact Form =====
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    btn.style.color = '#fff';
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        e.target.reset();
    }, 3000);
});

// ===== Smooth Scrolling for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.getElementById(a.getAttribute('href').slice(1));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
