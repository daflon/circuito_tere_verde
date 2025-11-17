
from rest_framework import serializers
from .models import Parque, Trilha, Evento, Biodiversidade, TrilhaFoto, Favorito, Comentario


class TrilhaFotoSerializer(serializers.ModelSerializer):
    imagem_url = serializers.SerializerMethodField()

    class Meta:
        model = TrilhaFoto
        fields = ["id", "trilha", "legenda", "imagem_url", "criado_em"]

    def get_imagem_url(self, obj):
        request = self.context.get("request")
        if obj.imagem and request:
            return request.build_absolute_uri(obj.imagem.url)
        if obj.imagem:
            return obj.imagem.url
        return None


class TrilhaSerializer(serializers.ModelSerializer):
    fotos = TrilhaFotoSerializer(many=True, read_only=True)
    parque_nome = serializers.ReadOnlyField(source="parque.nome")

    class Meta:
        model = Trilha
        fields = [
            "id", "nome", "descricao", "dificuldade", "distancia_km",
            "tempo_estimado_min", "status", "latitude", "longitude",
            "parque", "parque_nome", "fotos", "criado_em"
        ]


class ParqueSerializer(serializers.ModelSerializer):
    trilhas = TrilhaSerializer(many=True, read_only=True)

    class Meta:
        model = Parque
        fields = ["id", "nome", "descricao", "localizacao", "trilhas"]


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = "__all__"


class BiodiversidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biodiversidade
        fields = "__all__"


class ComentarioSerializer(serializers.ModelSerializer):
    user_nome = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comentario
        fields = ["id", "user", "user_nome", "trilha", "texto", "nota", "criado_em"]
        read_only_fields = ("user", "criado_em")


class FavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorito
        fields = ["id", "user", "trilha", "criado_em"]
        read_only_fields = ("user", "criado_em")
