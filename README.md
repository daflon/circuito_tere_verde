
# Circuito Terê Verde - MVP Backend

API completa para gerenciamento de trilhas, parques e eventos ecológicos de Teresópolis/RJ.

## 🚀 Tecnologias

- Django 4.2.7
- Django REST Framework
- SimpleJWT (Autenticação)
- django-filter (Filtros avançados)
- Pillow (Upload de imagens)
- SQLite

## 📋 Funcionalidades

✅ CRUD completo de Parques, Trilhas, Eventos e Biodiversidade
✅ Filtros avançados (dificuldade, distância, parque, status)
✅ Busca textual por nome e descrição
✅ Paginação automática (10 itens/página)
✅ Ordenação customizável
✅ Endpoint de mapa com coordenadas GPS (GeoJSON)
✅ Sistema de favoritos (autenticado)
✅ Sistema de comentários com notas (autenticado)
✅ Upload de fotos das trilhas
✅ Autenticação JWT
✅ Admin customizado

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd circuito_tere_verde
```

2. **Instale as dependências**
```bash
pip install -r requirements.txt
```

3. **Execute as migrations**
```bash
python circuito_tere_verde/manage.py migrate
```

4. **Popule o banco de dados**
```bash
python circuito_tere_verde/manage.py seed_data
```

5. **Crie o superusuário (ou use o script)**
```bash
python circuito_tere_verde/create_superuser.py
```

6. **Inicie o servidor**
```bash
python circuito_tere_verde/manage.py runserver
```

## 🔐 Acessos

### API Base
```
http://127.0.0.1:8000/api/
```

### Admin Django
```
URL: http://127.0.0.1:8000/admin/
Usuário: admin
Senha: admin123
```

### Autenticação JWT
```
Endpoint: POST http://127.0.0.1:8000/api/token/
Body: {"username": "admin", "password": "admin123"}
```

## 📍 Principais Endpoints

### Públicos (sem autenticação)
- `GET /api/parques/` - Lista todos os parques
- `GET /api/trilhas/` - Lista trilhas (com filtros)
- `GET /api/trilhas/mapa/` - Coordenadas GPS (GeoJSON)
- `GET /api/eventos/` - Lista eventos
- `GET /api/biodiversidade/` - Lista fauna e flora

### Autenticados (requer JWT token)
- `POST /api/favoritos/` - Adicionar favorito
- `POST /api/comentarios/` - Adicionar comentário
- `POST /api/fotos/` - Upload de foto

## 🔍 Exemplos de Uso

### Filtrar trilhas por dificuldade
```bash
GET /api/trilhas/?dificuldade=Difícil
```

### Filtrar por distância
```bash
GET /api/trilhas/?min_dist=5&max_dist=12
```

### Buscar trilhas
```bash
GET /api/trilhas/?search=pedra
```

### Ordenar por distância
```bash
GET /api/trilhas/?ordering=distancia_km
```

### Obter mapa com filtros
```bash
GET /api/trilhas/mapa/?dificuldade=Fácil
```

## 📊 Dados Incluídos

- **3 Parques** (PARNASO, Três Picos, Montanhas de Teresópolis)
- **8 Trilhas** com coordenadas GPS reais
- **4 Eventos** programados
- **7 Espécies** de fauna e flora

## 📚 Documentação Completa

Consulte os arquivos:
- `TESTES_API.md` - Exemplos detalhados de todos os endpoints
- `RESUMO_IMPLEMENTACAO.md` - Visão geral técnica do projeto

## 👨‍💻 Desenvolvimento

### Limpar banco de dados
```bash
python circuito_tere_verde/clear_db.py
```

### Recriar dados
```bash
python circuito_tere_verde/manage.py seed_data
```

## 📝 Licença

Projeto acadêmico - MVPs
