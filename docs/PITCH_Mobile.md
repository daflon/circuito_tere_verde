# 📱 Circuito Terê Verde — Pitch Mobile (PWA)

## O Problema

O turista que chega em Teresópolis enfrenta informações fragmentadas: trilhas sem sinalização digital, condições desatualizadas, nenhum mapa interativo no bolso. Na trilha, sem sinal de celular, não há como consultar nada.

## A Solução

Uma **Progressive Web App** que funciona como app nativo — instalável no celular, com navegação offline e interface mobile-first — sem precisar baixar nada na App Store ou Play Store.

O visitante acessa pelo navegador, toca em "Adicionar à tela inicial" e pronto: tem um app completo no bolso.

## Por que PWA e não App Nativo?

| Critério | App Nativo | PWA ✅ |
|----------|-----------|--------|
| Instalação | Play Store / App Store | Direto do navegador |
| Aprovação de loja | Semanas | Instantâneo |
| Custo de dev | 2 codebases (iOS + Android) | 1 codebase |
| Atualização | Usuário precisa atualizar | Automática |
| Funciona offline | Sim | Sim (Service Worker) |
| Acesso por link | Não | Sim — compartilhável |
| Tamanho | 50-100MB | ~2MB |
| Hardware necessário | Qualquer smartphone | Qualquer smartphone |

Para um projeto de ecoturismo municipal, a PWA entrega 95% da experiência nativa com 10% do esforço.

## Experiência do Usuário

### No celular (mobile-first)
- **Bottom tabs** — navegação estilo app nativo (Início, Trilhas, Mapa, Eventos, Bio, Educar)
- **Cards com imagens reais** — fotos das trilhas e espécies da região
- **Filtros touch-friendly** — botões pill para dificuldade, tipo, ordenação
- **Mapa interativo** — Leaflet com markers GPS reais, popups com info
- **Tela cheia** — sem barra do navegador quando instalado
- **Safe areas** — suporte a notch e barra de navegação moderna

### No desktop
- **Top navbar** — navegação tradicional com botão Admin
- **Grid responsivo** — 1 coluna no celular, 2 no tablet, 3 no desktop
- **Mesma URL** — sem redirecionamento, layout adapta automaticamente

## Funcionalidades Mobile

### Para o Visitante
- 🔍 Buscar trilhas por nome, parque ou descrição
- 🥾 Filtrar por dificuldade (Fácil → Muito Difícil)
- 💧 Filtrar por tipo (Trilha, Cachoeira, Mirante)
- 🗺️ Ver todas as trilhas no mapa com GPS real
- 📍 Abrir localização no Google Maps (navegação)
- ❤️ Favoritar trilhas para consulta rápida
- ⭐ Avaliar trilhas com comentários e notas
- 🐾 Explorar fauna e flora com imagens reais
- 📅 Consultar eventos programados
- 🌍 Aprender sobre conservação e boas práticas
- 📶 Consultar dados offline (cache do Service Worker)

### Para o Administrador
- 🔐 Login JWT direto no app
- 📊 Acesso ao Django Admin para gestão de conteúdo
- ✏️ CRUD de parques, trilhas, eventos e biodiversidade
- 🟢 Atualizar status das trilhas (aberta/fechada/manutenção)

## Stack Técnica

```
Frontend (PWA)
├── React 19 + Vite 7
├── Tailwind CSS 4
├── React Router (SPA)
├── Axios (API client + JWT auto-refresh)
├── Leaflet + react-leaflet (mapas)
├── Service Worker (cache offline)
└── Web App Manifest (instalação)

Backend (API)
├── Django 4.2 + DRF
├── SimpleJWT (autenticação)
├── django-filter (filtros avançados)
├── WhiteNoise (static files)
├── SQLite (banco de dados)
└── Gunicorn (servidor produção)

Deploy
└── Render (Web Service, free tier)
```

## Offline — Como Funciona

```
1. Primeiro acesso → Service Worker cacheia HTML, CSS, JS e imagens
2. Requisições à API → Network-first com fallback para cache
3. Sem internet → App carrega do cache, dados da última consulta
4. Volta online → Dados atualizados automaticamente
```

O turista pode consultar trilhas e biodiversidade mesmo dentro do parque, sem sinal.

## Métricas do Build

| Métrica | Valor |
|---------|-------|
| Bundle JS | 456 KB (143 KB gzip) |
| Bundle CSS | 24 KB (5 KB gzip) |
| Imagens (15) | ~1.2 MB total |
| Tempo de build | ~15 segundos |
| First paint | < 2 segundos |
| Instalação PWA | < 2 MB no dispositivo |

## Fluxo de Navegação

```
Home
├── Parques → Detalhe do Parque → Trilhas do Parque
├── Trilhas (filtros/busca) → Detalhe → Comentários / Favoritos / Google Maps
├── Mapa Interativo → Popup → Detalhe da Trilha
├── Eventos
├── Biodiversidade (filtro fauna/flora)
├── Educação Ambiental
└── Login Admin → Django Admin
```

## Diferenciais

🌐 **Zero fricção** — Sem download, sem cadastro, acessa e usa

📶 **Offline-ready** — Funciona na trilha sem sinal

🔗 **Compartilhável** — Envia o link da trilha por WhatsApp

⚡ **Leve** — 2MB vs 50-100MB de um app nativo

🔄 **Sempre atualizado** — Sem "atualize o app" na loja

📱 **Nativo no bolso** — Ícone na home, tela cheia, bottom tabs

## Evolução Futura

- [ ] Notificações push (novos eventos)
- [ ] Modo offline completo com SQLite no browser (IndexedDB)
- [ ] Compartilhar trilha com preview (Open Graph)
- [ ] Fotos dos usuários (upload direto do celular)
- [ ] Trilhas percorridas (tracking GPS)
- [ ] Gamificação (badges por trilhas completadas)
- [ ] App nativo com Expo (reaproveitando a API)

---

**Circuito Terê Verde** — A natureza de Teresópolis no bolso 🌿📱
