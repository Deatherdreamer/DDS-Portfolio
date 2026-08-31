# DDS-Portfolio

My personal portfolio project — a pet project I'm building to showcase my work.

## Structure

- `backend/` — Django + Django REST Framework API
- `frontend/` — Vite + React + TypeScript client

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate  # On Windows (or source .venv/bin/activate on Unix)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Progress

### Backend (Django + DRF)

- [x] Project scaffolding, settings, and SQLite database
- [x] `User`, `Technology`, and `Project` models with REST endpoints (ViewSets + routers)
- [x] `Company`, `Position`, and `Achievement` models to track work history:
  - Companies support remote/on-site, start/end dates (nullable end date = still working there)
  - Positions tie to a company with their own date ranges (multiple positions per company)
  - Achievements can link to a company or stand alone as personal/professional
  - Projects can optionally be associated with a company
- [x] Nested serializers (writable `company_id`, read-only nested company data)
- [x] Screenshot uploads per project (Pillow): title, optional description, manual ordering with upload-order defaults, files stored under `media/projects/<id>/screenshots/`
- [ ] Auth (token/JWT) and permissions
- [ ] Seed data / fixtures
- [ ] Tests

### Frontend (Vite + React + TypeScript)

- [x] Project scaffolding & directory structure (`components/`, `hooks/`, `services/`, `context/`, `pages/`, `types/`, `constants/`)
- [x] Domain TypeScript types matching backend API models
- [x] Theme system (light, dark, system preferences) & i18n localization (EN/ES)
- [x] Base UI component library (`Button`, `Card`, `Badge`, `Skeleton`)
- [x] Layout & navigation (`Navbar`, `Footer`, `Container`, `Layout`)
- [x] Section components (`Hero`, `Projects`, `Experience`, `Achievements`)
- [x] API client & TanStack Query hooks integration
- [x] Pages: Home, Projects, Experience, Achievements
- [ ] End-to-end integration with live backend API data
- [ ] Polish animations and responsiveness

## Status

Backend foundation is in place and the frontend directory structure, UI foundation, theme management, and API services are scaffolded and verified.