const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Log startup info immediately
console.log('🚀 Starting server...');
console.log('PORT:', PORT);
console.log('MONGO_URI exists:', !!MONGO_URI);

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== SCHEMAS =====
const projectSchema = new mongoose.Schema({
  title: String,
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
  name: String,
  email: String,
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const Contact = mongoose.model('Contact', contactSchema);

// ===== SEED DATA =====
async function seedIfEmpty() {
  const count = await Project.countDocuments();
  if (count > 0) return;
  await Project.insertMany([
    {
      title: "RL-Based Banking Fraud Detection",
      emoji: "🤖",
      description: "Reinforcement learning environment using Q-learning to detect fraudulent transactions. Custom OpenAI Gym environment with real-time matplotlib dashboard.",
      tags: ["Python", "Q-Learning", "OpenAI Gym", "Matplotlib"],
      github: "https://github.com/Balajiyuvi06/-portfolio",
      featured: true, order: 1
    },
    {
      title: "Hostel Management System",
      emoji: "🏨",
      description: "Full-stack desktop application for hostel administration. 7-table MySQL schema, Java Swing GUI, JDBC connectivity.",
      tags: ["Java", "MySQL", "JDBC", "Swing"],
      github: "https://github.com/Balajiyuvi06/-portfolio",
      featured: true, order: 2
    },
    {
      title: "Agentic RAG System",
      emoji: "🧠",
      description: "Research on RAG systems covering agentic patterns, LangChain, LlamaIndex, and iterative retrieval.",
      tags: ["LangChain", "LlamaIndex", "Python", "RAG"],
      github: "https://github.com/Balajiyuvi06/-portfolio",
      order: 3
    },
    {
      title: "Personal Portfolio Website",
      emoji: "🌐",
      description: "Full-stack portfolio with HTML/CSS/JS frontend, Node.js/Express API, MongoDB database.",
      tags: ["HTML", "CSS", "JS", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/Balajiyuvi06/-portfolio",
      featured: true, order: 4
    }
  ]);
  console.log('✅ Seeded sample projects');
}

// ===== ROUTES =====
app.get('/', (req, res) => res.json({ message: 'Balaji Portfolio API is running!' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== START SERVER FIRST, THEN CONNECT DB =====
// This ensures Render sees the port binding immediately
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

// Connect to MongoDB after server starts
if (!MONGO_URI) {
  console.error('❌ MONGO_URI environment variable is not set!');
} else {
  mongoose.connect(MONGO_URI)
    .then(async () => {
      console.log('✅ MongoDB connected successfully');
      await seedIfEmpty();
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
    });
}