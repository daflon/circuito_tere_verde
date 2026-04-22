# 🌿 Circuito Terê Verde

**Uma API completa para conectar pessoas às trilhas e parques de Teresópolis/RJ**

## O Problema
Teresópolis possui um patrimônio natural incrível - PARNASO, Três Picos, dezenas de trilhas - mas falta uma plataforma centralizada para que visitantes e moradores descubram, planejem e compartilhem suas experiências nas trilhas da região.

## A Solução
Uma API RESTful robusta que gerencia todo o ecossistema de trilhas ecológicas, permitindo que aplicativos e sites ofereçam:
- Descoberta de trilhas com filtros inteligentes (dificuldade, distância, status)
- Visualização em mapa com coordenadas GPS reais (GeoJSON)
- Sistema social com favoritos e avaliações
- Informações sobre biodiversidade local e eventos programados

## Stack Técnica
**Backend robusto e escalável:**
- **Django 4.2.7** + **Django REST Framework** - Framework enterprise-grade
- **JWT Authentication** - Segurança moderna para APIs
- **django-filter** - Filtros avançados e busca textual
- **Pillow** - Upload e processamento de imagens
- **SQLite** - Banco de dados (pronto para PostgreSQL em produção)

## Funcionalidades Principais
✅ **CRUD completo** - Parques, Trilhas, Eventos, Biodiversidade  
✅ **Filtros avançados** - Por dificuldade, distância, parque, status  
✅ **Endpoint de mapa** - GeoJSON com coordenadas GPS reais  
✅ **Sistema social** - Favoritos, comentários com notas (1-5)  
✅ **Upload de fotos** - Galeria de imagens das trilhas  
✅ **Paginação e ordenação** - Performance otimizada  
✅ **Admin customizado** - Gestão completa via Django Admin  

## Dados Reais
O sistema já vem populado com:
- 3 parques (PARNASO, Três Picos, Montanhas de Teresópolis)
- 8 trilhas com coordenadas GPS reais (Pedra do Sino, Travessia Pet-Terê, etc)
- 4 eventos programados
- 7 espécies de fauna e flora catalogadas

## Diferenciais
🎯 **Pronto para produção** - Autenticação, filtros, paginação, tudo implementado  
🗺️ **Geo-ready** - Coordenadas GPS em formato GeoJSON para integração com mapas  
📱 **API-first** - Pronto para consumo por apps mobile, web, ou qualquer frontend  
🔒 **Seguro** - JWT authentication e permissões configuráveis  
📊 **Escalável** - Arquitetura Django permite crescimento sem refatoração  

## Casos de Uso
- App mobile para trilheiros planejarem suas aventuras
- Site turístico da prefeitura de Teresópolis
- Plataforma de ecoturismo regional
- Sistema de gestão para administradores de parques

---

**Circuito Terê Verde** - Tecnologia a serviço da natureza 🌲
