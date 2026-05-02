// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.classList.add('swinging');
  setTimeout(() => themeToggle.classList.remove('swinging'), 800);
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Smooth scroll for nav links and close mobile menu
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');

    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Smooth scroll for any anchor link on the page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// Fade-in on scroll with stagger
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.section-label, .section-title, .about-intro, .about-block, .project-card, .blog-card, .contact-form, .hero-stats'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sent!';
  btn.style.background = '#34d399';
  e.target.reset();
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 3000);
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

