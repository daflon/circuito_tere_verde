import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'circuito_tere_verde.settings')
django.setup()

from api.models import Parque, Trilha, Evento, Biodiversidade, TrilhaFoto, Favorito, Comentario

print("🗑️ Limpando banco de dados...")
Comentario.objects.all().delete()
Favorito.objects.all().delete()
TrilhaFoto.objects.all().delete()
Trilha.objects.all().delete()
Evento.objects.all().delete()
Biodiversidade.objects.all().delete()
Parque.objects.all().delete()
print("✅ Banco limpo!")
