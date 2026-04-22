
from rest_framework import viewsets, permissions, decorators, response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Parque, Trilha, Evento, Biodiversidade, TrilhaFoto, Favorito, Comentario
from .serializers import (
    ParqueSerializer, TrilhaSerializer, EventoSerializer, BiodiversidadeSerializer,
    TrilhaFotoSerializer, ComentarioSerializer, FavoritoSerializer
)
from .filters import TrilhaFilter


class ParqueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Parque.objects.all()
    serializer_class = ParqueSerializer
    permission_classes = [AllowAny]


class TrilhaViewSet(viewsets.ModelViewSet):
    queryset = Trilha.objects.all().select_related("parque")
    serializer_class = TrilhaSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = TrilhaFilter
    search_fields = ["nome", "descricao", "parque__nome"]
    ordering_fields = ["distancia_km", "nome", "dificuldade"]
    permission_classes = [AllowAny]

    @decorators.action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def mapa(self, request):
        qs = self.filter_queryset(self.get_queryset())
        features = []
        for t in qs:
            if t.latitude is None or t.longitude is None:
                continue
            features.append({
                "type": "Feature",
                "properties": {
                    "id": t.id,
                    "nome": t.nome,
                    "dificuldade": t.dificuldade,
                    "parque": t.parque.nome,
                    "distancia_km": float(t.distancia_km) if t.distancia_km is not None else None,
                    "tipo": t.tipo,
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [float(t.longitude), float(t.latitude)]
                }
            })
        return response.Response({
            "type": "FeatureCollection",
            "features": features
        })


class EventoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    permission_classes = [AllowAny]


class BiodiversidadeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Biodiversidade.objects.all()
    serializer_class = BiodiversidadeSerializer
    permission_classes = [AllowAny]


class TrilhaFotoViewSet(viewsets.ModelViewSet):
    queryset = TrilhaFoto.objects.all()
    serializer_class = TrilhaFotoSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all().select_related("user", "trilha")
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoritoViewSet(viewsets.ModelViewSet):
    queryset = Favorito.objects.all().select_related("user", "trilha")
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return super().get_queryset()
        return super().get_queryset().filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
