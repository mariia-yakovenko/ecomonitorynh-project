єПовітря — моніторинг якості повітря

Навчальний вебдодаток для моніторингу якості повітря в містах України.
Проєкт реалізовано в межах лабораторної роботи №1 з дисципліни «Веб-розробка».

Примітка: Усі дані станцій та вимірювань є навчальними та використовуються для демонстрації функціонала.

Технічний стек
Next.js (App Router) 16.2.4 фреймворк, SSR/SSG та API routes
TypeScript 5.x строга типізація та безпека коду
Tailwind CSS 3.x сучасна стилізація (замість Bootstrap)
React 19.x побудова інтерфейсу користувача
Leaflet / Map components — візуалізація станцій на інтерактивній карті
e-Ukraine local фірмовий шрифт (.otf, next/font/local)
GitHub Actions — автоматизація CI/CD (збірка та перевірка типів)

Структура проєкту
├── app/ # App Router — сторінки та API
│ ├── layout.tsx # Кореневий layout: шрифти, навігація, підвал
│ ├── globals.css # Глобальні стилі та Tailwind директиви
│ ├── page.tsx # Головна сторінка зі списком станцій
│ ├── map/ # Сторінка інтерактивної карти
│ ├── about/ # Статична сторінка «Про проєкт»
│ ├── guide/ # Довідник забруднювачів
│ ├── station/[id]/ # Детальна аналітика конкретної станції
│ └── api/
│ ├── stations/ # GET /api/stations — перелік та фільтрація
│ ├── measurements/ # GET /api/measurements — часові ряди
│ ├── current/ # GET /api/current — поточні показники
│ └── log/ # GET/POST /api/log — системні логи
├── components/ # Модульні компоненти
│ ├── StationMap.tsx # Компонент інтерактивної карти
│ ├── StationCharts.tsx # Графіки показників забруднення
│ ├── WebVitals.tsx # Моніторинг продуктивності (Core Web Vitals)
│ ├── AnalyticsEvent.tsx # Інтеграція Google Analytics
│ ├── AqiBadge.tsx # Кольорова індикація категорії AQI
│ └── ...
├── lib/ # Логіка та дані
│ └── data.ts # Mock-дані станцій та генерація вимірювань
├── types/
│ └── index.ts # TypeScript інтерфейси (AirQualityData, MonitoringStation тощо)
└── public/
└── fonts/ # Шрифти e-Ukraine (усі наявні ваги)

API Endpoints
GET /api/stations
Повертає список станцій із підтримкою фільтрації за містом, типом та сортуванням.

GET /api/measurements
Повертає історичні дані вимірювань для побудови графіків (StationCharts.tsx).
Параметри: stationId, from, to.

GET /api/current
Отримання найсвіжіших даних для конкретної станції або всього списку.

Методи рендерингу

Проєкт використовує гібридний підхід для оптимальної продуктивності:

- SSR (Server-Side Rendering): головна сторінка (/) для забезпечення актуальності даних при кожному запиті.
- SSG (Static Site Generation): сторінки /about, /guide та детальні сторінки станцій (generateStaticParams), що дозволяє миттєво завантажувати контент.
- Client-Side Rendering: інтерактивна карта (StationMap.tsx) та графіки, що потребують доступу до Browser API.

CI/CD та автоматизація
У проєкті налаштовано автоматизований Workflow через GitHub Actions (.github/workflows/ci.yml), який виконує:

1. Checkout code — отримання останньої версії коду
2. Linting & Type Check — перевірка TypeScript типів (npx tsc --noEmit)
3. Build Check — перевірка успішності створення продуктової збірки (npm run build)

Запуск та розгортання

# Встановлення всіх залежностей

npm install

# Запуск локального сервера (http://localhost:3000)

npm run dev

# Продуктова збірка

npm run build
npm run start
