from django.contrib import admin
from .models import Parque, Trilha, TrilhaFoto, Favorito, Comentario, Biodiversidade, Evento


@admin.register(Parque)
class ParqueAdmin(admin.ModelAdmin):
    list_display = ("id", "nome", "localizacao")
    search_fields = ("nome",)


@admin.register(Trilha)
class TrilhaAdmin(admin.ModelAdmin):
    list_display = ("id", "nome", "parque", "dificuldade", "distancia_km", "status")
    list_filter = ("parque", "dificuldade", "status")
    search_fields = ("nome", "descricao")
    readonly_fields = ("criado_em",)


@admin.register(TrilhaFoto)
class TrilhaFotoAdmin(admin.ModelAdmin):
    list_display = ("id", "trilha", "legenda", "criado_em")


@admin.register(Favorito)
class FavoritoAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "trilha", "criado_em")
    search_fields = ("user__username", "trilha__nome")


@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "trilha", "nota", "criado_em")
    search_fields = ("user__username", "trilha__nome", "texto")


@admin.register(Biodiversidade)
class BiodiversidadeAdmin(admin.ModelAdmin):
    list_display = ("id", "especie", "categoria", "parque")
    list_filter = ("categoria", "parque")
    search_fields = ("especie",)


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ("id", "titulo", "parque", "data")
    list_filter = ("parque", "data")
    search_fields = ("titulo",)
