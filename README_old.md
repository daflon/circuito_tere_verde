# 🌿 Circuito Terê Verde

Plataforma digital para consulta de trilhas, parques, biodiversidade e eventos ecológicos de Teresópolis/RJ.

**🔗 Live:** [circuito-tere-verde.onrender.com](https://circuito-tere-verde.onrender.com)

---

## Sobre o Projeto

Teresópolis é delimitada por três unidades de conservação: o Parque Nacional da Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural Municipal Montanhas de Teresópolis. O Circuito Terê Verde é uma solução digital que permite à população acessar informações sobre esses parques e seus atrativos de forma eficiente.

A plataforma é uma **PWA (Progressive Web App)** — funciona no navegador e pode ser instalada como app no celular, com navegação offline e interface nativa.

## Funcionalidades

- 🥾 **Trilhas** — Lista com filtros (dificuldade, tipo, busca textual), ordenação e imagens reais
- 💧 **Cachoeiras e Mirantes** — Filtro por tipo de atrativo
- 🗺️ **Mapa Interativo** — Leaflet com coordenadas GPS reais de cada trilha
- 🐾 **Biodiversidade** — Fauna e flora com imagens e filtro por categoria
- 📅 **Eventos** — Atividades programadas nos parques
- 🌍 **Educação Ambiental** — Boas práticas, bioma e legislação
- ❤️ **Favoritos** — Salvar trilhas favoritas (requer login)
- ⭐ **Comentários** — Avaliações com notas de 1 a 5 estrelas
- 🔐 **Login Admin** — Autenticação JWT para administradores
- 📱 **PWA** — Instalável no celular, funciona offline

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Backend | Django 4.2 + Django REST Framework |
| Frontend | React 19 + Vite 7 + Tailwind CSS 4 |
| Autenticação | JWT (SimpleJWT) |
| Mapa | Leaflet + react-leaflet |
| Banco de Dados | SQLite |
| Deploy | Render (Web Service) |
| PWA | Service Worker + Web App Manifest |

## Estrutura do Projeto

```
├── backend/                → API Django REST Framework
│   ├── api/                → Models, Views, Serializers, Filters
│   ├── circuito_tere_verde/→ Settings, URLs, WSGI
│   └── requirements.txt
├── frontend/               → App React (PWA)
│   ├── src/
│   │   ├── api/            → Axios client + endpoints
│   │   ├── assets/         → Imagens de trilhas e biodiversidade
│   │   ├── context/        → AuthContext (JWT)
│   │   ├── data/           → Mapeamento de imagens
│   │   └── pages/          → Home, Trilhas, Mapa, Eventos, Bio, Educação, Login
│   └── public/             → PWA manifest, service worker, ícones
├── mobile/                 → Scaffold React Native + Expo (futuro)
├── docs/                   → Documentação técnica
├── build.sh                → Script de build para deploy
└── render.yaml             → Configuração do Render
```

## Desenvolvimento Local

### Pré-requisitos
- Python 3.12+
- Node.js 22+

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

O frontend roda em `http://localhost:9000` com proxy para a API em `http://127.0.0.1:8000`.

### Acesso Admin
- **URL:** /admin/ ou /login
- **Usuário:** admin
- **Senha:** admin123

## API Endpoints

### Públicos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/parques/ | Lista parques com trilhas |
| GET | /api/trilhas/ | Lista trilhas (filtros: dificuldade, tipo, search, ordering) |
| GET | /api/trilhas/{id}/ | Detalhe da trilha |
| GET | /api/trilhas/mapa/ | GeoJSON com coordenadas |
| GET | /api/eventos/ | Lista eventos |
| GET | /api/biodiversidade/ | Lista fauna e flora |

### Autenticados (JWT)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/token/ | Obter token JWT |
| POST | /api/token/refresh/ | Renovar token |
| GET/POST/DELETE | /api/favoritos/ | Gerenciar favoritos |
| GET/POST/DELETE | /api/comentarios/ | Gerenciar comentários |

## Deploy (Render)

O projeto está configurado para deploy no Render. O `build.sh` automatiza:
1. Instala dependências Python e Node
2. Compila o frontend React
3. Copia o build para o Django (WhiteNoise)
4. Roda migrations e seed de dados

## Dados Incluídos

- **3 Parques** — PARNASO, Três Picos, Montanhas de Teresópolis
- **8 Trilhas** — Com coordenadas GPS reais
- **7 Espécies** — Fauna e flora da Mata Atlântica
- **4 Eventos** — Atividades programadas

## Licença

Projeto acadêmico — MVP
