# Modrinth Proxy

Прокси-сайт для Modrinth API с поддержкой модов, плагинов, шейдеров, ресурспаков и датапаков.

## Возможности

- 🔥 **Полный прокси Modrinth API** - без хостинга файлов
- ⚡ **Быстрая навигация** - моды, плагины, шейдеры, ресурспаки, датапаки
- 🎨 **Красивый UI** - с анимациями и адаптивным дизайном
- 📱 **Мобильная оптимизация** - работает на всех устройствах
- 🔍 **Продвинутые фильтры** - по версиям, загрузчикам, категориям
- 🚫 **Контентная фильтрация** - блокировка нежелательного контента
- 🔗 **URL rewriting** - все ссылки Modrinth перенаправляются локально

## Деплой на Cloudflare Pages

### Способ 1: Через GitHub (рекомендуется)

1. Загрузите проект на GitHub
2. Зайдите в [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Перейдите в **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Выберите ваш репозиторий
5. Настройки сборки:
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/`
6. Нажмите **Save and Deploy**

### Способ 2: Через Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run pages:build
wrangler pages deploy .vercel/output/static
```

## Локальная разработка

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Технологии

- **Next.js 14** - React фреймворк
- **Tailwind CSS** - стили
- **Modrinth API** - источник данных
- **Cloudflare Pages** - хостинг

## Структура проекта

```
├── app/
│   ├── mods/              # Моды
│   ├── plugins/           # Плагины
│   ├── shaders/           # Шейдеры
│   ├── resourcepacks/     # Ресурспаки
│   ├── datapacks/         # Датапаки
│   ├── components/        # Общие компоненты
│   └── layout.js          # Основной layout
├── lib/
│   ├── modrinth.js        # API функции
│   └── contentFilter.js   # Фильтрация контента
└── public/                # Статические файлы
```

## Особенности

### Фильтрация контента

Сайт автоматически фильтрует нежелательный контент через черный список в `lib/contentFilter.js`:

**Блокировка проектов (по slug):**
```javascript
const BLACKLIST_PROJECTS = [
  'simple-voice-chat',
  'iris-shaders',
]
```

**Блокировка изображений (по URL):**
```javascript
const BLACKLIST_PATTERNS = [
  'cdn.modrinth.com/data/XXX/images/YYY.png',
]
```

Заблокированные проекты:
- Не показываются в списках поиска
- Недоступны по прямой ссылке (показывается "Доступ запрещён")
- Автоматически фильтруются на всех страницах

### URL Rewriting

Все ссылки на `modrinth.com/mod/*`, `modrinth.com/plugin/*` и т.д. автоматически преобразуются в локальные URL.

### Кеширование

API запросы кешируются через Next.js для улучшения производительности.

## Лицензия

MIT
