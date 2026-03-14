// ============================================================
// 3D INTERACTIVE PORTFOLIO - SCRIPT
// Matching the style of 3D-interactive-portfolio
// ============================================================

// ===== Skills Data (DevOps tools mapped to keyboard keys) =====
const SKILLS = {
    docker: { label: "Docker", desc: "Containerization king — build once, run anywhere!", icon: "🐳" },
    kubernetes: { label: "Kubernetes", desc: "Container orchestration at scale — pods, services, and deployments!", icon: "☸️" },
    jenkins: { label: "Jenkins", desc: "The OG CI/CD pipeline builder — automate all the things!", icon: "🔧" },
    gitlab: { label: "GitLab CI", desc: "DevOps lifecycle in one platform — from plan to monitor!", icon: "🦊" },
    aws: { label: "AWS", desc: "The cloud giant — EC2, S3, Lambda and 200+ services!", icon: "☁️" },
    azure: { label: "Azure", desc: "Microsoft's cloud powerhouse — enterprise-grade infrastructure!", icon: "⚡" },
    terraform: { label: "Terraform", desc: "Infrastructure as Code — provision clouds with HCL!", icon: "🏗️" },
    ansible: { label: "Ansible", desc: "Agentless automation — playbooks that configure everything!", icon: "📜" },
    prometheus: { label: "Prometheus", desc: "Metrics and alerting — time-series monitoring done right!", icon: "🔥" },
    grafana: { label: "Grafana", desc: "Beautiful dashboards — visualize all your metrics!", icon: "📊" },
    linux: { label: "Linux", desc: "The backbone of servers — chmod 777 is the ultimate flex!", icon: "🐧" },
    git: { label: "Git", desc: "Version control — because 'final_v2_FINAL' isn't a strategy!", icon: "🌿" },
    nginx: { label: "Nginx", desc: "Reverse proxy and load balancer — serving millions of requests!", icon: "🌐" },
    python: { label: "Python", desc: "Scripting & automation — the DevOps engineer's Swiss army knife!", icon: "🐍" },
    bash: { label: "Bash", desc: "Shell scripting — piping commands like a plumber!", icon: "💻" },
    helm: { label: "Helm", desc: "Kubernetes package manager — charts for every deployment!", icon: "⎈" },
    argocd: { label: "ArgoCD", desc: "GitOps continuous delivery — sync your K8s clusters!", icon: "🔄" },
    vault: { label: "Vault", desc: "Secrets management — keeping credentials safe and rotated!", icon: "🔐" },
    gcp: { label: "GCP", desc: "Google Cloud Platform — BigQuery, GKE, and more!", icon: "🌩️" },
    elasticsearch: { label: "ELK Stack", desc: "Log aggregation and search — find that needle in the haystack!", icon: "🔍" },
    github: { label: "GitHub Actions", desc: "CI/CD workflows right in your repo — automate on push!", icon: "🐙" },
    sonarqube: { label: "SonarQube", desc: "Code quality and security scanning — clean code, happy team!", icon: "🛡️" },
    trivy: { label: "Trivy", desc: "Container vulnerability scanner — secure your images!", icon: "🔒" },
    go: { label: "Go", desc: "Cloud-native language — built for performance and concurrency!", icon: "🚀" },
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

// ===== 3D Interactive Hero Keyboard =====
let activeSection = 'hero';

// Keyboard layout — 5 rows of DevOps tools
const HERO_KB_ROWS = [
    ['docker', 'kubernetes', 'jenkins', 'gitlab', 'aws'],
    ['azure', 'terraform', 'ansible', 'prometheus', 'grafana'],
    ['linux', 'git', 'nginx', 'python', 'bash'],
    ['helm', 'argocd', 'github', 'vault', 'gcp'],
    ['go', 'elasticsearch', 'sonarqube', 'trivy'],
];

const heroKeyboard = document.getElementById('heroKeyboard');
const heroScene = document.getElementById('heroKeyboardScene');
const heroTooltipEl = document.getElementById('heroKeyTooltip');
const heroTooltipTitle = document.getElementById('heroTooltipTitle');
const heroTooltipDesc = document.getElementById('heroTooltipDesc');

// Also wire up the skill display in the skills section
const skillDisplay = document.getElementById('skillDisplay');
const skillHeading = document.getElementById('skillHeading');
const skillDesc = document.getElementById('skillDesc');

function showHeroTooltip(label, desc) {
    heroTooltipTitle.textContent = label;
    heroTooltipDesc.textContent = desc;
    heroTooltipEl.classList.add('visible');
    // Also update skills section display
    if (skillDisplay) {
        skillHeading.textContent = label;
        skillDesc.textContent = desc;
        skillDisplay.classList.add('visible');
    }
}

function hideHeroTooltip() {
    heroTooltipEl.classList.remove('visible');
    if (skillDisplay) skillDisplay.classList.remove('visible');
}

function buildHeroKeyboard() {
    if (!heroKeyboard) return;
    heroKeyboard.innerHTML = '';

    HERO_KB_ROWS.forEach((row, rowIdx) => {
        const rowEl = document.createElement('div');
        rowEl.className = 'hk-row';

        row.forEach((key, keyIdx) => {
            const skill = SKILLS[key];
            if (!skill) return;

            const keyEl = document.createElement('button');
            keyEl.className = 'hk-key';
            keyEl.style.animationDelay = `${(rowIdx * 5 + keyIdx) * 0.04}s`;

            // Key face (top)
            const face = document.createElement('div');
            face.className = 'hk-key-face';
            face.innerHTML = `<span class="hk-key-icon">${skill.icon}</span><span class="hk-key-text">${skill.label}</span>`;
            keyEl.appendChild(face);

            // Key side (bottom depth)
            const side = document.createElement('div');
            side.className = 'hk-key-side';
            keyEl.appendChild(side);

            keyEl.addEventListener('mouseenter', () => showHeroTooltip(skill.label, skill.desc));
            keyEl.addEventListener('mouseleave', () => hideHeroTooltip());
            keyEl.addEventListener('click', () => {
                showHeroTooltip(skill.label, skill.desc);
                keyEl.classList.add('hk-pressed');
                setTimeout(() => keyEl.classList.remove('hk-pressed'), 300);
            });

            rowEl.appendChild(keyEl);
        });

        heroKeyboard.appendChild(rowEl);
    });
}

// Mouse-tracking 3D tilt for the keyboard
let kbTiltX = 0, kbTiltY = 0, kbTargetX = 0, kbTargetY = 0;

function handleKeyboardTilt(e) {
    if (!heroScene) return;
    const rect = heroScene.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    kbTargetX = ((e.clientY - cy) / rect.height) * 12;  // tilt range
    kbTargetY = ((e.clientX - cx) / rect.width) * -12;
}

function animateKeyboardTilt() {
    kbTiltX += (kbTargetX - kbTiltX) * 0.08;
    kbTiltY += (kbTargetY - kbTiltY) * 0.08;
    if (heroKeyboard) {
        heroKeyboard.style.transform = `rotateX(${22 + kbTiltX}deg) rotateY(${kbTiltY}deg)`;
    }
    requestAnimationFrame(animateKeyboardTilt);
}

document.addEventListener('mousemove', handleKeyboardTilt);
animateKeyboardTilt();

// Build & mark loaded
buildHeroKeyboard();
splineLoaded = true;
finishLoading();

// ===== Scroll-based section detection =====
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
    activeSection = newSection;
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
