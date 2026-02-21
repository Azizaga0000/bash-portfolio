# Interactive Portfolio (React + Node.js)

Интерактивное портфолио с:
- React + JavaScript фронтендом
- Node.js (Express) API
- предпросмотром страниц проектов в модалке (`iframe`)
- фильтрами, 3D-наклоном карточек, анимированными секциями и интерактивной контактной формой

## Запуск

```bash
npm install
npm run install:all
npm run dev
```

После запуска:
- фронтенд: `http://localhost:5173`
- API: `http://localhost:5000`

## Продакшн-сборка фронтенда

```bash
npm run build
```

Собранный фронтенд лежит в `client/dist`.  
Если папка `client/dist` существует, сервер автоматически начнет раздавать ее как статику.

## Основные API эндпоинты

- `GET /api/profile`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/timeline`
- `GET /api/activity`
- `POST /api/contact`
