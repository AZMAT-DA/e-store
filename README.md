# SoleStride - Premium Footwear E-Store

SoleStride is a high-end shoe e-store built with a modern tech stack: **Next.js 14** (Frontend), **FastAPI** (Backend), and **PostgreSQL** (Database).

## ✨ Features
- **Premium Aesthetics**: Dark mode, glassmorphism, and smooth animations (Framer Motion).
- **Comprehensive Navigation**: Home, Shop, New Arrivals, Collections, and Our Story.
- **Interactive UI**: Working Cart, Search overlay, and Profile side-drawer.
- **API First**: Scalable FastAPI backend with SQLAlchemy models.

---

## 🚀 Quick Start (Dockerized) - RECOMMENDED
The fastest way to run the project. Everything is pre-configured.

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 2. Run the Stack
Unzip the files, navigate to the folder in your terminal, and run:
```bash
docker-compose up --build
```

### 3. Access the App
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠 Manual Development Setup
If you want to make heavy changes to the code without Docker:

### Backend Setup
1. Navigate to `/backend`.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to `/frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

---

## ⚙️ Configuration
Copy `.env.example` to `.env` in the root folder to customize settings.

```env
DATABASE_URL=postgresql://user:password@db:5432/solestride
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 👯 Sharing with a Friend
To share this project:
1. Zip the entire folder **except** `node_modules`, `venv`, and `.next`.
2. Your friend just needs to extract and run `docker-compose up`.

---

## 🔧 Common Issues & Fixes
- **Database Connection Error**: Ensure no other service is using port `5432`.
- **Frontend not loading**: Check `NEXT_PUBLIC_API_URL` in `.env`.
- **Seed Data**: Visit `http://localhost:8000/seed` once the backend is running to populate the store with initial shoes.
