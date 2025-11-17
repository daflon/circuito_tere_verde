from django.core.management.base import BaseCommand
from api.models import Parque, Trilha, Evento, Biodiversidade
from datetime import date
from decimal import Decimal


class Command(BaseCommand):
    help = "Popula o banco com dados reais de parques, trilhas e eventos de Teresópolis."

    def handle(self, *args, **kwargs):
        self.stdout.write("🌱 Iniciando carga de dados completos...")

        # Criar parques
        pns_orgaos, _ = Parque.objects.get_or_create(
            nome="Parque Nacional da Serra dos Órgãos",
            defaults={
                "descricao": "Unidade de conservação federal com montanhas icônicas como o Dedo de Deus e a Pedra do Sino.",
                "localizacao": "Teresópolis - RJ"
            }
        )

        tres_picos, _ = Parque.objects.get_or_create(
            nome="Parque Estadual dos Três Picos",
            defaults={
                "descricao": "Maior parque estadual do Rio de Janeiro, com paisagens e montanhas impressionantes.",
                "localizacao": "Vale dos Frades, Teresópolis - RJ"
            }
        )

        montanhas_tere, _ = Parque.objects.get_or_create(
            nome="Parque Natural Municipal Montanhas de Teresópolis",
            defaults={
                "descricao": "Área natural protegida com grande valor ambiental e trilhas ecológicas.",
                "localizacao": "Posse, Teresópolis - RJ"
            }
        )

        # Trilhas com coordenadas
        trilhas_data = [
            (pns_orgaos, "Pedra do Sino", "Difícil", 11.4, 480, "Trilha mais famosa do parque, leva ao ponto mais alto da Serra dos Órgãos.", "-22.4519", "-43.0103"),
            (pns_orgaos, "Cartão Postal", "Moderada", 3.0, 120, "Mirantes belíssimos com vista para o Dedo de Deus.", "-22.4489", "-43.0089"),
            (pns_orgaos, "Travessia Petrópolis-Teresópolis", "Muito Difícil", 30.0, 1440, "Uma das travessias mais famosas do Brasil, com 3 dias de caminhada.", "-22.4500", "-43.0100"),
            (pns_orgaos, "Poço Verde", "Fácil", 1.0, 30, "Trilha curta até um poço de águas cristalinas.", "-22.4470", "-43.0120"),
            (tres_picos, "Pico dos Três Picos", "Difícil", 8.5, 360, "Trilha desafiadora com vistas panorâmicas incríveis.", "-22.3850", "-42.8920"),
            (tres_picos, "Vale dos Frades", "Fácil", 2.5, 60, "Trilha leve entre pastagens e montanhas imponentes.", "-22.3900", "-42.8950"),
            (montanhas_tere, "Cascata dos Amores", "Fácil", 1.5, 45, "Trilha leve com acesso a uma bela cachoeira.", "-22.4200", "-42.9800"),
            (montanhas_tere, "Mirante do Soberbo", "Moderada", 2.8, 90, "Vista privilegiada de Teresópolis e região.", "-22.4150", "-42.9750"),
        ]

        for parque, nome, dificuldade, dist, tempo, desc, lat, lng in trilhas_data:
            Trilha.objects.get_or_create(
                parque=parque,
                nome=nome,
                defaults={
                    "dificuldade": dificuldade,
                    "distancia_km": dist,
                    "tempo_estimado_min": tempo,
                    "descricao": desc,
                    "latitude": Decimal(lat),
                    "longitude": Decimal(lng),
                    "status": "aberta"
                }
            )

        # Eventos
        eventos_data = [
            (pns_orgaos, "Caminhada Ecológica – Pedra do Sino", date(2025, 4, 20), "Caminhada guiada com educadores ambientais."),
            (tres_picos, "Encontro de Montanhismo", date(2025, 5, 15), "Atividades para amantes da escalada e montanhismo."),
            (montanhas_tere, "Observação de Aves", date(2025, 6, 10), "Atividade de birdwatching com especialistas."),
            (pns_orgaos, "Trilha Noturna – Poço Verde", date(2025, 7, 18), "Experiência noturna com biólogos."),
        ]

        for parque, titulo, data_evento, desc in eventos_data:
            Evento.objects.get_or_create(
                parque=parque,
                titulo=titulo,
                defaults={
                    "data": data_evento,
                    "descricao": desc
                }
            )

        # Biodiversidade
        biodiversidade_data = [
            (pns_orgaos, "Quati", "Fauna", "Mamífero comum nas trilhas do PARNASO."),
            (pns_orgaos, "Bugio-ruivo", "Fauna", "Macaco encontrado nas áreas de mata atlântica."),
            (pns_orgaos, "Bromélia Vriesea", "Flora", "Comum nas áreas de altitude da Serra dos Órgãos."),
            (tres_picos, "Tucano-de-bico-verde", "Fauna", "Ave símbolo da Mata Atlântica."),
            (tres_picos, "Palmito-juçara", "Flora", "Palmeira nativa ameaçada de extinção."),
            (montanhas_tere, "Beija-flor-de-fronte-violeta", "Fauna", "Espécie comum em altitudes elevadas."),
            (montanhas_tere, "Orquídea Laelia", "Flora", "Orquídea rara encontrada em áreas altas."),
        ]

        for parque, especie, categoria, desc in biodiversidade_data:
            Biodiversidade.objects.get_or_create(
                parque=parque,
                especie=especie,
                defaults={
                    "categoria": categoria,
                    "descricao": desc
                }
            )

        self.stdout.write("✅ Banco populado com sucesso!")
