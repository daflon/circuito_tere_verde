import django_filters
from .models import Trilha


class TrilhaFilter(django_filters.FilterSet):
    dificuldade = django_filters.CharFilter(field_name="dificuldade", lookup_expr="iexact")
    parque = django_filters.NumberFilter(field_name="parque__id")
    min_dist = django_filters.NumberFilter(field_name="distancia_km", lookup_expr="gte")
    max_dist = django_filters.NumberFilter(field_name="distancia_km", lookup_expr="lte")
    status = django_filters.CharFilter(field_name="status", lookup_expr="iexact")
    tipo = django_filters.CharFilter(field_name="tipo", lookup_expr="iexact")

    class Meta:
        model = Trilha
        fields = ["dificuldade", "parque", "min_dist", "max_dist", "status", "tipo"]
