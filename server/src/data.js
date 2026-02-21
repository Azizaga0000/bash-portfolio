export const profile = {
  fullName: "Azizaga Guliyev",
  headline: "Frontend Engineer + Node.js Developer",
  location: "Azerbaijan / Remote",
  summary:
    "Делаю быстрые и выразительные интерфейсы с интерактивом, а на Node.js поднимаю API, которые удобно масштабировать.",
  availability: "Открыт к проектам в 2026",
  socials: [
    { label: "GitHub", href: "https://github.com/Azizaga0000" },
    { label: "Telegram", href: "https://t.me/bash_world_group" }
  ],
  stats: [
    { label: "Проектов", value: 42 },
    { label: "Года опыта", value: 6 },
    { label: "Недель до релиза", value: 2 }
  ]
};

export const projects = [
  {
    id: "soundsafe",
    title: "SoundSafe",
    category: "Education",
    description:
      "Интерактивный тест по привычкам безопасного прослушивания наушников.",
    stack: ["React", "Node.js", "Redis", "Stripe"],
    impact: "+38% к конверсии",
    previewPath: "/previews/pages/soundsafe/soundsafe.html",
    demoUrl: "https://soundsafe-page.netlify.app/",
  },
  {
    id: "sleep-research-portal",
    title: "Sleep Research Portal",
    category: "Research",
    description:
      "Интерактивный портал для исследований сна с визуализацией данных и интерактивными элементами.",
    stack: ["React", "Node.js", "MongoDB", "D3.js"],
    impact: "+42% к вовлеченности пользователей",
    previewPath: "/previews/pages/sleep-research-portal/sleep-research-portal.html",
    demoUrl: "https://sleep-research-portal.netlify.app/",
  },
  {
    id: "bs-lms",
    title: "Bash School LMS System",
    category: "Education",
    description:
      "Система управления обучением для онлайн-курсов с интерактивными уроками и аналитикой.",
    stack: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    impact: "+25% к удержанию студентов",
    previewPath: "/previews/pages/bashsoft/bashsoft.html",
    demoUrl: "https:/bash-soft.netlify.app/",
  },
  {
    id: "Bash-Soft-Studio",
    title: "Bash Soft Studio",
    category: "Product",
    description:
      "Компания по разработке веб-продуктов с фокусом на UX и производительность.",
    stack: ["React", "Node.js", "Docker", "CI/CD"],
    impact: "+65% к увеличению клиентской базы",
    previewPath: "/previews/pages/bashsoft/bashsoft.html",
    demoUrl: "https://bash-soft.netlify.app/",
  }
  // {
  //   id: "pulse-analytics",
  //   title: "Pulse Analytics",
  //   category: "Dashboard",
  //   description:
  //     "Дашборд с real-time метриками, алертами и пользовательскими виджетами.",
  //   stack: ["React", "Node.js", "WebSocket", "PostgreSQL"],
  //   impact: "x2 скорость анализа",
  //   previewPath: "/previews/pulse-analytics.html",
  //   demoUrl: "https://example.com/pulse-analytics",
  // },
  // {
  //   id: "atlas-travel",
  //   title: "Atlas Travel",
  //   category: "SaaS",
  //   description:
  //     "Платформа планирования путешествий с маршрутами, бронями и бюджетом.",
  //   stack: ["React", "Express", "MongoDB", "Mapbox"],
  //   impact: "15k активных пользователей",
  //   previewPath: "/previews/atlas-travel.html",
  //   demoUrl: "https://example.com/atlas-travel",
  // },
  // {
  //   id: "studio-motion",
  //   title: "Studio Motion",
  //   category: "Landing",
  //   description:
  //     "Промо-сайт агентства с кинематографичной анимацией и микро-взаимодействиями.",
  //   stack: ["React", "GSAP", "Node.js", "Cloudinary"],
  //   impact: "74% глубина просмотра",
  //   previewPath: "/previews/studio-motion.html",
  //   demoUrl: "https://example.com/studio-motion",
  // },
  // {
  //   id: "clinic-flow",
  //   title: "Clinic Flow",
  //   category: "Product",
  //   description:
  //     "Внутренний продукт для клиник с расписанием, оплатами и документами.",
  //   stack: ["React", "Node.js", "Prisma", "Docker"],
  //   impact: "-47% ручных операций",
  //   previewPath: "/previews/clinic-flow.html",
  //   demoUrl: "https://example.com/clinic-flow",
  // }
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "JavaScript", "Vite", "CSS Motion", "UI Systems"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST", "WebSocket", "PostgreSQL"]
  },
  {
    title: "Infra",
    skills: ["Docker", "CI/CD", "Nginx", "Monitoring", "Testing"]
  }
];

export const timeline = [
  {
    year: "2025",
    title: "Lead Frontend Engineer",
    company: "Product Studio",
    details:
      "Пересобрал фронтенд-архитектуру и внедрил дизайн-систему, что сократило время релиза новых фич."
  },
  {
    year: "2023",
    title: "Fullstack Developer",
    company: "SaaS Team",
    details:
      "Разработал API на Node.js и интерактивный кабинет пользователя с аналитикой и фильтрами."
  },
  {
    year: "2021",
    title: "Frontend Developer",
    company: "Digital Agency",
    details:
      "Собирал лендинги и коммерческие веб-продукты с фокусом на производительность и UX."
  }
];

export const activity = [
  { label: "Реактивность интерфейса", value: 92, tone: "primary" },
  { label: "Скорость API", value: 88, tone: "secondary" },
  { label: "Доступность UI", value: 81, tone: "tertiary" }
];
