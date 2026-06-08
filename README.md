# Balaji Y — Personal Portfolio Website

> **Thiranex Internship Task 1** — Full-Stack Personal Portfolio

A complete full-stack personal portfolio to showcase projects and skills.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Deployment** | Netlify (Frontend) + Render (Backend) + MongoDB Atlas (DB) |

---

## Project Structure

```
portfolio/
├── frontend/
│   ├── index.html       ← Main HTML (all sections)
│   ├── style.css        ← Full CSS styling
│   └── app.js           ← Frontend JS (API calls, rendering)
├── backend/
│   ├── server.js        ← Express server + MongoDB models
│   ├── package.json     ← Node dependencies
│   └── .env.example     ← Environment variable template
└── README.md
```

---

## Running Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env → add your MongoDB Atlas connection string (or use local MongoDB)
npm run dev     # starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
# Just open index.html in browser, or use Live Server extension in VS Code
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Fetch all projects |
| POST | `/api/projects` | Add a new project |
| GET | `/api/projects/:id` | Single project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | View all messages |
| GET | `/api/health` | Health check |

---

## Deployment Guide

### Step 1 — MongoDB Atlas (Free Database)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free account
2. Create a **free M0 cluster**
3. Create a database user with username/password
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Copy the connection string → looks like:  
   `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/portfolio`

### Step 2 — Deploy Backend on Render (Free)
1. Go to [render.com](https://render.com) → Sign in with GitHub
2. New → **Web Service** → Connect your GitHub repo
3. **Root Directory**: `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. Add **Environment Variable**: `MONGO_URI` = your Atlas URI
7. Click **Deploy** → copy your URL e.g. `https://balaji-portfolio-api.onrender.com`

### Step 3 — Update Frontend API URL
In `frontend/app.js`, line ~3, update:
```js
: 'https://balaji-portfolio-api.onrender.com/api';  // ← your Render URL
```

### Step 4 — Deploy Frontend on Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. **Add new site** → Import from Git → Select repo
3. **Publish directory**: `frontend`
4. Click **Deploy site** → get your URL e.g. `https://balajiy.netlify.app`

### Step 5 — Update CORS in backend
In `backend/server.js`, add your Netlify URL to the cors origins array:
```js
origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'https://YOUR-NETLIFY-URL.netlify.app']
```
Redeploy backend.

---

## Features Implemented
- ✅ Responsive multi-section portfolio (Hero, About, Projects, Skills, Certifications, Extracurriculars, Contact)
- ✅ Projects fetched dynamically from MongoDB via REST API
- ✅ Contact form saves to MongoDB
- ✅ Skill progress bars with scroll animation
- ✅ Smooth scroll, navbar sticky, mobile hamburger menu
- ✅ MongoDB Atlas cloud database
- ✅ Netlify frontend deployment
- ✅ Render backend deployment

---

*Built for Thiranex Internship Task 1 | © 2026 Balaji Y*
