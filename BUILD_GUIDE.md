# Ordo Mobile - Guia de Build

## Ambiente

| Item | Valor |
|------|-------|
| OS | Windows 10/11 |
| CPU | Intel i3, 8GB RAM, SSD 240GB |
| Node (build) | v22.14.0 via nvm (`C:\Users\daflon\AppData\Local\nvm\v22.14.0`) |
| Node (sistema) | v25.1.0 (NÃO usar para build) |
| JDK | 17.0.18 (`C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot`) |
| Android SDK | `%LOCALAPPDATA%\Android\Sdk` |
| Android platforms | android-35 |
| Build tools | 35.0.0 |
| NDK | 27.1 |
| Package manager | npm com `--legacy-peer-deps` (`.npmrc`) |

## Versões dos Pacotes

| Pacote | Versão |
|--------|--------|
| expo | 54.0.33 |
| expo-router | 6.0.23 |
| expo-constants | 18.0.13 |
| expo-modules-core | 3.0.29 |
| @expo/metro-runtime | 6.1.2 |
| react | 19.1.0 |
| react-native | 0.81.5 |
| react-native-reanimated | 3.19.5 (v3, NÃO v4) |
| metro | 0.83.3 |
| @tamagui/core | 1.144.3 (apenas core, NÃO full tamagui) |
| hermes | habilitado |

## Configurações Críticas

| Config | Valor | Arquivo |
|--------|-------|---------|
| newArchEnabled | false | `app.json` e `gradle.properties` |
| hermesEnabled | true | `gradle.properties` |
| org.gradle.jvmargs | -Xmx3072m -XX:MaxMetaspaceSize=512m | `gradle.properties` |
| org.gradle.parallel | true | `gradle.properties` |
| Android package | com.ordo.mobile | `app.json` |
| Signing (release) | debug keystore (dev only) | `build.gradle` |

## Bugs Conhecidos e Soluções

### 1. Metro `getPackage` TypeError (RESOLVIDO)
- **Erro**: `TypeError: Cannot read properties of undefined (reading 'getPackage')` durante Metro bundling
- **Causa raiz**: Metro 0.83.3 instala uma cópia aninhada do metro 0.83.4 em `node_modules/metro/node_modules/`. A incompatibilidade entre versões causa o erro no resolver.
- **Solução**: Script `scripts/fix-metro-duplication.js` remove `node_modules/metro/node_modules/`. Roda automaticamente via `postinstall`.
- **IMPORTANTE**: Rodar o script após cada `npm install`.

### 2. react-native-reanimated v4 incompatível
- **Erro**: Build falha com erros de New Architecture
- **Causa**: v4 (reanimated) requer New Architecture habilitada
- **Solução**: Usar v3.19.5. NÃO atualizar para v4 enquanto `newArchEnabled: false`.

## Arquitetura Offline-First

O app funciona 100% offline. Todos os dados são gravados no SQLite local e sincronizados com o backend quando disponível.

| Componente | Arquivo | Função |
|-----------|---------|--------|
| SyncService | `src/services/SyncService.ts` | Motor de sync (push/pull), config IP, fila |
| sync_queue | migration 009 | Fila de operações pendentes |
| id_map | migration 011 | Mapeamento ID local → servidor |
| sync_log | migration 012 | Histórico de sincronizações |
| app_config | migration 010 | Config persistente (IP servidor) |
| useSync | `src/hooks/useSync.ts` | Hook React para status e auto-sync |
| Config screen | `app/(tabs)/config.tsx` | Tela de configurações e monitoramento |

### Fluxo de dados
1. Usuário cria transação/cupom → grava no SQLite local
2. Operação é enfileirada na `sync_queue`
3. A cada 60s (ou manual), SyncService verifica conectividade
4. Se online: push pendentes → pull dados novos (categorias, produtos)
5. IDs locais são mapeados para IDs do servidor via `id_map`

### Estratégia de conflitos
- Last-write-wins por timestamp
- CREATE+UPDATE pendentes são mergeados
- CREATE+DELETE pendentes se cancelam (nunca foi pro servidor)

## Bugs Conhecidos e Soluções

### 3. Deletar pasta `android/`
- **Problema**: PowerShell `Remove-Item` falha com EBUSY
- **Solução**: `cmd /c "rd /s /q ordo-mobile\android"` — parar qualquer terminal que usou a pasta antes.

## Comandos de Build

### Preparação (após npm install ou mudanças em plugins)
```powershell
# Garantir Node 22
$node22 = "C:\Users\daflon\AppData\Local\nvm\v22.14.0"

# Fix metro duplication
& "$node22\node.exe" scripts/fix-metro-duplication.js

# Prebuild (gera pasta android/)
$env:Path = "$node22;" + ($env:Path -split ";" | Where-Object { $_ -notmatch "nvm\\v\d|nodejs" } | ForEach-Object { $_ }) -join ";"
npx expo prebuild --platform android --clean
```

### Build APK Release
```powershell
$node22 = "C:\Users\daflon\AppData\Local\nvm\v22.14.0"
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:CI = "1"
$paths = $env:Path -split ";"
$filtered = $paths | Where-Object { $_ -notmatch "nvm\\v\d|nodejs" }
$env:Path = "$node22;" + ($filtered -join ";")
.\gradlew.bat assembleRelease --no-daemon
```
Executar de dentro de `ordo-mobile/android/`.

### APK Output
```
ordo-mobile/android/app/build/outputs/apk/release/app-release.apk
```

## Tempos Estimados (i3/8GB)

| Etapa | Primeiro build | Build cacheado |
|-------|---------------|----------------|
| Compilação nativa (Kotlin/C++/Java) | ~18 min | ~1 min (UP-TO-DATE) |
| Metro bundling | ~5 min | ~2 min |
| Total | ~23 min | ~5 min |

## Checklist Pré-Build

1. [ ] Node 22 no PATH (verificar com `node --version`)
2. [ ] JAVA_HOME apontando para JDK 17
3. [ ] ANDROID_HOME configurado
4. [ ] `npm install` executado
5. [ ] `node scripts/fix-metro-duplication.js` executado
6. [ ] `npx expo prebuild --platform android --clean` executado (se necessário)
7. [ ] Nenhum processo usando a pasta `android/` (se precisar deletar)

## Histórico de Builds

| Data | Resultado | Notas |
|------|-----------|-------|
| 2026-03-02 | ✅ SUCESSO | Primeiro build. 36m53s. Fix getPackage (metro duplication). APK: `app-release.apk` |
| 2026-03-02 | 🔧 BUILD 2 ✅ | Offline-first + tela Config + cleartext plugin. 27m07s. |
| 2026-03-02 | 🔧 BUILD 3 ✅ | Fix sync conta_id + pull contas/produtos. 3m42s (cacheado). |
| 2026-03-11 | 🔧 BUILD 4 ✅ | Token refresh on 401 + error display. ~6m. |
| 2026-03-11 | 🔧 BUILD 5 ✅ | Pull transações + saldo total real + fix teclado cupom. 8m58s. |
| 2026-03-12 | 🔧 BUILD 6 ✅ | Quantidade fracionada (decimal-pad) no item do cupom. 8m38s. |
