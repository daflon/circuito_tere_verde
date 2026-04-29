 Circuito Terê Verde

👥 Integrantes
Charles Daflon
Wallace Correa


📌 Situação Problema:
Teresópolis possui um território fortemente marcado pela presença de áreas naturais preservadas e formações montanhosas de destaque, reunindo importantes unidades de conservação como o Parque Nacional da Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural Municipal Montanhas de Teresópolis. Apesar do grande potencial para o ecoturismo, com trilhas, paisagens icônicas e rica biodiversidade, o acesso à informação sobre essas áreas ainda é fragmentado, dificultando a exploração consciente e organizada por moradores e visitantes.

O Circuito Tere Verde tem como proposta conectar as principais áreas naturais de Teresópolis em uma experiência mais integrada e acessível. A ideia é oferecer ao usuário uma forma simples de descobrir, planejar e explorar trilhas, montanhas e unidades de conservação da região.

🎯 Meta:
Desenvolver uma plataforma digital que permita à população acessar, de forma rápida e organizada, informações sobre as atrações naturais de Teresópolis. O objetivo é facilitar a consulta sobre trilhas, cachoeiras e atividades relacionadas ao circuito, com destaque para locais como o Parque Nacional da Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural Municipal Montanhas de Teresópolis.

Além disso, a plataforma também reúne informações sobre a biodiversidade local, incluindo fauna, flora e conteúdos de educação ambiental.

A proposta é centralizar essas informações em um único ambiente, tornando o planejamento das visitas mais simples, acessível e alinhado com práticas de turismo consciente.

🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| Backend | Django 4.2 + Django REST Framework | API RESTful, admin, autenticação |
| Frontend | React 19 + Vite 7 | Interface SPA, PWA |
| Estilização | Tailwind CSS 4 | Design responsivo mobile-first |
| Mapa | Leaflet + react-leaflet + OpenStreetMap | Mapa interativo com GPS |
| Autenticação | JWT (SimpleJWT) | Login seguro para administradores |
| Banco de Dados | SQLite | Armazenamento de dados |
| Deploy | Render (Web Service) | Hospedagem em produção |
| PWA | Service Worker + Web App Manifest | App instalável e offline |


📋 Requisitos do Projeto

O sistema deve disponibilizar uma plataforma digital para consulta de informações sobre ecoturismo em Teresópolis, reunindo dados sobre trilhas, eventos, biodiversidade e educação ambiental. A navegação deve ser simples, com organização por seções e acesso rápido às principais funcionalidades.

📋 Requisitos Funcionais

RF01 – O sistema deve exibir uma página inicial com apresentação das principais áreas naturais de Teresópolis, incluindo destaque para o Parque Nacional da Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural Municipal Montanhas de Teresópolis.

RF02 – O sistema deve exibir, na página inicial, uma lista de eventos com informações básicas.

RF03 – O sistema deve possuir um menu de navegação com acesso às seções: Trilhas, Mapa, Eventos, Biodiversidade e Educação Ambiental.

RF04 – O sistema deve exibir, para cada trilha, informações como descrição, nível de dificuldade, distância, tempo estimado e status (aberta ou fechada).

RF05 – O sistema deve permitir ao usuário refinar a listagem de trilhas por meio de filtros e ordenação, incluindo critérios como distância, nível de dificuldade e ordem alfabética (A–Z).

RF06 – O sistema deve apresentar um mapa interativo utilizando OpenStreetMap com a localização das trilhas.

RF07 – O sistema deve exibir uma seção de eventos com listagem e informações detalhadas.

RF08 – O sistema deve disponibilizar seções informativas sobre biodiversidade e educação ambiental, incluindo conteúdos sobre fauna, flora, bioma local, unidades de conservação, boas práticas ambientais e legislação aplicável.

RF09 – O sistema deve permitir a navegação entre todas as seções de forma contínua e funcional.


⚙️ Requisitos Não Funcionais

RNF01 – Usabilidade:
O sistema deve apresentar interface intuitiva, permitindo que o usuário acesse qualquer funcionalidade principal em, no máximo, 3 cliques.

RNF02 – Desempenho:
O tempo de carregamento das páginas deve ser de até 3 segundos em conexões padrão de internet.

RNF03 – Responsividade:
O sistema deve ser compatível com dispositivos móveis, tablets e desktops, adaptando sua interface automaticamente a diferentes tamanhos de tela.

RNF04 – Disponibilidade:
O sistema deve estar disponível para acesso 24 horas por dia, 7 dias por semana, exceto em períodos de manutenção.

RNF05 – Escalabilidade:
A arquitetura do sistema deve permitir expansão futura, suportando aumento no número de usuários e dados sem comprometer o desempenho.

RNF06 – Compatibilidade:
O sistema deve ser compatível com os principais navegadores modernos (Google Chrome, Mozilla Firefox, Microsoft Edge e Safari).

RNF07 – Acessibilidade:
O sistema deve seguir boas práticas de acessibilidade, permitindo navegação adequada para diferentes perfis de usuários.

RNF08 – Segurança:
O sistema deve garantir a integridade das informações exibidas, evitando alterações não autorizadas.

RNF09 – Confiabilidade:
As informações apresentadas devem ser consistentes e refletir corretamente os dados cadastrados no sistema.

RNF10 – Integração:
O sistema deve suportar integração com serviços externos, como mapas (ex: OpenStreetMap).

🚀 Escopo do MVP

O MVP do Circuito Tere Verde consiste em uma plataforma funcional que permite ao usuário explorar informações essenciais sobre trilhas, eventos e características ambientais da região, validando a proposta de centralização e organização dos dados em um único ambiente digital.

❌ O que Não Está Implementado:
Recurso de criação de contas para usuários normais.
Mecanismo de inscrição/registro de usuários em atividades.
Sistema de avaliações agregadas (média de notas por trilha).
Canais de comunicação direta (chat/formulário de contato) com a equipe.
