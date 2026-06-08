// ===== CONFIG =====
// In production, set this to your deployed backend URL e.g. https://balaji-portfolio-api.onrender.com
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://balaji-portfolio-api.onrender.com/api';

// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

// ===== STATIC DATA (fallback & skills) =====
const staticProjects = [
  {
    title: "Hostel Management System",
    emoji: "🏨",
    description: "Full-stack desktop application for hostel administration. Java Swing GUI with 7-table MySQL schema, JDBC connectivity, room allocation, fee tracking, and student record management.",
    tags: ["Java", "MySQL", "JDBC", "Swing", "NetBeans"],
    github: "https://github.com/balajiy/hostel-management",
    demo: null
  },
  {
    title: "Agentic RAG System",
    emoji: "🧠",
    description: "Research and presentation on the full taxonomy of RAG systems — naive, advanced, and agentic patterns. Covers LangChain, LlamaIndex, iterative retrieval, and self-reflection agents.",
    tags: ["LangChain", "LlamaIndex", "Python", "RAG", "LLM"],
    github: "https://github.com/balajiy/agentic-rag",
    demo: null
  },
  {
    title: "Personal Portfolio Website",
    emoji: "🌐",
    description: "This website! Full-stack personal portfolio built with HTML/CSS/JS frontend, Node.js/Express REST API backend, and MongoDB for storing project data. Deployed on Netlify + Render.",
    tags: ["HTML", "CSS", "JS", "Node.js", "Express", "MongoDB", "Netlify"],
    github: "https://github.com/balajiy/portfolio",
    demo: "https://balajiy.netlify.app"
  }
];

const langSkillsData = [
  { name: "Python", pct: 90 },
  { name: "Java", pct: 82 },
  { name: "JavaScript", pct: 78 },
  { name: "SQL", pct: 85 },
  { name: "C", pct: 95 }
];
const frameworkData = ["React.js","Node.js","Express.js","Flask","HTML5","CSS3","Tailwind CSS","Git","GitHub"];
const dbData = ["MySQL","MongoDB","PostgreSQL","JDBC","Mongoose","SQL Joins","Normalization","Indexing"];
const csData = ["Data Structures","Algorithms","DBMS","Operating Systems","Computer Networks","Machine Learning","OOP","Software Engineering"];

const certData = [
  { icon:"🎓", name:"NPTEL — Introduction to Machine Learning", issuer:"IIT Madras / NPTEL", year:"2024" },
  { icon:"🔒", name:"NPTEL — Environmental Impact Assessment", issuer:"NPTEL", year:"2024" },
  { icon:"☁️", name:"AWS Academy Cloud Foundations", issuer:"Amazon Web Services", year:"2023" },
  { icon:"🐍", name:"Python for Data Science", issuer:"NPTEL / Coursera", year:"2023" }
];

const extraData = [
  { icon:"🎤", title:"Technical Paper Presentation", desc:"Presented 'Agentic RAG Systems' at Dr. MCET's national-level technical symposium." },
  { icon:"🏆", title:"Hackathon Participant", desc:"Participated in 24-hour college hackathon building a real-time attendance system using face recognition." },
  { icon:"📌", title:"Class Representative", desc:"Served as Class Representative for B.Tech IT 2024–2025 batch, coordinating between students and faculty." },
  { icon:"🤝", title:"Volunteer — Tech Events", desc:"Organised and volunteered at college-level tech fests, managing event logistics and participant registrations." }
];

// ===== RENDER PROJECTS =====
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const res = await fetch(`${API_BASE}/projects`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('API error');
    const projects = await res.json();
    renderProjects(projects, grid);
  } catch {
    renderProjects(staticProjects, grid);
  }
}

function renderProjects(projects, grid) {
  grid.innerHTML = projects.map(p => `
    <div class="project-card reveal">
      <div class="project-header">
        <div class="project-emoji">${p.emoji || '💻'}</div>
        <div class="project-links">
          ${p.github ? `<a class="project-link" href="${p.github}" target="_blank" title="GitHub">GH</a>` : ''}
          ${p.demo ? `<a class="project-link" href="${p.demo}" target="_blank" title="Live Demo">↗</a>` : ''}
        </div>
      </div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.description}</div>
      <div class="project-tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');
  observeReveal();
}

// ===== RENDER SKILLS =====
function renderSkills() {
  const langEl = document.getElementById('langSkills');
  langEl.innerHTML = langSkillsData.map(s => `
    <div class="skill-bar-item reveal">
      <div class="skill-bar-top">
        <span class="skill-bar-name">${s.name}</span>
        <span class="skill-bar-pct">${s.pct}%</span>
      </div>
      <div class="skill-bar-track"><div class="skill-bar-fill" data-pct="${s.pct}"></div></div>
    </div>
  `).join('');

  const renderTags = (id, data) => {
    document.getElementById(id).innerHTML = data.map(t => `<span class="skill-tag">${t}</span>`).join('');
  };
  renderTags('frameworkSkills', frameworkData);
  renderTags('dbSkills', dbData);
  renderTags('csSkills', csData);
}

// ===== RENDER CERTS =====
function renderCerts() {
  document.getElementById('certGrid').innerHTML = certData.map(c => `
    <div class="cert-card reveal">
      <div class="cert-icon">${c.icon}</div>
      <div>
        <div class="cert-name">${c.name}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-year">${c.year}</div>
      </div>
    </div>
  `).join('');
}

// ===== RENDER EXTRA =====
function renderExtra() {
  document.getElementById('extraGrid').innerHTML = extraData.map(e => `
    <div class="extra-card reveal">
      <div class="extra-title">${e.icon} ${e.title}</div>
      <div class="extra-desc">${e.desc}</div>
    </div>
  `).join('');
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const payload = {
    name: document.getElementById('cfName').value,
    email: document.getElementById('cfEmail').value,
    message: document.getElementById('cfMessage').value
  };
  status.textContent = 'Sending...';
  status.className = 'form-status';
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) throw new Error();
    status.textContent = '✅ Message sent! I\'ll get back to you soon.';
    status.className = 'form-status success';
    this.reset();
  } catch {
    status.textContent = '✅ Message noted! (Backend not yet connected — see setup guide)';
    status.className = 'form-status success';
    this.reset();
  }
});

// ===== SCROLL REVEAL =====
function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Animate skill bars
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  // Also animate skill bars directly
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { bar.style.width = bar.dataset.pct + '%'; io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(bar);
  });
}

// ===== INIT =====
renderSkills();
renderCerts();
renderExtra();
loadProjects().then(() => observeReveal());
observeReveal();
