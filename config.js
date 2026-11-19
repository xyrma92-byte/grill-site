// ===== Настройки сайта «ГрильПро» (рабочее название) — правьте здесь =====
window.SITE_CONFIG = {
  companyName: "ГрильПро",              // Бренд — рабочее название, замените одной строкой
  tagline: "Грили для шаурмы и донера",
  contactPerson: "Никита",
  phone: "8 (964) 342-69-67",
  phoneHref: "tel:+79643426967",
  email: "iptns@mail.ru",
  telegram: "https://t.me/+79643426967",
  whatsapp: "https://wa.me/79643426967", // к ссылке сайт сам добавит ?text=… с готовым сообщением
  city: "Россия",

  // ===== Цены =====
  // priceMode: "list"    — показывать цены из products.js (поле price) с учётом priceOverrides;
  //            "request" — везде «Цена по запросу», корзина отправляет запрос КП без счёта.
  priceMode: "list",
  pricesNote: "Цена включает НДС 5%",     // подпись под ценой (для ИП на УСН с НДС 5%)
  // Ручная замена цены для модели: { "ZH91": 41900 } или null — «по запросу» только для этой модели
  priceOverrides: {},

  // ===== Остатки и «под заказ» =====
  // Остаток на складе по модели, шт: { "ZH91": 3, "BGB-800": 2 }. Нет в списке / 0 → «Под заказ».
  stock: {},
  madeToOrderLead: "",                  // Срок поставки «под заказ», напр. "от 3 недель". Пусто → «срок сообщим при заказе»
  // Фото товаров: { "ZH91": "images/products/zh91.jpg?v=202611190926" }. Пока пусто → схематичные рисунки из images/placeholders/
  productPhotos: {
    "ZH91": "images/products/kitchen/zh91-t.jpg?v=202611190926",
    "BGB-800": "images/products/kitchen/bgb-800-t.jpg?v=202611190926",
    "BGB-25A": "images/products/kitchen/bgb-25a-t.jpg?v=202611190926",
    "BGB-950": "images/products/kitchen/bgb-950-t.jpg?v=202611190926",
    "ZH92M": "images/products/kitchen/zh92m-t.jpg?v=202611190926",
    "ZH90": "images/products/kitchen/zh90-t.jpg?v=202611190926",
    "BGB-1050": "images/products/kitchen/bgb-1050-t.jpg?v=202611190926",
    "ZH92": "images/products/kitchen/zh92-t.jpg?v=202611190926",
    "ZH91A": "images/products/kitchen/zh91a-t.jpg?v=202611190926",
    "BGB-1150": "images/products/kitchen/bgb-1150-t.jpg?v=202611190926",
    "ZH95": "images/products/kitchen/zh95-t.jpg?v=202611190926",
    "ZH96": "images/products/kitchen/zh96-t.jpg?v=202611190926",
    "ZH890": "images/products/kitchen/zh890-t.jpg?v=202611190926",
    "ZH891": "images/products/kitchen/zh891-t.jpg?v=202611190926",
    "ZH884": "images/products/kitchen/zh884-t.jpg?v=202611190926",
    "ZH894": "images/products/kitchen/zh894-t.jpg?v=202611190926",
    "ZH885": "images/products/kitchen/zh885-t.jpg?v=202611190926",
    "ZH895": "images/products/kitchen/zh895-t.jpg?v=202611190926",
    "BEB-808": "images/products/kitchen/beb-808-t.jpg?v=202611190926"
  },
  // Галерея в карточке товара: кухонные фото (ИИ-ретушь фото поставщика)
  productGallery: {
    "ZH91": ["images/products/kitchen/zh91.jpg?v=202611190926"],
    "BGB-800": ["images/products/kitchen/bgb-800.jpg?v=202611190926"],
    "BGB-25A": ["images/products/kitchen/bgb-25a.jpg?v=202611190926"],
    "BGB-950": ["images/products/kitchen/bgb-950.jpg?v=202611190926","images/products/bgb-950-in-action.jpg?v=202611190926"],
    "ZH92M": ["images/products/kitchen/zh92m.jpg?v=202611190926"],
    "ZH90": ["images/products/kitchen/zh90.jpg?v=202611190926"],
    "BGB-1050": ["images/products/kitchen/bgb-1050.jpg?v=202611190926"],
    "ZH92": ["images/products/kitchen/zh92.jpg?v=202611190926"],
    "ZH91A": ["images/products/kitchen/zh91a.jpg?v=202611190926"],
    "BGB-1150": ["images/products/kitchen/bgb-1150.jpg?v=202611190926"],
    "ZH95": ["images/products/kitchen/zh95.jpg?v=202611190926"],
    "ZH96": ["images/products/kitchen/zh96.jpg?v=202611190926"],
    "ZH890": ["images/products/kitchen/zh890.jpg?v=202611190926"],
    "ZH891": ["images/products/kitchen/zh891.jpg?v=202611190926"],
    "ZH884": ["images/products/kitchen/zh884.jpg?v=202611190926"],
    "ZH894": ["images/products/kitchen/zh894.jpg?v=202611190926"],
    "ZH885": ["images/products/kitchen/zh885.jpg?v=202611190926"],
    "ZH895": ["images/products/kitchen/zh895.jpg?v=202611190926"],
    "BEB-808": ["images/products/kitchen/beb-808.jpg?v=202611190926"]
  },

  // ===== Бронь =====
  reservationDays: 1,                   // бронь товара из наличия до конца следующего календарного дня
  reservationsCsvUrl: "",               // опубликованный CSV вкладки «Бронь» (необязательно)
  // URL веб-приложения Google Apps Script (tools/apps-script/Code.gs) для ЭТОГО сайта.
  // Не вставляйте сюда URL от сайта сувенирки — заявки на грили попадут в чужую таблицу.
  appsScriptUrl: "",

  // ===== Подбор гриля (ориентир, не обещание производительности) =====
  // perDay — шаурмы в день «до» значения → рекомендуемое число горелок (газ) и класс электрогриля
  picker: [
    { upTo: 100,  gasSections: [2, 3], electric: "small", label: "до 100 в день" },
    { upTo: 250,  gasSections: [3, 4], electric: "small", label: "100–250 в день" },
    { upTo: 400,  gasSections: [4, 5], electric: "big",   label: "250–400 в день" },
    { upTo: 1e9,  gasSections: [5, 6], electric: "big",   label: "больше 400 в день" }
  ],
  electricSmallMaxKw: 9,                // «small» — электрогрили до 9 кВт включительно, «big» — мощнее

  // ===== Доставка (без цифр — стоимость рассчитываем под город) =====
  shipFrom: "",                         // город склада — пусто, пока не определён
  deliveryNotice: "Доставка по России не входит в счёт — стоимость рассчитаем под ваш город и сообщим до отправки.",
  deliveryServices: [
    { id: "tk_terminal", name: "Транспортная компания — до терминала", short: "ТК (терминал)", kind: "city" },
    { id: "tk_door",     name: "Транспортная компания — до двери",     short: "ТК (до двери)", kind: "courier" },
    { id: "pickup",      name: "Самовывоз со склада",                  short: "Самовывоз",     kind: "pickup", hint: "Адрес и время согласуем в мессенджере" },
    { id: "ask",         name: "Пока не знаю — подскажите",             short: "Подобрать доставку", kind: "city" }
  ],

  // ===== Документы (152-ФЗ) =====
  legalDocs: { privacy: "privacy.html", consent: "consent.html", terms: "terms.html", version: "2026-11-19" },

  // ===== Способы оплаты =====
  // enabled — показывать ли способ на сайте. Сейчас включён только ИП (решение по ООО и карте — за Никитой).
  // vatMode: "included" — цены сайта уже включают НДС, в счёте строка «в т.ч. НДС X%» = сумма × X/(100+X);
  //          "added"    — НДС начисляется сверху; "none" — «Без НДС».
  // markupRate — надбавка к стоимости товаров (0 — без надбавки).
  paymentMethods: {
    ip: {
      id: 'ip', enabled: true,
      label: 'Счёт на ИП (с НДС 5%)',
      hint: 'Безналичная оплата по счёту, цена уже включает НДС 5%',
      legalName: 'Индивидуальный предприниматель Таран Никита Сергеевич',
      shortName: 'ИП Таран Никита Сергеевич',
      signer: 'Таран Н. С.',
      inn: '780731585813',
      ogrnip: '318784700302999',
      account: '40802810232410011237',
      bank: 'ФИЛИАЛ «САНКТ-ПЕТЕРБУРГСКИЙ» АО «АЛЬФА-Банк»',
      bik: '044030786',
      corrAccount: '30101810600000000786',
      address: '198328, г. САНКТ-ПЕТЕРБУРГ, ул. Доблести, дом 17, корп. 2, кв. 45',
      phone: '8(964)342-69-67',
      vatMode: 'included', vatRate: 0.05,
      markupRate: 0
    },
    ooo: {
      id: 'ooo', enabled: false,          // Никита решит: включать ли и как считать НДС 22%
      label: 'Счёт на ООО (с НДС 22%)',
      hint: 'Безналичная оплата по счёту ООО',
      legalName: 'ООО «ВОЛОТЭК»',
      fullName: 'Общество с ограниченной ответственностью «ВОЛОТЭК»',
      inn: '7817143560',
      kpp: '781701001',
      account: '40702810917540000182',
      bank: 'АО "АЛЬФА-БАНК"',
      bankCity: 'г. Санкт-Петербург',
      bik: '044525593',
      corrAccount: '30101810200000000593',
      address: '196620, г. Санкт-Петербург, улица Берёзовая, д. 25, корп./ст. ЛИТЕРА А, кв./оф. ПОМЕЩ. 2-Н ОФИС 13',
      vatMode: 'added', vatRate: 0.22,
      markupRate: 0
    },
    card: {
      id: 'card', enabled: false,         // Никита решит: принимать ли оплату на карту физлица
      label: 'Перевод на карту',
      hint: 'Перевод по реквизитам',
      legalName: 'Таран Никита Сергеевич',
      account: '40817810207990152311',
      bank: 'АО «Альфа-Банк», г. Москва',
      bik: '044525593',
      bankInn: '7728168971',
      bankKpp: '770801001',
      corrAccount: '30101810200000000593',
      vatMode: 'none', vatRate: 0,
      markupRate: 0
    }
  }
};
