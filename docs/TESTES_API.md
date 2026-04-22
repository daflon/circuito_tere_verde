# Testes da API - Circuito Terê Verde

## 🚀 Servidor Rodando
```
http://127.0.0.1:8000/
```

## 👤 Credenciais Admin
- **Username:** admin
- **Password:** admin123

---

## 📍 Endpoints Disponíveis

### 1. Autenticação JWT

**Obter Token:**
```bash
curl -X POST http://127.0.0.1:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Refresh Token:**
```bash
curl -X POST http://127.0.0.1:8000/api/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"SEU_REFRESH_TOKEN"}'
```

---

### 2. Parques

**Listar todos os parques:**
```bash
curl http://127.0.0.1:8000/api/parques/
```

**Detalhes de um parque (com trilhas):**
```bash
curl http://127.0.0.1:8000/api/parques/1/
```

---

### 3. Trilhas (com Filtros, Busca e Paginação)

**Listar todas as trilhas (paginado):**
```bash
curl http://127.0.0.1:8000/api/trilhas/
```

**Filtrar por dificuldade:**
```bash
curl "http://127.0.0.1:8000/api/trilhas/?dificuldade=Difícil"
curl "http://127.0.0.1:8000/api/trilhas/?dificuldade=Fácil"
curl "http://127.0.0.1:8000/api/trilhas/?dificuldade=Moderada"
```

**Filtrar por parque:**
```bash
curl "http://127.0.0.1:8000/api/trilhas/?parque=1"
```

**Filtrar por distância (min e max km):**
```bash
curl "http://127.0.0.1:8000/api/trilhas/?min_dist=5&max_dist=12"
curl "http://127.0.0.1:8000/api/trilhas/?min_dist=1&max_dist=3"
```

**Buscar por nome ou descrição:**
```bash
curl "http://127.0.0.1:8000/api/trilhas/?search=pedra"
curl "http://127.0.0.1:8000/api/trilhas/?search=cascata"
```

**Ordenar resultados:**
```bash
curl "http://127.0.0.1:8000/api/trilhas/?ordering=distancia_km"
curl "http://127.0.0.1:8000/api/trilhas/?ordering=-distancia_km"
curl "http://127.0.0.1:8000/api/trilhas/?ordering=nome"
```

**Combinar filtros:**
```bash
curl "http://127.0.0.1:8000/api/trilhas/?dificuldade=Difícil&min_dist=8&ordering=distancia_km"
```

**Paginação:**
```bash
curl "http://127.0.0.1:8000/api/trilhas/?page=1"
curl "http://127.0.0.1:8000/api/trilhas/?page=2"
```

---

### 4. Mapa (GeoJSON)

**Obter todas as trilhas com coordenadas (formato GeoJSON):**
```bash
curl http://127.0.0.1:8000/api/trilhas/mapa/
```

**Mapa com filtros:**
```bash
curl "http://127.0.0.1:8000/api/trilhas/mapa/?dificuldade=Fácil"
curl "http://127.0.0.1:8000/api/trilhas/mapa/?parque=1"
```

---

### 5. Eventos

**Listar eventos:**
```bash
curl http://127.0.0.1:8000/api/eventos/
```

---

### 6. Biodiversidade

**Listar fauna e flora:**
```bash
curl http://127.0.0.1:8000/api/biodiversidade/
```

---

### 7. Fotos de Trilhas

**Listar fotos:**
```bash
curl http://127.0.0.1:8000/api/fotos/
```

**Upload de foto (requer autenticação):**
```bash
curl -X POST http://127.0.0.1:8000/api/fotos/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -F "trilha=1" \
  -F "legenda=Vista incrível do topo" \
  -F "imagem=@/caminho/para/foto.jpg"
```

---

### 8. Favoritos (requer autenticação)

**Listar meus favoritos:**
```bash
curl http://127.0.0.1:8000/api/favoritos/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

**Adicionar favorito:**
```bash
curl -X POST http://127.0.0.1:8000/api/favoritos/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"trilha": 1}'
```

**Remover favorito:**
```bash
curl -X DELETE http://127.0.0.1:8000/api/favoritos/1/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

---

### 9. Comentários (requer autenticação)

**Listar comentários:**
```bash
curl http://127.0.0.1:8000/api/comentarios/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

**Adicionar comentário:**
```bash
curl -X POST http://127.0.0.1:8000/api/comentarios/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"trilha": 1, "texto": "Trilha incrível, vista espetacular!", "nota": 5}'
```

**Atualizar comentário:**
```bash
curl -X PATCH http://127.0.0.1:8000/api/comentarios/1/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"texto": "Atualização: ainda mais bonita na segunda visita!", "nota": 5}'
```

**Deletar comentário:**
```bash
curl -X DELETE http://127.0.0.1:8000/api/comentarios/1/ \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

---

## 🎯 Recursos Implementados

✅ **Filtros avançados** - Por dificuldade, parque, distância, status
✅ **Busca** - Por nome e descrição de trilhas
✅ **Ordenação** - Por distância, nome, dificuldade
✅ **Paginação** - 10 itens por página
✅ **Endpoint de Mapa** - GeoJSON com coordenadas das trilhas
✅ **API de Fotos** - Upload e listagem de fotos das trilhas
✅ **Sistema de Favoritos** - Usuários podem favoritar trilhas
✅ **Sistema de Comentários** - Comentários com notas (1-5)
✅ **Admin Customizado** - Interface administrativa completa
✅ **Autenticação JWT** - Token-based authentication

---

## 📊 Dados no Banco

- **3 Parques**
- **8 Trilhas** (com coordenadas GPS)
- **4 Eventos**
- **7 Espécies** (fauna e flora)

---

## 🔐 Admin Django

Acesse: http://127.0.0.1:8000/admin/

- Username: admin
- Password: admin123

---

## 📝 Notas

- Endpoints públicos: parques, trilhas, eventos, biodiversidade, mapa
- Endpoints autenticados: fotos (upload), favoritos, comentários
- Formato de resposta: JSON
- Paginação padrão: 10 itens por página
