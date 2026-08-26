# DDS-Portfolio

My personal portfolio project — a pet project I'm building to showcase my work.

## Structure

- `backend/` — Django + Django REST Framework API
- `frontend/` — Vite + React + TypeScript client

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
- [ ] Auth (token/JWT) and permissions
- [ ] Seed data / fixtures
- [ ] Tests

### Frontend (Vite + React + TypeScript)

- [ ] Project scaffolding
- [ ] Pages: home, projects, work history, achievements
- [ ] API integration

## Status

Early days, backend foundation in place. This README will grow alongside the project.