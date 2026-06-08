const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'https://balajiy.netlify.app'] }));
app.use(express.json());

// ===== MONGOOSE SCHEMAS =====
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  emoji: String,
  description: String,
  tags: [String],
  github: String,
  demo: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const Contact = mongoose.model('Contact', contactSchema);

// ===== SEED DATA (runs if DB is empty) =====
async function seedIfEmpty() {
  const count = await Project.countDocuments();
  if (count > 0) return;
  await Project.insertMany([
    {
      title: "RL-Based Banking Fraud Detection",
      emoji: "🤖",
      description: "Reinforcement learning environment using Q-learning to detect fraudulent transactions. Custom OpenAI Gym environment with real-time matplotlib dashboard.",
      tags: ["Python", "Q-Learning", "OpenAI Gym", "Matplotlib"],
      github: "https://github.com/balajiy/rl-fraud-detection",
      featured: true, order: 1
    },
    {
      title: "Hostel Management System",
      emoji: "🏨",
      description: "Full-stack desktop application for hostel administration. 7-table MySQL schema, Java Swing GUI, JDBC connectivity, room & fee management.",
      tags: ["Java", "MySQL", "JDBC", "Swing", "NetBeans"],
      github: "https://github.com/balajiy/hostel-management",
      featured: true, order: 2
    },
    {
      title: "Agentic RAG System",
      emoji: "🧠",
      description: "Research presentation on the full taxonomy of RAG systems covering agentic patterns, LangChain, LlamaIndex, and iterative retrieval.",
      tags: ["LangChain", "LlamaIndex", "Python", "RAG"],
      github: "https://github.com/balajiy/agentic-rag",
      order: 3
    },
    {
      title: "Personal Portfolio Website",
      emoji: "🌐",
      description: "This site! Full-stack portfolio with HTML/CSS/JS frontend, Node.js/Express API, MongoDB database. Deployed on Netlify + Render.",
      tags: ["HTML", "CSS", "JS", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/balajiy/portfolio",
      demo: "https://balajiy.netlify.app",
      featured: true, order: 4
    }
  ]);
  console.log('✅ Seeded sample projects');
}

// ===== ROUTES =====

// GET /api/projects — fetch all projects sorted by order
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST /api/projects — add a new project (admin use)
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/projects/:id — single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// DELETE /api/projects/:id
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

// POST /api/contact — save contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message received! Thank you.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET /api/contact — fetch all messages (admin)
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ===== DB + SERVER START =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected:', MONGO_URI.includes('localhost') ? 'local' : 'Atlas');
    await seedIfEmpty();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
