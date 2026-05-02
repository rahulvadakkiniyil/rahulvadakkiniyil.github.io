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

// ===== DevOps Quiz Challenge =====
(function() {
  const quizBody = document.getElementById('quiz-body');
  const quizFooter = document.getElementById('quiz-footer');
  const quizResult = document.getElementById('quiz-result');
  const submitBtn = document.getElementById('quiz-submit');
  const feedback = document.getElementById('quiz-feedback');
  const progressFill = document.getElementById('quiz-progress-fill');
  const currentDisplay = document.getElementById('quiz-current');
  const quizIcon = document.querySelector('.quiz-icon');
  if (!quizBody) return;

  // Question bank — 40 questions, 10 randomly picked each visit
  const questionBank = [
    { q: 'What does CI/CD stand for?', o: ['Continuous Integration / Continuous Delivery', 'Code Inspection / Code Deployment', 'Container Integration / Container Delivery', 'Cloud Infrastructure / Cloud Deployment'], a: 0 },
    { q: 'Which tool is used for container orchestration?', o: ['Terraform', 'Kubernetes', 'Ansible', 'Jenkins'], a: 1 },
    { q: 'What is the default port for HTTPS?', o: ['80', '8080', '443', '22'], a: 2 },
    { q: 'Which command lists running Docker containers?', o: ['docker images', 'docker ps', 'docker run', 'docker build'], a: 1 },
    { q: 'What does IaC stand for?', o: ['Infrastructure as Code', 'Internet as Cloud', 'Integration and Configuration', 'Internal API Controller'], a: 0 },
    { q: 'Which cloud provider offers EC2 instances?', o: ['Google Cloud', 'Azure', 'AWS', 'DigitalOcean'], a: 2 },
    { q: 'What file format does Kubernetes use for manifests?', o: ['JSON only', 'XML', 'YAML', 'TOML'], a: 2 },
    { q: 'Which tool is a pull-based GitOps operator?', o: ['Jenkins', 'ArgoCD', 'CircleCI', 'Travis CI'], a: 1 },
    { q: 'What is the smallest deployable unit in Kubernetes?', o: ['Container', 'Node', 'Pod', 'Service'], a: 2 },
    { q: 'Which protocol does SSH use by default?', o: ['Port 21', 'Port 22', 'Port 80', 'Port 443'], a: 1 },
    { q: 'What does Terraform use to track infrastructure state?', o: ['terraform.log', 'terraform.tfstate', '.terraform.lock', 'main.tf'], a: 1 },
    { q: 'Which monitoring tool uses PromQL?', o: ['Grafana', 'Datadog', 'Prometheus', 'Nagios'], a: 2 },
    { q: 'What is a Helm chart?', o: ['A Docker image format', 'A Kubernetes package manager template', 'A CI/CD pipeline config', 'An AWS service'], a: 1 },
    { q: 'Which command initializes a Terraform project?', o: ['terraform start', 'terraform init', 'terraform begin', 'terraform setup'], a: 1 },
    { q: 'What is the purpose of a load balancer?', o: ['Store data', 'Distribute traffic across servers', 'Monitor logs', 'Build containers'], a: 1 },
    { q: 'Which Linux command shows disk usage?', o: ['ls -la', 'df -h', 'top', 'ps aux'], a: 1 },
    { q: 'What does DNS stand for?', o: ['Data Network Service', 'Domain Name System', 'Digital Node Server', 'Distributed Name Schema'], a: 1 },
    { q: 'Which file defines a Docker image?', o: ['docker-compose.yml', 'Dockerfile', 'Makefile', 'package.json'], a: 1 },
    { q: 'What is a rolling update in Kubernetes?', o: ['Deleting all pods at once', 'Gradually replacing pods with new ones', 'Scaling to zero replicas', 'Restarting the cluster'], a: 1 },
    { q: 'Which AWS service provides serverless functions?', o: ['EC2', 'S3', 'Lambda', 'RDS'], a: 2 },
    { q: 'What is the purpose of a reverse proxy?', o: ['Direct client requests to backend servers', 'Encrypt hard drives', 'Run containers', 'Compile source code'], a: 0 },
    { q: 'Which tool automates server configuration?', o: ['Docker', 'Ansible', 'Git', 'Nginx'], a: 1 },
    { q: 'What does kubectl apply -f do?', o: ['Deletes a resource', 'Applies a config file to the cluster', 'Lists all pods', 'Scales a deployment'], a: 1 },
    { q: 'Which VCS platform offers GitHub Actions?', o: ['GitLab', 'Bitbucket', 'GitHub', 'Azure DevOps'], a: 2 },
    { q: 'What is a Docker volume used for?', o: ['Network routing', 'Persisting data outside containers', 'CPU allocation', 'Image building'], a: 1 },
    { q: 'Which HTTP status code means "Not Found"?', o: ['200', '301', '404', '500'], a: 2 },
    { q: 'What does the "D" in ACID stand for?', o: ['Distributed', 'Durability', 'Deployment', 'Dependency'], a: 1 },
    { q: 'Which Kubernetes object exposes a deployment to the network?', o: ['ConfigMap', 'Service', 'Secret', 'Volume'], a: 1 },
    { q: 'What is blue-green deployment?', o: ['Running two identical environments and switching traffic', 'Deploying only on weekdays', 'Using color-coded Docker images', 'A logging strategy'], a: 0 },
    { q: 'Which command shows real-time Linux system processes?', o: ['ls', 'cat', 'top', 'mkdir'], a: 2 },
    { q: 'What is the default Kubernetes namespace?', o: ['kube-system', 'default', 'production', 'main'], a: 1 },
    { q: 'Which AWS service is a managed Kubernetes platform?', o: ['ECS', 'EKS', 'ECR', 'ELB'], a: 1 },
    { q: 'What is a canary deployment?', o: ['Deploying to a small subset of users first', 'Deploying at midnight', 'Using yellow warning flags', 'Rolling back automatically'], a: 0 },
    { q: 'Which tool visualizes Prometheus metrics?', o: ['Kibana', 'Grafana', 'Splunk', 'PagerDuty'], a: 1 },
    { q: 'What is the purpose of a Kubernetes Ingress?', o: ['Manage secrets', 'Route external HTTP traffic to services', 'Store config data', 'Scale pods automatically'], a: 1 },
    { q: 'Which command shows Git commit history?', o: ['git status', 'git log', 'git diff', 'git branch'], a: 1 },
    { q: 'What does a service mesh like Istio provide?', o: ['Container storage', 'Traffic management between microservices', 'DNS resolution', 'Image building'], a: 1 },
    { q: 'Which Terraform command previews changes?', o: ['terraform apply', 'terraform plan', 'terraform destroy', 'terraform validate'], a: 1 },
    { q: 'What is the purpose of a liveness probe in Kubernetes?', o: ['Check if a pod should receive traffic', 'Check if a container is still running', 'Monitor network latency', 'Track CPU usage'], a: 1 },
    { q: 'Which Linux command changes file permissions?', o: ['chown', 'chmod', 'chgrp', 'mv'], a: 1 },
  ];

  // Shuffle and pick 10
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const questions = shuffle(questionBank).slice(0, 10);
  let currentQ = 0;
  let score = 0;
  let selectedOption = -1;
  let answered = false;

  function renderQuestion() {
    const q = questions[currentQ];
    selectedOption = -1;
    answered = false;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Check Answer';
    feedback.className = 'quiz-feedback';
    feedback.textContent = '';

    const labels = ['A', 'B', 'C', 'D'];
    quizBody.innerHTML = `
      <div class="quiz-question">
        <div class="quiz-question-number">Question ${currentQ + 1} of 10</div>
        <div class="quiz-question-text">${q.q}</div>
        <div class="quiz-options">
          ${q.o.map((opt, i) => `
            <div class="quiz-option" data-index="${i}">
              <span class="quiz-option-marker">${labels[i]}</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind option clicks
    quizBody.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (answered) return;
        quizBody.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedOption = parseInt(opt.dataset.index);
        submitBtn.disabled = false;
      });
    });
  }

  function checkAnswer() {
    if (answered) {
      // Move to next question
      currentQ++;
      if (currentQ < 10) {
        renderQuestion();
      } else {
        showResult();
      }
      return;
    }

    answered = true;
    const q = questions[currentQ];
    const options = quizBody.querySelectorAll('.quiz-option');

    // Disable all options
    options.forEach(o => o.classList.add('disabled'));

    if (selectedOption === q.a) {
      score++;
      options[selectedOption].classList.remove('selected');
      options[selectedOption].classList.add('correct');
      feedback.textContent = 'Correct!';
      feedback.className = 'quiz-feedback visible correct';
    } else {
      options[selectedOption].classList.remove('selected');
      options[selectedOption].classList.add('wrong');
      options[q.a].classList.add('correct');
      feedback.textContent = 'Wrong! The correct answer is highlighted.';
      feedback.className = 'quiz-feedback visible wrong';
      quizBody.querySelector('.quiz-question').classList.add('quiz-shake');
    }

    // Update progress
    currentDisplay.textContent = score;
    progressFill.style.width = (score / 10 * 100) + '%';

    submitBtn.textContent = currentQ < 9 ? 'Next Question' : 'See Results';
    submitBtn.disabled = false;
  }

  function showResult() {
    quizBody.style.display = 'none';
    quizFooter.style.display = 'none';
    progressFill.style.width = (score / 10 * 100) + '%';
    currentDisplay.textContent = score;

    if (score >= 8) {
      progressFill.classList.add('complete');
      quizIcon.classList.add('unlocked');

      quizResult.innerHTML = `
        <span class="quiz-result-icon">&#127881;</span>
        <h3>Impressive!</h3>
        <p>You scored ${score}/10. You clearly know your DevOps stuff!</p>
        <button class="btn btn-primary" id="quiz-retry">Play Again</button>
      `;
      quizResult.style.display = 'block';

      // Confetti burst
      launchConfetti();
    } else {
      quizResult.innerHTML = `
        <span class="quiz-result-icon">${score >= 5 ? '&#128170;' : '&#129300;'}</span>
        <h3>${score >= 5 ? 'Not Bad!' : 'Keep Learning!'}</h3>
        <p>You got ${score} out of 10. The questions change every time — give it another shot!</p>
        <button class="btn btn-primary" id="quiz-retry">Try Again</button>
      `;
      quizResult.style.display = 'block';
    }

    document.getElementById('quiz-retry').addEventListener('click', () => {
      const newQuestions = shuffle(questionBank).slice(0, 10);
      questions.length = 0;
      newQuestions.forEach(q => questions.push(q));
      currentQ = 0;
      score = 0;
      selectedOption = -1;
      answered = false;
      progressFill.style.width = '0%';
      progressFill.classList.remove('complete');
      quizIcon.classList.remove('unlocked');
      currentDisplay.textContent = '0';
      quizResult.style.display = 'none';
      quizBody.style.display = 'block';
      quizFooter.style.display = 'flex';
      renderQuestion();
    });
  }

  // Simple confetti
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#7c5cfc', '#c084fc', '#34d399', '#febc2e', '#60a5fa', '#ff5f57'];
    const particles = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: Math.random() * -18 - 4,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 12,
        life: 1,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.vy += 0.4;
        p.y += p.vy;
        p.rot += p.rotV;
        p.life -= 0.008;
        if (p.life <= 0) return;
        alive = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      frame++;
      if (alive && frame < 200) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    animate();
  }

  submitBtn.addEventListener('click', checkAnswer);

  // Start
  renderQuestion();
})();
