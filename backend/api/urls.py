
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    ParqueViewSet, TrilhaViewSet, EventoViewSet, BiodiversidadeViewSet,
    TrilhaFotoViewSet, ComentarioViewSet, FavoritoViewSet
)

router = routers.DefaultRouter()
router.register("parques", ParqueViewSet, basename="parque")
router.register("trilhas", TrilhaViewSet, basename="trilha")
router.register("eventos", EventoViewSet, basename="evento")
router.register("biodiversidade", BiodiversidadeViewSet, basename="biodiversidade")
router.register("fotos", TrilhaFotoViewSet, basename="trilha-foto")
router.register("comentarios", ComentarioViewSet, basename="comentario")
router.register("favoritos", FavoritoViewSet, basename="favorito")

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
