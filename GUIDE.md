# 📘 Guia de Desenvolvimento — CRM LAR Imóveis

Lições aprendidas durante o desenvolvimento desta aplicação. Serve como referência para projetos futuros com stack similar.

## Stack

| Camada | Tecnologia | Versão | Notas |
|--------|-----------|--------|-------|
| Framework | Next.js | 16.2.4 | App Router, Server Components, API Routes |
| Linguagem | TypeScript | 5.x | Strict mode, interfaces para todos os tipos |
| UI | Tailwind CSS | 4.x | `@custom-variant dark` para dark mode |
| ORM | Prisma | 6.x | Não usar v7 (breaking changes). Usar `.cmd` no Windows |
| Banco | PostgreSQL | Supabase | Session Pooler (IPv4) na porta 5432 |
| Auth | NextAuth.js | v5 beta | Credentials + JWT, perfis via token |
| Gráficos | Chart.js 4 | + react-chartjs-2 | Registrar componentes manualmente |
| Deploy | Vercel | CLI | `npx --yes vercel --prod` da pasta web/ |
| Desktop | Electron | 33 | Branch master, não tocar durante dev web |

## Ambiente de Desenvolvimento

### Portas
- **3000**: Reservada (site institucional Laura)
- **3001**: Dev server Next.js (`npx next dev -p 3001`)

### Windows/PowerShell
- Sem `tail`, `head`, heredoc (`<<<`)
- Usar `Select-Object -Last N` para output
- Prisma CLI: `node_modules\.bin\prisma.cmd` (extensão .cmd obrigatória)
- Parar dev server antes de `prisma generate` (DLL lock)

### Git
- Branch `master` = Electron desktop (nunca commitar código web aqui)
- Branch `migracao-web` = versão web (branch de trabalho)
- Sempre commitar com mensagens em português seguindo conventional commits

## Supabase (PostgreSQL)

### Conexão
- **Session Pooler (IPv4)**: Usar sempre. IPv6 não funciona na rede do cliente
- Porta: **5432** (não 6543)
- URL: `postgresql://postgres.{ref}:{senha}@aws-1-us-west-2.pooler.supabase.com:5432/postgres`

### Connection Pool
- Supabase Free Tier: **15 conexões** no Session Pooler
- Vercel serverless abre muitas conexões simultâneas
- **Obrigatório**: `?pgbouncer=true&connection_limit=5` na DATABASE_URL
- Sem isso, o pool satura e todas as páginas dão "server error"

### Prisma + Supabase
- `DATABASE_URL` com pooler (para queries normais)
- `DIRECT_URL` com conexão direta (para migrations — só funciona com IPv6)
- Se DIRECT_URL não funcionar, usar `prisma db push` via pooler

## Vercel (Deploy)

### Comandos
```bash
# Deploy produção (da pasta web/)
npx --yes vercel --prod

# Build command no vercel.json
npx prisma generate && next build
```

### Variáveis de Ambiente
Configurar no painel Vercel (Settings > Environment Variables):
- `DATABASE_URL` (com connection_limit)
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (https://largestao.vercel.app)
- `GEMINI_API_KEY` (quando implementar AI)

### Erros Comuns
- **Deploy falha intermitente**: Vercel CLI tem erros temporários. Esperar 30s e tentar de novo
- **"This page couldn't load"**: Pool de conexões saturado. Adicionar `connection_limit=5`
- **Prisma "cannot find module"**: Falta `npx prisma generate` no build command

## Tailwind CSS 4

### Dark Mode
```css
/* globals.css */
@custom-variant dark (&:where(.dark, .dark *));
```

### Padrão de Cores Dark
| Elemento | Light | Dark |
|----------|-------|------|
| Background página | `bg-gray-50` | `dark:bg-[#0c1929]` |
| Cards | `bg-white` | `dark:bg-[#111d2e]` |
| Borders | `border-gray-200` | `dark:border-[#1e3a5f]` |
| Texto principal | `text-gray-900` | `dark:text-white` |
| Texto secundário | `text-gray-500` | `dark:text-gray-400` |
| Inputs | `bg-white` | `dark:bg-[#162236]` |

### ThemeProvider
- Contexto React + localStorage (`lar-theme`)
- Respeita `prefers-color-scheme` do sistema
- Toggle na sidebar (ícone compacto)
- `suppressHydrationWarning` no `<html>` para evitar mismatch

## Padrões de UI

### Drawers (painéis laterais)
- Desktop: `max-w-[480px]` (ou 500px para Locações)
- Mobile: `w-full`
- Breakpoint: `sm:` (640px), não `md:` (768px)
- Glassmorphism: `bg-white/95 backdrop-blur-md`
- Animação: `animate-slide-in-right` (CSS keyframe)
- Backdrop: `bg-black/20 backdrop-blur-sm`

### Modais
- Glassmorphism: `bg-white/95 backdrop-blur-md`
- Animação: `animate-scale-up` (CSS keyframe)
- Backdrop: `bg-black/30 backdrop-blur-md`
- ESC fecha (event listener no useEffect)

### Micro-interações (CSS puro, sem Framer Motion)
- Cards: `.card-hover` (translateY -2px + shadow)
- Kanban: `.kanban-card` (scale 1.03 + rotate 1deg ao arrastar)
- Status toggle: `.status-toggle` (brightness + scale)
- KPIs: `.animate-fade-in-up` com `.stagger-1` a `.stagger-4`
- Badges: `.animate-badge-pulse` (scale infinito 2s)

### Skeleton Screens
- Usar `animate-pulse` do Tailwind
- Cor: `bg-gray-200 dark:bg-[#1e3a5f]`
- Componente reutilizável: `Skeleton.tsx` com variantes (KPI, Chart, Table, Cards, Grid)

### Empty States
- Componente `EmptyState.tsx` reutilizável
- Emoji grande (text-6xl) + título + descrição + CTA
- Dark mode compatível
- Sempre oferecer ação (botão para criar o recurso)

## Autenticação

### NextAuth v5
- Credentials provider (usuário + senha)
- JWT strategy (não database sessions)
- Perfil armazenado no token via campo `image` (hack necessário)
- Username armazenado no campo `email` (hack necessário)
- `trustHost: true` obrigatório para Vercel

### Senhas
- Suporta plain text (legado) e bcrypt
- Detecção automática: `senhaHash.startsWith('$2')` = bcrypt
- Novas senhas: bcrypt cost 12
- Validação: 10 chars, maiúsc, minúsc, número, especial, sem 3+ repetidos

## Prisma

### Schema
- 15 tabelas com `@@map` para nomes em snake_case no PostgreSQL
- Enums: `Perfil` (Admin, Corretor, Assistente)
- Relações: Cliente → Leads, Imóveis, Contratos (múltiplas)
- Códigos internos gerados no backend (PES0001, AP0001, etc)

### Singleton
```typescript
// src/lib/prisma.ts
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

## Lições Aprendidas

1. **Connection pool é crítico em serverless**. Sem `connection_limit`, Vercel satura o Supabase em minutos.

2. **Tailwind CSS 4 dark mode** precisa de `@custom-variant dark` no CSS, não no config. Diferente do v3.

3. **Drawers responsivos**: usar `sm:` (640px) não `md:` (768px). Tablets ficam com layout mobile se usar md.

4. **Framer Motion é overkill** para micro-interações simples. CSS keyframes + Tailwind transitions cobrem 90% dos casos sem adicionar 30KB ao bundle.

5. **Glassmorphism funciona melhor com opacidade alta** (95%). Abaixo de 80% prejudica legibilidade.

6. **Empty states com CTA** convertem melhor que mensagens genéricas. "Nenhum dado" → "Cadastre seu primeiro X para ver Y aqui".

7. **Skeleton screens** só fazem sentido onde há fetch client-side. Dados via SSR (props) já vêm prontos.

8. **Supabase Free Tier**: 15 conexões no pooler, 500MB storage, 1GB bandwidth. Suficiente para MVP.

9. **Vercel CLI** tem erros intermitentes. Sempre ter um retry de 30s no workflow.

10. **Git branches**: manter desktop (master) e web (migracao-web) separados. Nunca fazer merge entre eles.

11. **Prisma no Windows**: usar `.cmd` extension. `npx prisma` pode não funcionar, usar `node_modules\.bin\prisma.cmd`.

12. **NextAuth v5 beta**: campos limitados no token. Usar `image` para perfil e `email` para username é um workaround funcional.

13. **Chart.js + dark mode**: os gráficos não respondem automaticamente ao dark mode. Precisaria de config dinâmica de cores (não implementado ainda).

14. **tabular-nums** alinha dígitos em coluna — essencial para tabelas financeiras.

15. **Audit log em tudo**: registrar quem fez o quê. Custo zero, valor imenso para compliance.
