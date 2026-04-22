# 🌿 Circuito Terê Verde — Monorepo

Plataforma completa para trilhas e parques de Teresópolis/RJ.

## Estrutura

```
├── backend/     → API Django REST Framework
├── frontend/    → App Web (React + Vite + Tailwind)
├── mobile/      → App Mobile (React Native + Expo)
└── docs/        → Documentação do projeto
```

## Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

### Frontend Web
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## API Base
- Backend: `http://127.0.0.1:8000/api/`
- Admin: `http://127.0.0.1:8000/admin/` (admin / admin123)
