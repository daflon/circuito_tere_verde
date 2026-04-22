
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Parque(models.Model):
    nome = models.CharField(max_length=150)
    descricao = models.TextField()
    localizacao = models.CharField(max_length=200)

    def __str__(self):
        return self.nome


class Trilha(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.CASCADE, related_name="trilhas")
    nome = models.CharField(max_length=150)
    dificuldade = models.CharField(max_length=50)
    distancia_km = models.FloatField(null=True, blank=True)
    tempo_estimado_min = models.IntegerField(null=True, blank=True)
    descricao = models.TextField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    status = models.CharField(max_length=30, default="aberta")
    tipo = models.CharField(max_length=30, default="trilha")  # trilha, cachoeira, mirante
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criado_em"]

    def __str__(self):
        return self.nome


class TrilhaFoto(models.Model):
    trilha = models.ForeignKey(Trilha, on_delete=models.CASCADE, related_name="fotos")
    imagem = models.ImageField(upload_to="trilhas/fotos/")
    legenda = models.CharField(max_length=200, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Foto {self.id} - {self.trilha.nome}"


class Evento(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=150)
    data = models.DateField()
    descricao = models.TextField()

    def __str__(self):
        return self.titulo


class Biodiversidade(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.CASCADE)
    especie = models.CharField(max_length=150)
    categoria = models.CharField(max_length=100)
    descricao = models.TextField()

    def __str__(self):
        return self.especie


class Favorito(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favoritos")
    trilha = models.ForeignKey(Trilha, on_delete=models.CASCADE, related_name="favoritado_por")
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "trilha")
        ordering = ["-criado_em"]

    def __str__(self):
        return f"{self.user} -> {self.trilha}"


class Comentario(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comentarios")
    trilha = models.ForeignKey(Trilha, on_delete=models.CASCADE, related_name="comentarios")
    texto = models.TextField()
    nota = models.PositiveSmallIntegerField(null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criado_em"]

    def __str__(self):
        return f"Comentário {self.id} - {self.trilha.nome} ({self.user})"
