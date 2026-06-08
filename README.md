# Balaji Y — Personal Portfolio Website

>   Full-Stack Personal Portfolio

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
npm run dev     
```

### Frontend
```bash
cd frontend
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

