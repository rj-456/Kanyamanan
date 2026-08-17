# Kanyamanan Django REST API Backend

This is the official **Django REST Framework** backend for the **Kanyamanan Pampanga Culinary Heritage Platform**.

---

## 🚀 Quick Start (Local Setup)

### 1. Requirements
- **Python 3.10 or higher**
- `pip` package manager

### 2. Setup Virtual Environment & Install Dependencies
Open terminal in the `backend` directory:

```bash
# Create virtual environment
python -m venv venv

# Activate Virtual Environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows Command Prompt:
venv\Scripts\activate.bat
# macOS/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### 3. Run Database Migrations
```bash
python manage.py makemigrations api
python manage.py migrate
```

### 4. Seed Initial Data & Admin Credentials
```bash
python api/seed_data.py
```
*This creates:*
- **Super Admin Account**: Username: `admin` | Password: `admin123`
- **Restaurant Merchant Accounts**: e.g., `kabigtings_owner` / `password123`
- Preseeded Pampanga restaurants, menu items, travel corridors, and municipalities.

### 5. Start Development Server
```bash
python manage.py runserver
```
Your backend will be live at:
- **API Root**: `http://127.0.0.1:8000/api/`
- **Django Admin Panel**: `http://127.0.0.1:8000/admin/`

---

## 📡 Key API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/restaurants/` | `GET`, `POST` | List all restaurants or create a new restaurant |
| `/api/restaurants/<id>/` | `GET`, `PUT`, `DELETE` | Retrieve, update, or remove a specific restaurant |
| `/api/corridors/` | `GET` | List travel corridors |
| `/api/municipalities/` | `GET` | List Pampanga municipalities |
| `/api/change-requests/` | `GET`, `POST`, `PATCH` | Merchant menu update requests |
| `/api/itineraries/` | `GET`, `POST` | Tourist saved itineraries & trip history |
| `/api/auth/login/` | `POST` | Authenticate Super Admin & Merchant owners |

---

## ☁️ Deploying to Vercel

1. **Vercel Config**: `vercel.json` and `kanyamanan_backend/wsgi.py` are already pre-configured for Vercel Serverless runtime (`@vercel/python`).
2. **Push to GitHub/GitLab**.
3. **Import to Vercel**: Select the `backend` root folder in Vercel project settings.
4. **Environment Variables** (Optional on Vercel):
   - `DATABASE_URL`: URL to PostgreSQL database (Neon / Supabase).
   - `SECRET_KEY`: Django secret key.
