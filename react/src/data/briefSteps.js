const briefSteps = [
  {
    id: 'siteType',
    type: 'radio',
    label: 'Какой сайт вам нужен?',
    description: 'Выберите основной тип будущего сайта, чтобы мы лучше поняли вашу задачу.',
    options: [
      { 
        label: 'Лендинг', 
        value: 'landing', 
        description: 'Одностраничный сайт, сфокусированный на продаже одного продукта или услуги.' 
      },
      { 
        label: 'Сайт-визитка', 
        value: 'businessCard', 
        description: 'Небольшой сайт для презентации компании, услуг и контактной информации.' 
      },
      { 
        label: 'Корпоративный сайт', 
        value: 'corporate', 
        description: 'Сайт для бизнеса с подробной структурой: услуги, новости, блог, вакансии и контакты.' 
      },
      { 
        label: 'Информационный сайт', 
        value: 'informational', 
        description: 'Сайт для публикации большого количества статей, новостей или обзоров.' 
      },
      { 
        label: 'Интернет-магазин', 
        value: 'ecommerce', 
        description: 'Сайт с каталогом товаров, системой корзины, онлайн-оплатой и фильтрацией.' 
      }
    ],
    required: false
  },  
  {
    id: 'businessScope',
    type: 'textarea',
    label: 'Расскажите о вашей сфере деятельности',
    description: 'Опишите в двух словах, чем вы занимаетесь — это важно для точной формулировки предложений.',
    required: false
  },
  {
    id: 'products',
    type: 'textarea',
    label: 'Какие товары или услуги вы предлагаете?',
    description: 'Уточните ассортимент товаров или услуг, ключевые особенности.',
    required: true
  },
  {
    id: 'targetAudience',
    type: 'textarea',
    label: 'Кто ваша целевая аудитория?',
    description: 'Опишите, для кого создаётся сайт: кто ваши клиенты, пользователи или партнёры? Укажите их возраст, интересы, профессию, географию или другие важные характеристики.',
    required: true
  },
  {
    id: 'geography',
    type: 'textarea',
    label: 'В каком регионе/странах вы работаете?',
    description: 'Укажите географию вашего бизнеса — это влияет на структуру, контент и продвижение.',
    required: true
  },
  {
    id: 'siteStructure',
    type: 'textarea',
    label: 'Основные разделы или блоки сайта',
    description: 'Перечислите, какие страницы и разделы должны быть на сайте (например: О компании, Услуги, Контакты).',
    required: true
  },
  {
    id: 'competitors',
    type: 'textarea',
    label: 'Ссылки на сайты ваших конкурентов',
    description: 'Добавьте несколько ссылок на сайты прямых конкурентов для анализа позиции вашего бизнеса.',
    required: true
  },
  {
    id: 'inspirationExamples',
    type: 'textarea',
    label: 'Ссылки на сайты, которые вам нравятся',
    description: 'Добавьте примеры для понимания стиля, структуры или функционала. Ваш сайт будет индивидуальным.',
    required: true
  },
  {
    id: 'logo',
    type: 'radio',
    label: 'Есть ли у вас логотип?',
    options: [
      { value: 'yes', label: 'Да, есть', description: 'Логотип уже готов.' },
      { value: 'needDesign', label: 'Нет, нужно разработать', description: 'Требуется создать новый логотип.' },
      { value: 'inProgress', label: 'В процессе', description: 'Логотип в разработке.' }
    ],
    required: true
  },
  {
    id: 'hasTextContent',
    type: 'radio',
    label: 'У вас уже есть тексты для сайта?',
    description: 'Это поможет понять, сколько времени нужно будет на написание контента.',
    options: [
      { value: 'ready', label: 'Да, всё готово', description: 'Вы предоставите все тексты.' },
      { value: 'needCopywriting', label: 'Нет, нужно написать', description: 'Потребуется разработка текстов.' },
      { value: 'partially', label: 'Частично, нужно доработать', description: 'Нужна редактура или дополнение.' }
    ],
    required: true
  },
  {
    id: 'domain',
    type: 'domain-radio',
    label: 'У вас есть домен?',
    description: 'Это нужно для размещения сайта. Мы можем помочь с покупкой домена.',
    options: [
      { value: 'noDomainButWillBuy', label: 'Нет, но я куплю его', description: 'Вы купите домен самостоятельно.' },
      { value: 'needHelpToBuy', label: 'Нет, нужна помощь с покупкой', description: 'Мы поможем выбрать и купить домен.' },
      { value: 'hasDomain', label: 'Да', description: 'У вас уже есть домен.' }
    ],
    required: true
  },
  {
    id: "styleExamples",
    type: "image-multiselect",
    label: "Какие стили вам нравятся?",
    description: "Выберите визуальные референсы для понимания ваших предпочтений. Это поможет нам создать уникальный дизайн для вас.",
    options: [
      {
        value: "minimal",
        image: "/images/1.webp",
      },
      {
        value: "modern",
        image: "/images/2.webp",
      },
      {
        value: "creative",
        image: "/images/3.webp",
      },
      {
        value: "corporate",
        image: "/images/4.webp",
      },
      {
        value: "elegant",
        image: "/images/5.webp",
      },
      {
        value: "travel",
        image: "/images/6.webp",
      },
      {
        value: "eco",
        image: "/images/7.webp",
      },
      {
        value: "fashion",
        image: "/images/8.webp",
      },
      {
        value: "functional",
        image: "/images/9.webp",
      },
      {
        value: "tech",
        image: "/images/10.webp",
      }
    ],
    "required": true
  },
  {
    id: 'fontFamily',
    type: 'image-multiselect',
    label: 'Какие шрифты предпочтительны?',
    description: 'Выберите шрифты или укажите свой вариант.',
    options: [
      { label: 'Arial', value: 'arial', image: '/images/fonts/arial.png' },
      { label: 'Comfortaa', value: 'comfortaa', image: '/images/fonts/comfortaa.png' },
      { label: 'Cormorant', value: 'cormorant', image: '/images/fonts/cormorant.png' },
      { label: 'Georgia', value: 'georgia', image: '/images/fonts/georgia.png' },
      { label: 'Inter', value: 'inter', image: '/images/fonts/inter.png' },
      { label: 'Manrope', value: 'manrope', image: '/images/fonts/manrope.png' },
      { label: 'Montserrat', value: 'montserrat', image: '/images/fonts/montserrat.png' },
      { label: 'Noto Sans', value: 'noto-sans', image: '/images/fonts/noto-sans.png' },
      { label: 'Open Sans', value: 'open-sans', image: '/images/fonts/open-sans.png' },
      { label: 'Oswald', value: 'oswald', image: '/images/fonts/oswald.png' },
      { label: 'Playfair Display', value: 'playfair-display', image: '/images/fonts/playfair-dsplay.png' },
      { label: 'PT Sans', value: 'pt-sans', image: '/images/fonts/pt-sans.png' },
      { label: 'Roboto', value: 'roboto', image: '/images/fonts/roboto.png' },
      { label: 'Source Code Pro', value: 'source-code-pro', image: '/images/fonts/source-code-pro.png' },
      { label: 'Ubuntu', value: 'ubuntu', image: '/images/fonts/ubuntu.png' },
      { label: 'Unbounded', value: 'unbounded', image: '/images/fonts/unbounded.png' },
      { label: 'Пришлю свой вариант', value: 'custom-font', image: '/images/fonts/custom-font.png' }
    ],
    required: true
  },
  {
    id: 'siteFunctions',
    type: 'image-multiselect',
    label: 'Необходимый функционал на сайте',
    description: 'Отметьте, какие функции нужны для вашего проекта.',
    options: [
      { label: 'Форма обратной связи', value: 'feedback-form', image: '/images/blocks/feedback.png' },
      { label: 'Слайдер', value: 'slider', image: '/images/blocks/slider.png' },
      { label: 'Фотогалерея', value: 'gallery', image: '/images/blocks/gallery.png' },
      { label: 'Фильтр товаров', value: 'filter', image: '/images/blocks/filter.png' }
    ],
    required: true
  },
  {
    id: 'colors',
    type: 'textarea',
    label: 'Какие цвета использовать? Или у вас есть брендбук?',
    description: 'Опишите предпочтения по цветам или прикрепите брендбук.',
    required: true
  },
  {
    id: 'siteMaintenance',
    type: 'radio',
    label: 'Кто будет заниматься обновлением сайта?',
    description: 'Укажите, кто будет поддерживать сайт после запуска.',
    options: [
      { label: 'Будем поддерживать сами', value: 'self' },
      { label: 'Нужна поддержка', value: 'developers' }
    ],
    required: true
  },
  {
    id: 'seoOptimization',
    type: 'radio',
    label: 'Нужна ли SEO оптимизация?',
    description: 'Определите, нужна ли базовая или полная SEO оптимизация сайта.',
    options: [
      { label: 'Да, нужна базовая SEO', value: 'basic-seo' },
      { label: 'Да, полное продвижение', value: 'full-seo' },
      { label: 'Нет', value: 'no-seo' }
    ],
    required: true
  },
  {
    id: 'siteTechnology',
    type: 'radio',
    label: 'На какой технологии вы хотите сайт?',
    description: 'Выберите предпочтительную платформу.',
    options: [
      { label: 'Tilda', value: 'tilda', description: 'Конструктор сайтов.' },
      { label: 'WordPress', value: 'wordpress', description: 'CMS для гибких решений.' },
      { label: 'Не знаю', value: 'unknown', description: 'Посоветуйтесь с нами.' }
    ],
    required: true
  },
  {
    id: 'contactInfo',
    type: 'contact-info',
    label: 'Контактные данные для сайта',
    description: 'Укажите телефон, email и другие контакты для размещения на сайте.',
    required: true
  }
];

export default briefSteps;