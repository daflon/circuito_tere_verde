#!/usr/bin/env bash
set -o errexit

echo "=== Installing backend dependencies ==="
pip install -r backend/requirements.txt

echo "=== Installing frontend dependencies ==="
cd frontend
npm install
npm run build
cd ..

echo "=== Copying frontend build to backend ==="
mkdir -p backend/staticfiles/frontend
cp -r frontend/dist/* backend/staticfiles/frontend/

echo "=== Collecting static files ==="
cd backend
python manage.py collectstatic --noinput

echo "=== Running migrations ==="
python manage.py migrate --noinput

echo "=== Seeding data (if empty) ==="
python -c "
import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'circuito_tere_verde.settings')
django.setup()
from api.models import Trilha
if Trilha.objects.count() == 0:
    from django.core.management import call_command
    call_command('seed_data')
    print('Data seeded')
else:
    print('Data already exists, skipping seed')
"

echo "=== Creating superuser (if not exists) ==="
python -c "
import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'circuito_tere_verde.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', '', 'admin123')
    print('Superuser created')
else:
    print('Superuser already exists')
"

echo "=== Build complete ==="
