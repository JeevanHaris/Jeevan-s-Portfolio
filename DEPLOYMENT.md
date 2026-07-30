# FastAPI Backend & Portfolio Deployment Guide

This repository contains a full-stack portfolio application with a **React (Vite + TypeScript + TailwindCSS)** frontend and a **FastAPI (Python)** backend.

---

## 🚀 Quick Start (Local Development)

### 1. Backend (FastAPI)

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Run the FastAPI development server
npm run dev:backend
# OR
python -m uvicorn api.index:app --reload --port 8000
```
- API Endpoint: `http://localhost:8000`
- Interactive OpenAPI Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 2. Frontend (React + Vite)

```bash
# 1. Install Node dependencies
npm install

# 2. Start Vite dev server with proxy to FastAPI
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Zero Config)

This application is pre-configured with `vercel.json` to deploy both the frontend static site and serverless Python backend seamlessly on Vercel.

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import your repository.
3. Vercel automatically detects `vercel.json` and builds:
   - Frontend static assets to `dist/`
   - Serverless Python functions under `/api`
4. Click **Deploy**. Done!

---

## 🐳 Option 2: Docker Container Deployment

Suitable for **Render**, **Railway**, **Fly.io**, **DigitalOcean**, **AWS EC2/ECS**, or any server supporting Docker containers.

### Build & Run Docker Image

```bash
# Build the Docker image
docker build -t jeevan-portfolio-backend .

# Run the container on port 8000
docker run -p 8000:8000 jeevan-portfolio-backend
```

### Docker Compose

```bash
docker-compose up --build -d
```

---

## ☁️ Option 3: Render / Railway / Heroku (PaaS)

This repo includes a `Procfile` for platform-as-a-service deployments.

1. Connect your repository to **Render** or **Railway**.
2. Set Environment Variables:
   - `ENVIRONMENT=production`
   - `PORT=8000`
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn api.index:app --host 0.0.0.0 --port $PORT`

---

## 📡 API Reference Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health status and version check |
| `GET` | `/api/profile` | Full profile bio & achievements |
| `GET` | `/api/profiles` | Social media handles (LinkedIn, GitHub, Instagram) |
| `GET` | `/api/projects` | Portfolio projects list |
| `GET` | `/api/skills` | Technical skills breakdown |
| `POST` | `/api/contact` | Contact form submission handler |
| `GET` | `/docs` | Interactive Swagger UI documentation |
