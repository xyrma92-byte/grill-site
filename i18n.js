// ===== Мультиязычность: RU (по умолчанию), EN, UZ (латиница), TJ, KG =====
// Перевод на лету: словарь точных строк + шаблоны. Оригинал-русский остаётся в HTML/JS.
// UZ / TJ / KG — машинный перевод, ждёт проверки носителем.
(function(){
'use strict';
const LANGS = [
  { code:'ru', html:'ru', label:'Русский' }, { code:'en', html:'en', label:'English' },
  { code:'uz', html:'uz', label:'Oʻzbekcha' }, { code:'tj', html:'tg', label:'Тоҷикӣ' }, { code:'kg', html:'ky', label:'Кыргызча' }
];
const IDX = { en:1, uz:2, tj:3, kg:4 };
// [ru, en, uz, tj, kg]
const D = [
// --- шапка, меню
['ГрильПро','GrilPro','GrilPro','ГрильПро','ГрильПро'],
['Каталог','Catalog','Katalog','Феҳрист','Каталог'],
['Подбор','Selector','Tanlash','Интихоб','Тандоо'],
['Доставка','Delivery','Yetkazib berish','Таҳвил','Жеткирүү'],
['Вопросы','FAQ','Savollar','Саволҳо','Суроолор'],
['Заявка','Request','Buyurtma','Дархост','Өтүнмө'],
['Корзина','Cart','Savat','Сабад','Себет'],
['Связь','Contact','Aloqa','Алоқа','Байланыш'],
['Закрыть','Close','Yopish','Пӯшидан','Жабуу'],
['Звонок','Call','Qoʻngʻiroq','Занг','Чалуу'],
// --- газ или электро
['Газ или электро?','Gas or electric?','Gaz yoki elektr?','Газ ё барқӣ?','Газ же электр?'],
['Сравните расходы на энергию и срок окупаемости разницы в цене. Значения по умолчанию — для Санкт-Петербурга, их можно менять.','Compare energy costs and the payback time of the price difference. Defaults are for Saint Petersburg; you can change them.','Energiya xarajatlarini va narx farqining qoplanish muddatini taqqoslang. Standart qiymatlar Sankt-Peterburg uchun, ularni oʻzgartirish mumkin.','Хароҷоти энергия ва мӯҳлати баргашти фарқи нархро муқоиса кунед. Қиматҳои пешфарз барои Санкт-Петербург, онҳоро тағйир додан мумкин аст.','Энергия чыгымдарын жана баа айырмасынын кайтуу мөөнөтүн салыштырыңыз. Демейки маанилер Санкт-Петербург үчүн, аларды өзгөртсө болот.'],
['Пара моделей','Pair of models','Modellar juftligi','Ҷуфти моделҳо','Моделдер жубу'],
['Часов работы в день','Hours of operation per day','Kuniga ish soatlari','Соатҳои кор дар як рӯз','Күнүнө иштөө саатлары'],
['Средняя загрузка, %','Average load, %','Oʻrtacha yuklama, %','Сарбории миёна, %','Орточо жүк, %'],
['Электричество, ₽/кВт·ч','Electricity, ₽/kWh','Elektr, ₽/kVt·soat','Барқ, ₽/кВт·соат','Электр, ₽/кВт·саат'],
['Пропан-бутан, ₽/кг','Propane-butane, ₽/kg','Propan-butan, ₽/kg','Пропан-бутан, ₽/кг','Пропан-бутан, ₽/кг'],
['₽ в месяц','₽ per month','oyiga ₽','₽ дар як моҳ','айына ₽'],
['Газ дешевле по энергии на','Gas is cheaper on energy by','Gaz energiya boʻyicha arzonroq:','Газ аз рӯи энергия арзонтар аст ба','Газ энергия боюнча арзан:'],
['₽ в месяц.','₽ per month.','oyiga ₽.','₽ дар як моҳ.','айына ₽.'],
['Разница в цене окупится примерно за','The price difference pays back in about','Narx farqi taxminan shuncha vaqtda qoplanadi:','Фарқи нарх тақрибан дар ин муддат бозмегардад:','Баа айырмасы болжол менен ушунча убакытта кайтат:'],
['мес.','months','oy','моҳ','ай.'],
['При этих данных электро не дороже по энергии — разница в цене газа и электро не окупается.','With these inputs electric is not more expensive on energy — the price difference does not pay back.','Ushbu maʼlumotlarda elektr energiya boʻyicha qimmat emas — narx farqi qoplanmaydi.','Бо ин маълумот барқӣ аз рӯи энергия гаронтар нест — фарқи нарх бознамегардад.','Бул маалыматтар боюнча электр энергия боюнча кымбат эмес — баа айырмасы кайтпайт.'],
['Цены грилей предварительные. Мощность газовых моделей — тепловая (расход газа), электро — потребляемая; сравнение по паспортным кВт, реальную производительность мы не измеряли.','Grill prices are preliminary. Gas models are rated by heat input (gas use), electric by power drawn; the comparison uses nameplate kW, we have not measured real output.','Grill narxlari dastlabki. Gaz modellarida quvvat issiqlik (gaz sarfi), elektrda iste’mol qilinadigan quvvat; taqqoslash pasport kVt boʻyicha, haqiqiy unumdorlikni oʻlchamaganmiz.','Нархи грилҳо пешакӣ. Иқтидори моделҳои газӣ — гармӣ (сарфи газ), барқӣ — истеъмолӣ; муқоиса аз рӯи кВт-и шиноснома, ҳосилнокии воқеиро наченкардаем.','Гриль баалары алдын ала. Газ моделдеринин кубаттуулугу — жылуулук (газ чыгымы), электрдики — керектелген; салыштыруу паспорттогу кВт боюнча, чыныгы өндүрүмдүүлүк өлчөнгөн эмес.'],
['Дешевле в эксплуатации при текущих ценах на газ и электричество','Cheaper to run at current gas and electricity prices','Joriy gaz va elektr narxlarida ekspluatatsiyada arzonroq','Бо нархҳои ҷории газ ва барқ дар истифода арзонтар','Учурдагы газ жана электр баасында пайдаланууда арзаныраак'],
['Не нужна электрическая мощность 380 В','No 380 V electrical capacity needed','380 V elektr quvvati kerak emas','Иқтидори барқии 380 В лозим нест','380 В электр кубаты керек эмес'],
['Можно работать там, где нет мощной электросети','Works where there is no powerful electrical supply','Kuchli elektr tarmogʻi boʻlmagan joyda ishlaydi','Дар ҷое, ки шабакаи барқии пурқувват нест, кор мекунад','Күчтүү электр тармагы жок жерде иштейт'],
['Нужны баллоны: хранение, заправка или обмен','Needs cylinders: storage, refilling or exchange','Ballonlar kerak: saqlash, toʻldirish yoki almashtirish','Баллон лозим: нигоҳдорӣ, пур кардан ё иваз кардан','Баллондор керек: сактоо, толтуруу же алмаштыруу'],
['Нужна вентиляция; в ТЦ, подвалах и цоколях газ часто нельзя','Needs ventilation; gas is often not allowed in malls, basements and ground floors','Ventilyatsiya kerak; savdo markazlari va yerto‘lalarda gaz koʻpincha mumkin emas','Вентилятсия лозим; дар марказҳои савдо ва таҳхонаҳо газ аксар вақт манъ аст','Желдетүү керек; соода борборлорунда жана жертөлөлөрдө газ көбүнчө мүмкүн эмес'],
['Нет баллонов и открытого пламени','No cylinders and no open flame','Ballonlar va ochiq olov yoʻq','Баллон ва оташи кушод нест','Баллон жана ачык жалын жок'],
['Подходит там, где газ запрещён: фудкорты и ТЦ','Suits places where gas is banned: food courts and malls','Gaz taqiqlangan joylarga mos: fudkortlar va savdo markazlari','Барои ҷое, ки газ манъ аст, мувофиқ: фудкортҳо ва марказҳои савдо','Газ тыюу салынган жерлерге ылайыктуу: фудкорттор жана соода борборлору'],
['Проще в обслуживании, чище','Simpler to maintain, cleaner','Xizmat koʻrsatish osonroq, toza','Хизматрасонӣ осонтар, тозатар','Тейлөө жеңилирээк, тазараак'],
['Дороже в покупке и по энергии','More expensive to buy and to run on energy','Sotib olish va energiya boʻyicha qimmatroq','Харид ва энергия аз рӯи гаронтар','Сатып алуу жана энергия боюнча кымбатыраак'],
['Нужна мощность 380 В; подключение дополнительной мощности для бизнеса может быть дорогим','Needs 380 V capacity; connecting extra capacity for a business can be expensive','380 V quvvat kerak; biznes uchun qoʻshimcha quvvatni ulash qimmat boʻlishi mumkin','Иқтидори 380 В лозим; пайвасти иқтидори иловагӣ барои тиҷорат метавонад гарон бошад','380 В кубаты керек; бизнес үчүн кошумча кубатты туташтыруу кымбат болушу мүмкүн'],
['Требования к объекту и газу уточняйте у газовой службы и проектировщика.','Check site and gas requirements with the gas service and a designer.','Obyekt va gaz talablarini gaz xizmati va loyihachidan aniqlang.','Талабот ба объект ва газро аз хадамоти газ ва лоиҳакаш пурсед.','Объект жана газ талаптарын газ кызматынан жана долбоорчудан тактаңыз.'],
['Источники:','Sources:','Manbalar:','Манбаҳо:','Булактар:'],
['тариф СПб','St Petersburg tariff','Sankt-Peterburg tarifi','тарифи Санкт-Петербург','Санкт-Петербург тарифи'],
['цена газа','gas price','gaz narxi','нархи газ','газ баасы'],
['теплота сгорания','calorific value','yonish issiqligi','гармии сӯзиш','күйүү жылуулугу'],
['техприсоединение','grid connection','texnik ulanish','пайвастшавии техникӣ','техникалык туташуу'],
// --- hero
['Грили для шаурмы и донера','Shawarma and doner grills','Shaurma va doner uchun grillar','Грилҳо барои шаурма ва донер','Шаурма жана донер үчүн гриллер'],
['Грили для шаурмы и донера — газ и электро | ГрильПро','Shawarma and doner grills — gas and electric | GrilPro','Shaurma va doner grillari — gaz va elektr | GrilPro','Грилҳои шаурма ва донер — газ ва барқ | GrilPro','Шаурма жана донер гриллери — газ жана электр | GrilPro'],
['Профессиональные вертикальные грили для шаурмы и донера: газовые и электрические. Подбор, счёт, доставка по России.','Professional vertical grills for shawarma and doner: gas and electric. Selection, invoice, delivery across Russia.','Shaurma va doner uchun professional vertikal grillar: gazli va elektr. Tanlash, hisob-faktura, Rossiya boʻylab yetkazib berish.','Грилҳои касбии амудӣ барои шаурма ва донер: газӣ ва барқӣ. Интихоб, ҳисоб, таҳвил дар саросари Русия.','Шаурма жана донер үчүн кесипкөй вертикалдуу гриллер: газ жана электр. Тандоо, эсеп, Орусия боюнча жеткирүү.'],
['Газовые и электрические. Для шаурмячной, кафе и точки у дороги.','Gas and electric. For a shawarma shop, a café or a roadside stand.','Gazli va elektr. Shaurmaxona, kafe va yoʻl chetidagi nuqta uchun.','Газӣ ва барқӣ. Барои шаурмахона, қаҳвахона ва нуқтаи канори роҳ.','Газ жана электр. Шаурмахана, кафе жана жол боюндагы чекит үчүн.'],
['Поможем выбрать, выставим счёт, отправим по России.','We will help you choose, issue an invoice and ship across Russia.','Tanlashga yordam beramiz, hisob-faktura chiqaramiz, Rossiya boʻylab joʻnatamiz.','Дар интихоб кумак мекунем, ҳисоб менависем, дар саросари Русия мефиристем.','Тандоого жардам беребиз, эсеп чыгарабыз, Орусия боюнча жөнөтөбүз.'],
['Смотреть каталог ↓','View catalog ↓','Katalogni koʻrish ↓','Феҳристро дидан ↓','Каталогду көрүү ↓'],
['Подобрать гриль','Find a grill','Grill tanlash','Гриль интихоб кардан','Гриль тандоо'],
['🔥 Газ','🔥 Gas','🔥 Gaz','🔥 Газ','🔥 Газ'],['⚡ Электро','⚡ Electric','⚡ Elektr','⚡ Барқӣ','⚡ Электр'],
['2–6 горелок','2–6 burners','2–6 ta gorelka','2–6 горелка','2–6 горелка'],
['8–10,8 кВт','8–10.8 kW','8–10,8 kVt','8–10,8 кВт','8–10,8 кВт'],
['🧾 Счёт','🧾 Invoice','🧾 Hisob-faktura','🧾 Ҳисоб','🧾 Эсеп'],
['сразу после заявки','right after your request','buyurtmadan keyin darhol','фавран пас аз дархост','өтүнмөдөн кийин дароо'],
['🚚 Доставка','🚚 Delivery','🚚 Yetkazib berish','🚚 Таҳвил','🚚 Жеткирүү'],
['по всей России','across all of Russia','butun Rossiya boʻylab','дар саросари Русия','бүтүн Орусия боюнча'],
['💬 WhatsApp','💬 WhatsApp','💬 WhatsApp','💬 WhatsApp','💬 WhatsApp'],
['📞 Позвонить','📞 Call','📞 Qoʻngʻiroq qilish','📞 Занг задан','📞 Чалуу'],
['Хиты','Best sellers','Ommabop modellar','Машҳурҳо','Хиттер'],
['Хит','Hit','Ommabop','Машҳур','Хит'],
['Газ','Gas','Gaz','Газ','Газ'],
// --- каталог/фильтры
['Тип','Type','Turi','Намуд','Түрү'],
['Все','All','Hammasi','Ҳама','Баары'],
['Горелки / секции','Burners / sections','Gorelkalar / seksiyalar','Горелкаҳо / бахшҳо','Горелкалар / секциялар'],
['Любые','Any','Istalgan','Ҳар кадом','Каалаган'],
['5–6','5–6','5–6','5–6','5–6'],
['Мощность','Power','Quvvat','Қувват','Кубаттуулук'],
['Любая','Any','Istalgan','Ҳар кадом','Каалаган'],
['до 10 кВт','up to 10 kW','10 kVt gacha','то 10 кВт','10 кВтка чейин'],
['10–15 кВт','10–15 kW','10–15 kVt','10–15 кВт','10–15 кВт'],['15–20 кВт','15–20 kW','15–20 kVt','15–20 кВт','15–20 кВт'],['20+ кВт','20+ kW','20+ kVt','20+ кВт','20+ кВт'],
['Сортировка','Sort by','Saralash','Тартиб','Иреттөө'],
['Сначала хиты','Best sellers first','Avval ommabop','Аввал машҳурҳо','Алгач хиттер'],
['Цена ↑','Price ↑','Narx ↑','Нарх ↑','Баа ↑'],['Цена ↓','Price ↓','Narx ↓','Нарх ↓','Баа ↓'],['Мощность ↓','Power ↓','Quvvat ↓','Қувват ↓','Кубаттуулук ↓'],
['Под такие условия моделей нет. Сбросьте фильтр или напишите нам — подберём.','No models match. Reset the filter or message us — we will pick one for you.','Bunday shartlarga mos model yoʻq. Filtrni tozalang yoki bizga yozing — tanlab beramiz.','Бо чунин шартҳо модел нест. Филтрро тоза кунед ё ба мо нависед — интихоб мекунем.','Мындай шарттарга model жок. Чыпканы тазалаңыз же бизге жазыңыз — тандап беребиз.'],
['Цена по запросу','Price on request','Narx soʻrov boʻyicha','Нарх аз рӯи дархост','Баасы суроо боюнча'],
['цена по запросу','price on request','narx soʻrov boʻyicha','нарх аз рӯи дархост','баасы суроо боюнча'],
['по запросу','on request','soʻrov boʻyicha','аз рӯи дархост','суроо боюнча'],
['Цена включает НДС 5%','Price includes 5% VAT','Narxga 5% QQS kiritilgan','Нарх 5% ААИ-ро дар бар мегирад','Баага 5% КНС кирет'],
['срок сообщим при заказе','lead time will be confirmed when ordering','muddatni buyurtma paytida bildiramiz','мӯҳлатро ҳангоми фармоиш хабар медиҳем','мөөнөтүн заказ учурунда билдиребиз'],
['Запросить цену','Request price','Narxni soʻrash','Нархро пурсидан','Баасын сурап алуу'],
['В заявку','Add to request','Buyurtmaga','Ба дархост','Өтүнмөгө'],
['Добавить в заявку','Add to request','Buyurtmaga qoʻshish','Ба дархост илова кардан','Өтүнмөгө кошуу'],
['Спросить в WhatsApp','Ask on WhatsApp','WhatsApp’da soʻrash','Дар WhatsApp пурсидан','WhatsApp аркылуу суроо'],
['💬 Спросить в WhatsApp','💬 Ask on WhatsApp','💬 WhatsApp’da soʻrash','💬 Дар WhatsApp пурсидан','💬 WhatsApp аркылуу суроо'],
['Количество','Quantity','Miqdor','Миқдор','Саны'],['Меньше','Less','Kamroq','Камтар','Азыраак'],['Больше','More','Koʻproq','Бештар','Көбүрөөк'],
['Гарантия','Warranty','Kafolat','Кафолат','Кепилдик'],['🛡 Гарантия','🛡 Warranty','🛡 Kafolat','🛡 Кафолат','🛡 Кепилдик'],
['уточняйте у нас','ask us','biz bilan aniqlashtiring','аз мо пурсед','бизден тактаңыз'],
['Для этой модели указан размер упаковки; размеры самого гриля уточним.','Package size is shown for this model; we will confirm the grill dimensions.','Bu model uchun qadoq oʻlchami koʻrsatilgan; grilning oʻlchamlarini aniqlashtiramiz.','Барои ин модел андозаи бастабандӣ нишон дода шудааст; андозаи худи грилро возеҳ мекунем.','Бул модель үчүн таңгактын өлчөмү көрсөтүлгөн; грилдин өлчөмүн тактап беребиз.'],
['Схематичный рисунок, не фото модели.','Schematic drawing, not a photo of the model.','Sxematik rasm, modelning surati emas.','Тасвири схематӣ, акси модел нест.','Схемалык сүрөт, моделдин сүрөтү эмес.'],
['Схематичный рисунок гриля, не фото','Schematic grill drawing, not a photo','Grilning sxematik rasmi, surat emas','Тасвири схематии гриль, акс нест','Грилдин схемалык сүрөтү, сүрөт эмес'],
['в наличии','in stock','mavjud','дастрас','бар'],['под заказ','made to order','buyurtma asosida','бо фармоиш','заказ боюнча'],
['Позиция','Item','Pozitsiya','Мавод','Позиция'],['Кол-во','Qty','Soni','Миқдор','Саны'],['Цена','Price','Narx','Нарх','Баа'],['Сумма','Amount','Summa','Маблағ','Сумма'],
['Итого:','Total:','Jami:','Ҷамъ:','Жыйынтык:'],
['Заявка пока пустая. Выберите гриль в каталоге.','Your request is empty. Choose a grill in the catalog.','Buyurtma hozircha boʻsh. Katalogdan grill tanlang.','Дархост ҳоло холӣ аст. Дар феҳрист гриль интихоб кунед.','Өтүнмө азырынча бош. Каталогдон гриль тандаңыз.'],
['К каталогу','To the catalog','Katalogga','Ба феҳрист','Каталогго'],
['Оформить заявку','Checkout','Buyurtmani rasmiylashtirish','Дархостро расмӣ кардан','Өтүнмөнү тариздөө'],['Очистить','Clear','Tozalash','Тоза кардан','Тазалоо'],
['В заявке есть позиции с ценой по запросу — пришлём предложение.','Some items are price on request — we will send you an offer.','Buyurtmada narxi soʻrov boʻyicha pozitsiyalar bor — taklif yuboramiz.','Дар дархост мавод бо нархи аз рӯи дархост ҳастанд — пешниҳод мефиристем.','Өтүнмөдө баасы суроо боюнча позициялар бар — сунуш жөнөтөбүз.'],
['Доставка в счёт не входит — рассчитаем отдельно.','Delivery is not included in the invoice — we will calculate it separately.','Yetkazib berish hisob-fakturaga kirmaydi — alohida hisoblaymiz.','Таҳвил ба ҳисоб дохил нест — алоҳида ҳисоб мекунем.','Жеткирүү эсепке кирбейт — өзүнчө эсептейбиз.'],
['Заявка пустая','Request is empty','Buyurtma boʻsh','Дархост холӣ аст','Өтүнмө бош'],
// --- подбор
['Подбор гриля','Grill selector','Grill tanlash','Интихоби гриль','Гриль тандоо'],
['Выберите гриль','Choose a grill','Grill tanlang','Гриль интихоб кунед','Гриль тандаңыз'],
['Ответьте на 3 вопроса — покажем подходящие модели. Это ориентир, точно подскажем в мессенджере.','Answer 3 questions and we will show suitable models. This is a guideline; we will advise exactly in the messenger.','3 ta savolga javob bering — mos modellarni koʻrsatamiz. Bu yoʻl-yoʻriq, aniq javobni messenjerda beramiz.','Ба 3 савол ҷавоб диҳед — моделҳои мувофиқро нишон медиҳем. Ин роҳнамо аст, дақиқашро дар мессенҷер мегӯем.','3 суроого жооп бериңиз — ылайыктуу моделдерди көрсөтөбүз. Бул багыт, так жоопту мессенджерде беребиз.'],
['1. Сколько шаурмы в день вы продаёте (или планируете)?','1. How many shawarmas per day do you sell (or plan to)?','1. Kuniga nechta shaurma sotasiz (yoki rejalashtirasiz)?','1. Дар як рӯз чандто шаурма мефурӯшед (ё ба нақша гирифтаед)?','1. Күнүнө канча шаурма сатасыз (же пландайсыз)?'],
['до 100 в день','up to 100 a day','kuniga 100 tagacha','то 100 дар як рӯз','күнүнө 100гө чейин'],
['100–250 в день','100–250 a day','kuniga 100–250','100–250 дар як рӯз','күнүнө 100–250'],
['250–400 в день','250–400 a day','kuniga 250–400','250–400 дар як рӯз','күнүнө 250–400'],
['больше 400 в день','more than 400 a day','kuniga 400 dan ortiq','зиёда аз 400 дар як рӯз','күнүнө 400дөн ашык'],
['2. Есть газ (магистраль или баллон)?','2. Do you have gas (mains or cylinder)?','2. Gaz bormi (magistral yoki ballon)?','2. Газ ҳаст (магистралӣ ё баллон)?','2. Газ барбы (магистраль же баллон)?'],
['Да, есть газ','Yes, we have gas','Ha, gaz bor','Бале, газ ҳаст','Ооба, газ бар'],['Нет газа','No gas','Gaz yoʻq','Газ нест','Газ жок'],['Не знаю','Don’t know','Bilmayman','Намедонам','Билбейм'],
['3. Есть электросеть 380 В (три фазы)?','3. Do you have 380 V mains (three-phase)?','3. 380 V elektr tarmogʻi bormi (uch fazali)?','3. Шабакаи барқи 380 В ҳаст (се фаза)?','3. 380 В электр тармагы барбы (үч фаза)?'],
['Да, 380 В','Yes, 380 V','Ha, 380 V','Бале, 380 В','Ооба, 380 В'],['Нет, только 220 В','No, only 220 V','Yoʻq, faqat 220 V','Не, танҳо 220 В','Жок, 220 В гана'],
['Показать модели','Show models','Modellarni koʻrsatish','Моделҳоро нишон диҳед','Моделдерди көрсөтүү'],
['Ответьте на все 3 вопроса','Please answer all 3 questions','Barcha 3 ta savolga javob bering','Ба ҳар 3 савол ҷавоб диҳед','3 суроонун баарына жооп бериңиз'],
['Без газа — электрический гриль.','No gas — an electric grill.','Gazsiz — elektr grill.','Бе газ — гриль барқӣ.','Газсыз — электр гриль.'],
['Мощность электрогрилей 8–10,8 кВт: напишите нам, проверим, подойдёт ли ваша сеть.','Electric grills draw 8–10.8 kW: message us and we will check whether your power supply fits.','Elektr grillar quvvati 8–10,8 kVt: bizga yozing, tarmogʻingiz mos kelishini tekshiramiz.','Қуввати грилҳои барқӣ 8–10,8 кВт: ба мо нависед, санҷем, ки шабакаи шумо мувофиқ аст ё не.','Электр гриллердин кубаттуулугу 8–10,8 кВт: бизге жазыңыз, тармагыңыз туура келеби текшеребиз.'],
['Это ориентир — точнее подскажем в мессенджере.','This is a guideline — we will advise more precisely in the messenger.','Bu yoʻl-yoʻriq — aniqrogʻini messenjerda aytamiz.','Ин роҳнамо аст — дақиқтарашро дар мессенҷер мегӯем.','Бул багыт — тагыраагын мессенджерде айтабыз.'],
['в каталоге или напишите нам — подберём.','in the catalog or message us — we will pick one.','katalogda yoki bizga yozing — tanlab beramiz.','дар феҳрист ё ба мо нависед — интихоб мекунем.','каталогдо же бизге жазыңыз — тандап беребиз.'],
['есть','yes','bor','ҳаст','бар'],['нет','no','yoʻq','нест','жок'],['не знаю','don’t know','bilmayman','намедонам','билбейм'],
// --- как купить
['Как купить','How to buy','Qanday sotib olish','Чӣ тавр харидан','Кантип сатып алуу'],
['Оставьте заявку','Submit a request','Buyurtma qoldiring','Дархост гузоред','Өтүнмө калтырыңыз'],
['Оплатите по счёту','Pay by invoice','Hisob-faktura boʻyicha toʻlang','Аз рӯи ҳисоб пардохт кунед','Эсеп боюнча төлөңүз'],
['Получите гриль','Receive your grill','Grilni qabul qiling','Грилро қабул кунед','Грилди алыңыз'],
['— счёт на оплату откроется сразу.','— the invoice will open right away.','— toʻlov hisob-fakturasi darhol ochiladi.','— ҳисоби пардохт фавран кушода мешавад.','— төлөм эсеби дароо ачылат.'],
['и пришлите чек в WhatsApp или Telegram.','and send the receipt via WhatsApp or Telegram.','va chekni WhatsApp yoki Telegram orqali yuboring.','ва чекро тавассути WhatsApp ё Telegram фиристед.','жана чекти WhatsApp же Telegram аркылуу жөнөтүңүз.'],
['— отправим транспортной компанией или заберёте сами.','— we will ship by a transport company or you can pick it up.','— transport kompaniyasi orqali joʻnatamiz yoki oʻzingiz olib ketasiz.','— тавассути ширкати нақлиётӣ мефиристем ё худатон мегиред.','— транспорт компаниясы менен жөнөтөбүз же өзүңүз алып кетесиз.'],
['Оформление заявки','Placing a request','Buyurtmani rasmiylashtirish','Тартиб додани дархост','Өтүнмөнү тариздөө'],
['Способ оплаты','Payment method','Toʻlov usuli','Усули пардохт','Төлөм ыкмасы'],
['🧾 Оплата','🧾 Payment','🧾 Toʻlov','🧾 Пардохт','🧾 Төлөм'],
['Безналичная оплата по счёту.','Cashless payment by invoice.','Hisob-faktura boʻyicha naqd pulsiz toʻlov.','Пардохти ғайринақдӣ аз рӯи ҳисоб.','Эсеп боюнча накталайсыз төлөм.'],
['По счёту на ИП, безналичный перевод. Цена на сайте уже включает НДС 5%.','By invoice from an individual entrepreneur (ИП), bank transfer. Prices on the site already include 5% VAT.','IP hisob-fakturasi boʻyicha, naqd pulsiz oʻtkazma. Saytdagi narx 5% QQS ni oʻz ichiga oladi.','Аз рӯи ҳисоби ИП, интиқоли бонкӣ. Нархҳо дар сайт аллакай 5% ААИ-ро дар бар мегиранд.','ИП эсеби боюнча, банк которуусу. Сайттагы баа 5% КНСти камтыйт.'],
['Безналичная оплата по счёту, цена уже включает НДС 5%','Cashless payment by invoice, price already includes 5% VAT','Hisob-faktura boʻyicha naqd pulsiz toʻlov, narx 5% QQS ni oʻz ichiga oladi','Пардохти ғайринақдӣ аз рӯи ҳисоб, нарх 5% ААИ-ро дар бар мегирад','Эсеп боюнча накталайсыз төлөм, баа 5% КНСти камтыйт'],
['Счёт на ИП (с НДС 5%)','Invoice from IP (with 5% VAT)','IP hisob-fakturasi (5% QQS bilan)','Ҳисоби ИП (бо 5% ААИ)','ИП эсеби (5% КНС менен)'],
['Если товар есть на складе — после счёта он','If the item is in stock, after the invoice it is','Tovar omborda boʻlsa — hisob-fakturadan keyin u','Агар мол дар анбор бошад — пас аз ҳисоб он','Товар кампада болсо — эсептен кийин ал'],
['забронирован за вами до конца следующего дня','reserved for you until the end of the next day','sizga ertasi kun oxirigacha bron qilinadi','то охири рӯзи оянда барои шумо брон мешавад','кийинки күндүн аягына чейин сиз үчүн брондолот'],
['Если в карточке срок не указан — уточните у нас перед покупкой.','If no term is shown on the card — please check with us before buying.','Kartochkada muddat koʻrsatilmagan boʻlsa — sotib olishdan oldin bizdan aniqlashtiring.','Агар дар корт мӯҳлат нишон дода нашуда бошад — пеш аз харид аз мо пурсед.','Карточкада мөөнөт көрсөтүлбөсө — сатып алганга чейин бизден тактаңыз.'],
['Доставка по России','Delivery across Russia','Rossiya boʻylab yetkazib berish','Таҳвил дар саросари Русия','Орусия боюнча жеткирүү'],
['🚚 Доставка по России','🚚 Delivery across Russia','🚚 Rossiya boʻylab yetkazib berish','🚚 Таҳвил дар саросари Русия','🚚 Орусия боюнча жеткирүү'],
['Отправляем транспортными компаниями в любой город — до терминала или до двери. Можно забрать самому со склада.','We ship by transport companies to any city — to the terminal or to your door. You can also pick it up from the warehouse.','Transport kompaniyalari orqali istalgan shaharga joʻnatamiz — terminalgacha yoki eshigingizgacha. Ombordan oʻzingiz olib ketishingiz mumkin.','Тавассути ширкатҳои нақлиётӣ ба ҳар шаҳр мефиристем — то терминал ё то дар. Аз анбор худатон гирифта метавонед.','Транспорт компаниялары аркылуу каалаган шаарга жөнөтөбүз — терминалга чейин же эшикке чейин. Кампадан өзүңүз алып кетсеңиз болот.'],
['Стоимость рассчитаем','We will calculate the cost','Narxni hisoblaymiz','Арзишро ҳисоб мекунем','Баасын эсептейбиз'],
['под ваш город и сообщим до отправки. Доставка в счёт не входит.','for your city and tell you before shipping. Delivery is not included in the invoice.','shahringiz uchun hisoblab, joʻnatishdan oldin bildiramiz. Yetkazib berish hisob-fakturaga kirmaydi.','барои шаҳри шумо ҳисоб карда, пеш аз ирсол хабар медиҳем. Таҳвил ба ҳисоб дохил нест.','шаарыңыз үчүн эсептеп, жөнөтүүдөн мурун билдиребиз. Жеткирүү эсепке кирбейт.'],
['💬 Посчитать доставку','💬 Calculate delivery','💬 Yetkazib berishni hisoblash','💬 Ҳисоби таҳвил','💬 Жеткирүүнү эсептөө'],
['Срок гарантии указан в карточке каждой модели. На модели с отметкой «Гарантия 1 год» действует гарантия 1 год.','The warranty term is shown on each model card. Models marked “Warranty 1 year” have a 1-year warranty.','Kafolat muddati har bir model kartochkasida koʻrsatilgan. «Kafolat 1 yil» belgisi bor modellarga 1 yillik kafolat beriladi.','Мӯҳлати кафолат дар корти ҳар модел нишон дода шудааст. Ба моделҳои бо қайди «Кафолат 1 сол» кафолати 1-сола дода мешавад.','Кепилдик мөөнөтү ар бир модель карточкасында көрсөтүлгөн. «Кепилдик 1 жыл» белгиси бар моделдерге 1 жылдык кепилдик берилет.'],
['Условия','Terms','Shartlar','Шартҳо','Шарттар'],
// --- FAQ
['Частые вопросы','Frequently asked questions','Koʻp beriladigan savollar','Саволҳои маъмул','Көп берилүүчү суроолор'],
['Газ или электро — что выбрать?','Gas or electric — which to choose?','Gaz yoki elektr — qaysi birini tanlash?','Газ ё барқ — кадомашро интихоб кунем?','Газбы же электрби — кайсын тандоо?'],
['Если на точке есть газ (магистраль или баллон) — обычно берут газовый гриль. Если газа нет — электрический. Не уверены — напишите нам, подскажем по вашей точке.','If your point has gas (mains or cylinder), people usually take a gas grill. If there is no gas — an electric one. Not sure? Message us and we will advise for your location.','Nuqtada gaz (magistral yoki ballon) boʻlsa — odatda gazli grill olinadi. Gaz boʻlmasa — elektr grill. Ishonchingiz komil boʻlmasa — bizga yozing, nuqtangizga qarab maslahat beramiz.','Агар дар нуқта газ бошад (магистралӣ ё баллон) — одатан гриль газӣ мегиранд. Агар газ набошад — барқӣ. Боварӣ надоред — ба мо нависед, аз рӯи нуқтаи шумо маслиҳат медиҳем.','Чекитте газ болсо (магистраль же баллон) — адатта газ гриль алышат. Газ жок болсо — электр. Ишенбесеңиз — бизге жазыңыз, чекитиңизге жараша кеңеш беребиз.'],
['Сколько горелок нужно?','How many burners do I need?','Nechta gorelka kerak?','Чандто горелка лозим?','Канча горелка керек?'],
['Чем больше продаж в день и чем больше вертел мяса, тем больше горелок. Воспользуйтесь блоком «Подобрать гриль» — покажем подходящие модели.','The more you sell per day and the bigger the meat spit, the more burners you need. Use the “Find a grill” block — we will show suitable models.','Kuniga savdo qancha koʻp va sixdagi goʻsht qancha katta boʻlsa, gorelka shuncha koʻp kerak. «Grill tanlash» blokidan foydalaning — mos modellarni koʻrsatamiz.','Ҳар қадар фурӯш дар як рӯз зиёд ва сих калонтар бошад, ҳамон қадар горелка бештар лозим. Аз блоки «Гриль интихоб кардан» истифода баред — моделҳои мувофиқро нишон медиҳем.','Күнүнө сатуу канчалык көп жана сайма канчалык чоң болсо, горелка ошончолук көп керек. «Гриль тандоо» блогун колдонуңуз — ылайыктуу моделдерди көрсөтөбүз.'],
['Как оплатить?','How do I pay?','Qanday toʻlash mumkin?','Чӣ тавр пардохт кунам?','Кантип төлөйм?'],
['По счёту на ИП, безналичным переводом. Цена на сайте уже включает НДС 5%. Счёт открывается сразу после заявки.','By invoice from an individual entrepreneur (ИП), by bank transfer. Prices on the site already include 5% VAT. The invoice opens right after your request.','IP hisob-fakturasi boʻyicha, naqd pulsiz oʻtkazma bilan. Saytdagi narx 5% QQS ni oʻz ichiga oladi. Hisob-faktura buyurtmadan keyin darhol ochiladi.','Аз рӯи ҳисоби ИП, бо интиқоли бонкӣ. Нарх дар сайт аллакай 5% ААИ-ро дар бар мегирад. Ҳисоб фавран пас аз дархост кушода мешавад.','ИП эсеби боюнча, банк которуусу менен. Сайттагы баа 5% КНСти камтыйт. Эсеп өтүнмөдөн кийин дароо ачылат.'],
['Безналичным переводом по счёту.','By bank transfer against the invoice.','Hisob-faktura boʻyicha naqd pulsiz oʻtkazma bilan.','Бо интиқоли бонкӣ аз рӯи ҳисоб.','Эсеп боюнча банк которуусу менен.'],
['Сколько стоит доставка?','How much does delivery cost?','Yetkazib berish qancha turadi?','Таҳвил чанд пул аст?','Жеткирүү канча турат?'],
['следующего дня','the next day','ertasi kun','рӯзи оянда','кийинки күн'],
['Доставка по России не входит в счёт — стоимость рассчитаем под ваш город и сообщим до отправки.','Delivery across Russia is not included in the invoice — we will calculate the cost for your city and tell you before shipping.','Rossiya boʻylab yetkazib berish hisob-fakturaga kirmaydi — shahringiz uchun narxni hisoblab, joʻnatishdan oldin bildiramiz.','Таҳвил дар саросари Русия ба ҳисоб дохил нест — арзишро барои шаҳри шумо ҳисоб карда, пеш аз ирсол хабар медиҳем.','Орусия боюнча жеткирүү эсепке кирбейт — шаарыңыз үчүн баасын эсептеп, жөнөтүүдөн мурун билдиребиз.'],
['Зависит от города и способа (до терминала транспортной компании или до двери). Рассчитаем и сообщим до отправки. Можно забрать самому.','It depends on the city and method (to a transport-company terminal or to your door). We will calculate it and tell you before shipping. You can also pick it up yourself.','Shahar va usulga bogʻliq (transport kompaniyasi terminalgacha yoki eshikkacha). Hisoblab, joʻnatishdan oldin bildiramiz. Oʻzingiz olib ketishingiz mumkin.','Аз шаҳр ва усул вобаста аст (то терминали ширкати нақлиётӣ ё то дар). Ҳисоб карда, пеш аз ирсол хабар медиҳем. Худатон гирифта метавонед.','Шаарга жана ыкмага байланыштуу (транспорт компаниясынын терминалына чейин же эшикке чейин). Эсептеп, жөнөтүүдөн мурун билдиребиз. Өзүңүз алып кетсеңиз болот.'],
['Что значит «под заказ»?','What does “made to order” mean?','«Buyurtma asosida» nimani anglatadi?','«Бо фармоиш» чӣ маъно дорад?','«Заказ боюнча» эмнени билдирет?'],
['Модели сейчас нет на складе. ','The model is not in stock right now. ','Model hozir omborda yoʻq. ','Модел ҳоло дар анбор нест. ','Модель азыр кампада жок. '],
['Срок поставки сообщим при заказе.','We will confirm the lead time when you order.','Yetkazib berish muddatini buyurtma paytida bildiramiz.','Мӯҳлати таҳвилро ҳангоми фармоиш хабар медиҳем.','Жеткирүү мөөнөтүн заказ учурунда билдиребиз.'],
['Что такое бронь?','What is a reservation?','Bron nima?','Брон чист?','Бронь деген эмне?'],
['. Не оплатили — бронь снимается.','. If unpaid, the reservation is released.','. Toʻlanmasa — bron bekor qilinadi.','. Агар пардохт нашавад — брон бекор мешавад.','. Төлөнбөсө — бронь алынат.'],
['Какая гарантия?','What is the warranty?','Kafolat qanday?','Кафолат чӣ гуна аст?','Кепилдик кандай?'],
['Срок указан в карточке модели. Где написано «Гарантия 1 год» — гарантия 1 год. Где не указано — уточните у нас до покупки.','The term is shown on the model card. Where it says “Warranty 1 year”, the warranty is 1 year. Where it is not shown, please check with us before buying.','Muddat model kartochkasida koʻrsatilgan. «Kafolat 1 yil» yozilgan joyda — 1 yil kafolat. Koʻrsatilmagan boʻlsa — sotib olishdan oldin bizdan aniqlashtiring.','Мӯҳлат дар корти модел нишон дода шудааст. Ҷое ки «Кафолат 1 сол» навишта шуда — кафолат 1 сол. Ҷое ки нишон дода нашуда — пеш аз харид аз мо пурсед.','Мөөнөтү модель карточкасында көрсөтүлгөн. «Кепилдик 1 жыл» жазылган жерде — 1 жыл кепилдик. Көрсөтүлбөсө — сатып алганга чейин бизден тактаңыз.'],
['Есть фото и видео гриля?','Are there photos and videos of the grill?','Grilning surat va videolari bormi?','Акс ва видеои гриль ҳаст?','Грилдин сүрөттөрү жана видеосу барбы?'],
['Пришлём фото модели в WhatsApp или Telegram — напишите, какая модель интересует.','We will send photos of the model via WhatsApp or Telegram — tell us which model you are interested in.','Model suratlarini WhatsApp yoki Telegram orqali yuboramiz — qaysi model qiziqtirayotganini yozing.','Аксҳои моделро тавассути WhatsApp ё Telegram мефиристем — нависед, кадом модел ба шумо даркор аст.','Модельдин сүрөттөрүн WhatsApp же Telegram аркылуу жөнөтөбүз — кайсы модель кызыктырарын жазыңыз.'],
['Можно купить несколько грилей?','Can I buy several grills?','Bir nechta grill sotib olsam boʻladimi?','Якчанд гриль харидан мумкин аст?','Бир нече гриль сатып алса болобу?'],
['Да. Укажите нужное количество в заявке. Для нескольких точек — напишите, обсудим условия.','Yes. Specify the quantity in your request. For several points — message us and we will discuss terms.','Ha. Buyurtmada kerakli miqdorni koʻrsating. Bir nechta nuqta uchun — yozing, shartlarni muhokama qilamiz.','Бале. Миқдори лозимаро дар дархост нишон диҳед. Барои якчанд нуқта — нависед, шартҳоро муҳокима мекунем.','Ооба. Өтүнмөдө керектүү санды көрсөтүңүз. Бир нече чекит үчүн — жазыңыз, шарттарды талкуулайбыз.'],
// --- контакты, подвал
['Связаться','Contact us','Bogʻlanish','Тамос гирифтан','Байланышуу'],
['Пишите или звоните — ответим простыми словами, поможем с выбором.','Write or call — we will answer in plain words and help you choose.','Yozing yoki qoʻngʻiroq qiling — oddiy soʻzlar bilan javob beramiz, tanlashga yordam beramiz.','Нависед ё занг занед — бо суханони оддӣ ҷавоб медиҳем, дар интихоб кумак мекунем.','Жазыңыз же чалыңыз — жөнөкөй сөздөр менен жооп беребиз, тандоого жардам беребиз.'],
['✉️ Почта','✉️ Email','✉️ Pochta','✉️ Почта','✉️ Почта'],
['Политика ПД','Privacy policy (RU)','Maxfiylik siyosati (RU)','Сиёсати махфият (RU)','Купуялык саясаты (RU)'],
['Согласие на обработку ПД','Consent to data processing (RU)','Ma’lumotlarni qayta ishlashga rozilik (RU)','Розигӣ ба коркарди маълумот (RU)','Маалыматтарды иштетүүгө макулдук (RU)'],
['Условия','Terms (RU)','Shartlar (RU)','Шартҳо (RU)','Шарттар (RU)'],
['Счёт и юридические документы (политика, согласие, условия) — только на русском языке.','The invoice and legal documents (policy, consent, terms) are in Russian only.','Hisob-faktura va yuridik hujjatlar (siyosat, rozilik, shartlar) faqat rus tilida.','Ҳисоб ва ҳуҷҷатҳои ҳуқуқӣ (сиёсат, розигӣ, шартҳо) танҳо ба забони русӣ.','Эсеп жана юридикалык документтер (саясат, макулдук, шарттар) орус тилинде гана.'],
// --- форма заявки
['Ваша заявка','Your request','Sizning buyurtmangiz','Дархости шумо','Сиздин өтүнмөңүз'],
['Ваши данные','Your details','Sizning maʼlumotlaringiz','Маълумоти шумо','Сиздин маалыматтарыңыз'],
['Имя *','Name *','Ism *','Ном *','Аты *'],
['Телефон (WhatsApp / Telegram) *','Phone (WhatsApp / Telegram) *','Telefon (WhatsApp / Telegram) *','Телефон (WhatsApp / Telegram) *','Телефон (WhatsApp / Telegram) *'],
['Почта (для счёта)','Email (for the invoice)','Pochta (hisob-faktura uchun)','Почта (барои ҳисоб)','Почта (эсеп үчүн)'],
['Название точки / компании','Business / company name','Nuqta / kompaniya nomi','Номи нуқта / ширкат','Чекиттин / компаниянын аты'],
['ИНН покупателя','Buyer’s tax ID (INN)','Xaridorning INN raqami','ИНН-и харидор','Сатып алуучунун ИНН'],
['Реквизиты покупателя (адрес, КПП и т.п.)','Buyer details (address, KPP, etc.)','Xaridor rekvizitlari (manzil, KPP va h.k.)','Реквизитҳои харидор (суроға, КПП ва ғ.)','Сатып алуучунун реквизиттери (дарек, КПП ж.б.)'],
['Город *','City *','Shahar *','Шаҳр *','Шаар *'],['Адрес доставки','Delivery address','Yetkazib berish manzili','Суроғаи таҳвил','Жеткирүү дареги'],
['Комментарий','Comment','Izoh','Эзоҳ','Комментарий'],
['Например: нужен гриль до конца месяца, есть баллонный газ','For example: need a grill by the end of the month, we have cylinder gas','Masalan: oy oxirigacha grill kerak, ballon gazi bor','Масалан: то охири моҳ гриль лозим, газ дар баллон ҳаст','Мисалы: айдын аягына чейин гриль керек, баллон газы бар'],
['Даю','I give','Men beraman','Ман медиҳам','Мен берем'],['согласие на обработку персональных данных','consent to personal data processing (in Russian)','shaxsiy maʼlumotlarni qayta ishlashga rozilik (rus tilida)','розигӣ ба коркарди маълумоти шахсӣ (бо забони русӣ)','жеке маалыматтарды иштетүүгө макулдук (орус тилинде)'],
['и ознакомлен(а) с','and have read the','va tanishdim:','ва бо ин шинос шудам:','жана таанышканымды билдирем:'],['Политикой','Policy (in Russian)','Siyosat (rus tilida)','Сиёсат (бо забони русӣ)','Саясат (орус тилинде)'],
['Согласен(на) с','I agree to the','Men rozi boʻlaman:','Ман рози ҳастам:','Мен макулмун:'],['условиями оплаты и доставки','payment and delivery terms (in Russian)','toʻlov va yetkazib berish shartlari (rus tilida)','шартҳои пардохт ва таҳвил (бо забони русӣ)','төлөм жана жеткирүү шарттары (орус тилинде)'],
['Отправить заявку','Submit request','Buyurtmani yuborish','Дархостро фиристодан','Өтүнмөнү жөнөтүү'],
['Отправить запрос','Send inquiry','Soʻrov yuborish','Дархост фиристодан','Суроо жөнөтүү'],
['Отправить заявку и получить счёт','Submit request and get invoice','Buyurtma yuborib, hisob-faktura olish','Дархост фиристода, ҳисоб гирифтан','Өтүнмө жөнөтүп, эсеп алуу'],
['Укажите имя','Enter your name','Ismingizni kiriting','Номро ворид кунед','Атыңызды жазыңыз'],['Укажите телефон','Enter your phone','Telefon raqamingizni kiriting','Телефонро ворид кунед','Телефонуңузду жазыңыз'],['Проверьте почту','Check your email','Pochtani tekshiring','Почтаро санҷед','Почтаны текшериңиз'],
['Укажите город доставки','Enter the delivery city','Yetkazib berish shahrini kiriting','Шаҳри таҳвилро ворид кунед','Жеткирүү шаарын жазыңыз'],['Отметьте обязательные согласия (*)','Tick the required consents (*)','Majburiy rozilik belgilarini qoʻying (*)','Розигии ҳатмиро қайд кунед (*)','Милдеттүү макулдуктарды белгилеңиз (*)'],
['Транспортная компания — до терминала','Transport company — to the terminal','Transport kompaniyasi — terminalgacha','Ширкати нақлиётӣ — то терминал','Транспорт компаниясы — терминалга чейин'],
['Транспортная компания — до двери','Transport company — to the door','Transport kompaniyasi — eshikkacha','Ширкати нақлиётӣ — то дар','Транспорт компаниясы — эшикке чейин'],
['Самовывоз со склада','Pickup from the warehouse','Ombordan olib ketish','Аз анбор гирифтан','Кампадан алып кетүү'],
['Пока не знаю — подскажите','Not sure yet — please advise','Hozircha bilmayman — maslahat bering','Ҳоло намедонам — маслиҳат диҳед','Азырынча билбейм — кеңеш бериңиз'],
['Адрес и время согласуем в мессенджере','We will agree on the address and time in the messenger','Manzil va vaqtni messenjerda kelishamiz','Суроға ва вақтро дар мессенҷер мувофиқа мекунем','Дарек жана убакытты мессенджерде макулдашабыз'],
['Заказ','Order','Buyurtma','Фармоиш','Заказ'],['Запрос цены','Price inquiry','Narx soʻrovi','Дархости нарх','Баа суроосу'],
['Заявка принята, счёт готов','Request received, invoice ready','Buyurtma qabul qilindi, hisob-faktura tayyor','Дархост қабул шуд, ҳисоб тайёр аст','Өтүнмө кабыл алынды, эсеп даяр'],['Запрос отправлен','Inquiry sent','Soʻrov yuborildi','Дархост фиристода шуд','Суроо жөнөтүлдү'],
['🧾 Открыть счёт','🧾 Open invoice (RU)','🧾 Hisob-fakturani ochish (RU)','🧾 Кушодани ҳисоб (RU)','🧾 Эсепти ачуу (RU)'],['⬇️ Скачать счёт (HTML)','⬇️ Download invoice (HTML, RU)','⬇️ Hisob-fakturani yuklab olish (HTML, RU)','⬇️ Боргирии ҳисоб (HTML, RU)','⬇️ Эсепти жүктөп алуу (HTML, RU)'],
['Цену и условия пришлём ответом на заявку. Счёт выставим после согласования.','We will reply to your request with price and terms. The invoice will be issued after agreement.','Narx va shartlarni buyurtmaga javob sifatida yuboramiz. Hisob-fakturani kelishuvdan keyin chiqaramiz.','Нарх ва шартҳоро ҳамчун ҷавоб ба дархост мефиристем. Ҳисобро пас аз мувофиқа менависем.','Баа жана шарттарды өтүнмөгө жооп катары жөнөтөбүз. Эсепти макулдашкандан кийин чыгарабыз.'],
['📞 Позвонить','📞 Call','📞 Qoʻngʻiroq qilish','📞 Занг задан','📞 Чалуу'],
['ТЭН','heating elements','TEN','ТЭН','ТЭН'],['электро','electric','elektr','барқӣ','электр'],
// --- характеристики
['газовый','gas','gazli','газӣ','газ'],['электрический','electric','elektr','барқӣ','электр'],['Горелки','Burners','Gorelkalar','Горелкаҳо','Горелкалар'],
['Нагревательные панели','Heating panels','Isitish panellari','Панелҳои гармкунӣ','Жылытуучу панелдер'],['Нагрев','Heating','Isitish','Гармкунӣ','Жылытуу'],
['Габариты (Ш×Г×В)','Dimensions (W×D×H)','Oʻlchamlar (E×Ch×B)','Андоза (Ғ×Ч×Б)','Өлчөмдөрү (Э×Т×Б)'],['Габариты аппарата (Ш×Г×В)','Unit dimensions (W×D×H)','Apparat oʻlchamlari (E×Ch×B)','Андозаи дастгоҳ (Ғ×Ч×Б)','Аппарат өлчөмдөрү (Э×Т×Б)'],
['Размер упаковки','Package size','Qadoq oʻlchami','Андозаи бастабандӣ','Таңгак өлчөмү'],['Вес','Weight','Ogʻirlik','Вазн','Салмагы'],['Вес нетто / брутто','Net / gross weight','Netto / brutto ogʻirlik','Вазни холис / бурутто','Нетто / брутто салмагы'],
['Электропитание','Power supply','Elektr taʻminoti','Таъмини барқ','Электр азыктандыруу'],['Топливо','Fuel','Yoqilgʻi','Сӯзишворӣ','Күйүүчү май'],['Питание','Power','Taʻminot','Таъмин','Азыктандыруу'],
['сжиженный газ (LPG, пропан)','liquefied gas (LPG, propane)','suyultirilgan gaz (LPG, propan)','гази моеъшуда (LPG, пропан)','суюлтулган газ (LPG, пропан)'],
['Сжиженный газ (LPG, пропан)','Liquefied gas (LPG, propane)','Suyultirilgan gaz (LPG, propan)','Гази моеъшуда (LPG, пропан)','Суюлтулган газ (LPG, пропан)'],
['220–240 В, 50 Гц (привод вертела 50 Вт)','220–240 V, 50 Hz (spit drive 50 W)','220–240 V, 50 Gts (vertel yuritmasi 50 Vt)','220–240 В, 50 Ҳз (ронандаи сих 50 Вт)','220–240 В, 50 Гц (сайма жетеги 50 Вт)'],
['220–240 В, 50 Гц','220–240 V, 50 Hz','220–240 V, 50 Gts','220–240 В, 50 Ҳз','220–240 В, 50 Гц'],['380 В, 50 Гц','380 V, 50 Hz','380 V, 50 Gts','380 В, 50 Ҳз','380 В, 50 Гц'],
['ручной вертел, без привода','manual spit, no drive','qoʻlda aylantiriladigan vertel, yuritmasiz','сихи дастӣ, бе ронанда','кол менен буралуучу сайма, жетексиз'],['200 В / 3N~380 В','200 V / 3N~380 V','200 V / 3N~380 V','200 В / 3N~380 В','200 В / 3N~380 В'],
['1 год','1 year','1 yil','1 сол','1 жыл'],
];
const MAP = new Map(D.map(r => [r[0], r]));
// ---- шаблоны [regex, en, uz, tj, kg]; $1.. — группы; ~1 — перевести группу
const P = [
[/^Модели сейчас нет на складе\. (.+)$/, 'The model is not in stock right now. ~1','Model hozir omborda yoʻq. ~1','Модел ҳоло дар анбор нест. ~1','Модель азыр кампада жок. ~1'],
[/^Если товар есть на складе, после выставления счёта он закреплён за вами до конца (.+)\. Не оплатили — бронь снимается\.$/, 'If the item is in stock, after the invoice it is reserved for you until the end of ~1. If unpaid, the reservation is released.','Tovar omborda boʻlsa, hisob-fakturadan keyin u sizga ~1 oxirigacha bron qilinadi. Toʻlanmasa — bron bekor qilinadi.','Агар мол дар анбор бошад, пас аз ҳисоб он то охири ~1 барои шумо брон мешавад. Агар пардохт нашавад — брон бекор мешавад.','Товар кампада болсо, эсептен кийин ал ~1 аягына чейин сиз үчүн брондолот. Төлөнбөсө — бронь алынат.'],
[/^— (.+)$/, '— ~1','— ~1','— ~1','— ~1'],
[/^Модель (.+)$/, 'Model $1','Model $1','Модел $1','Модель $1'],
[/^(\d+) гор\.$/, '$1 burners','$1 ta gorelka','$1 горелка','$1 горелка'],
[/^(\d+) пан\.$/, '$1 panels','$1 ta panel','$1 панел','$1 панель'],
[/^гарантия (.+)$/, 'warranty ~1','kafolat ~1','кафолат ~1','кепилдик ~1'],
[/^(\d+) год$/, '$1 year','$1 yil','$1 сол','$1 жыл'],
[/^✅ В наличии: (\d+) шт$/, '✅ In stock: $1 pcs','✅ Mavjud: $1 dona','✅ Дастрас: $1 дона','✅ Бар: $1 даана'],
[/^🕓 Под заказ · (.+)$/, '🕓 Made to order · ~1','🕓 Buyurtma asosida · ~1','🕓 Бо фармоиш · ~1','🕓 Заказ боюнча · ~1'],
[/^срок поставки (.+)$/, 'lead time $1','yetkazib berish muddati $1','мӯҳлати таҳвил $1','жеткирүү мөөнөтү $1'],
[/^Срок поставки (.+)\.$/, 'Lead time: $1.','Yetkazib berish muddati: $1.','Мӯҳлати таҳвил: $1.','Жеткирүү мөөнөтү: $1.'],
[/^Найдено моделей: (\d+) из (\d+)$/, 'Models found: $1 of $2','Topilgan modellar: $1 / $2','Моделҳои ёфтшуда: $1 аз $2','Табылган моделдер: $1 / $2'],
[/^Добавлено в заявку: (.+)$/, 'Added to request: $1','Buyurtmaga qoʻshildi: $1','Ба дархост илова шуд: $1','Өтүнмөгө кошулду: $1'],
[/^Подробнее: (.+)$/, 'Details: ~1','Batafsil: ~1','Тафсилот: ~1','Кененирээк: ~1'],
[/^(\d+) в наличии \+ (\d+) под заказ$/, '$1 in stock + $2 made to order','$1 ta mavjud + $2 ta buyurtma asosida','$1 дастрас + $2 бо фармоиш','$1 бар + $2 заказ боюнча'],
[/^Здравствуйте! Хочу купить гриль для шаурмы\.$/, 'Hello! I would like to buy a shawarma grill.','Assalomu alaykum! Shaurma grili sotib olmoqchiman.','Салом! Мехоҳам гриль барои шаурма харам.','Саламатсызбы! Шаурма үчүн гриль сатып алгым келет.'],
[/^Здравствуйте! Вопрос по грилю для шаурмы\.$/, 'Hello! I have a question about a shawarma grill.','Assalomu alaykum! Shaurma grili boʻyicha savolim bor.','Салом! Дар бораи гриль барои шаурма савол дорам.','Саламатсызбы! Шаурма грили боюнча суроом бар.'],
[/^Здравствуйте! Посчитайте доставку гриля в город: ?(.*)$/, 'Hello! Please calculate grill delivery to the city: $1','Assalomu alaykum! Grilni shaharga yetkazib berish narxini hisoblang: $1','Салом! Таҳвили грилро ба шаҳр ҳисоб кунед: $1','Саламатсызбы! Грилди шаарга жеткирүүнү эсептеңиз: $1'],
[/^Здравствуйте! Интересует (.+?)\. Пришлите фото и условия\.$/, 'Hello! I am interested in ~1. Please send photos and terms.','Assalomu alaykum! ~1 qiziqtiradi. Surat va shartlarni yuboring.','Салом! ~1 манфиатдор аст. Акс ва шартҳоро фиристед.','Саламатсызбы! ~1 кызыктырат. Сүрөт жана шарттарды жөнөтүңүз.'],
[/^Здравствуйте! Интересует (.+)\.$/, 'Hello! I am interested in ~1.','Assalomu alaykum! ~1 qiziqtiradi.','Салом! ~1 манфиатдор аст.','Саламатсызбы! ~1 кызыктырат.'],
[/^Здравствуйте! Помогите подобрать гриль\. Шаурмы в день: (.+?)\. Газ: (.+?)\. 380 В: (.+?)\.$/, 'Hello! Please help me choose a grill. Shawarmas per day: ~1. Gas: ~2. 380 V: ~3.','Assalomu alaykum! Grill tanlashga yordam bering. Kuniga shaurma: ~1. Gaz: ~2. 380 V: ~3.','Салом! Дар интихоби гриль кумак кунед. Шаурма дар як рӯз: ~1. Газ: ~2. 380 В: ~3.','Саламатсызбы! Гриль тандоого жардам бериңиз. Күнүнө шаурма: ~1. Газ: ~2. 380 В: ~3.'],
[/^(Компактный )?([Гг]азовый|[Ээ]лектрический) гриль для шаурмы( на ТЭНах)?(?:, (\d+) (?:горел\S*|панел\S*))?, ([\d,]+) кВт(, ручной поворот вертела|, с дверцей)?(?: \(([^)]+)\))?$/, '@name'],
];
const UNITS = { en:{'кВт':'kW','кг':'kg','мм':'mm','Гц':'Hz','Вт':'W','В':'V'}, uz:{'кВт':'kVt','кг':'kg','мм':'mm','Гц':'Gts','Вт':'Vt','В':'V'}, tj:{'кВт':'кВт','кг':'кг','мм':'мм','Гц':'Ҳз','Вт':'Вт','В':'В'}, kg:{} };
function nameTr(lang, m){
  const compact = m[1], elec = m[2].toLowerCase() === 'электрический', ten = m[3], n = m[4], kw = m[5], extra = m[6], model = m[7];
  const dec = lang === 'en' ? kw.replace(',', '.') : kw;
  const T = {
   en:{ gas:'gas shawarma grill', el:'electric shawarma grill', ten:' (heating elements)', comp:'Compact ', b:'burners', p:'panels', kw:'kW', ex:{', ручной поворот вертела':', manual spit rotation',', с дверцей':', with door'} },
   uz:{ gas:'gazli shaurma grili', el:'elektr shaurma grili', ten:' (TEN)', comp:'Ixcham ', b:'ta gorelka', p:'ta panel', kw:'kVt', ex:{', ручной поворот вертела':', vertelni qoʻlda aylantirish',', с дверцей':', eshikli'} },
   tj:{ gas:'гриль газӣ барои шаурма', el:'гриль барқӣ барои шаурма', ten:' (бо ТЭН)', comp:'Хурд: ', b:'горелка', p:'панел', kw:'кВт', ex:{', ручной поворот вертела':', гардиши дастии сих',', с дверцей':', бо дарча'} },
   kg:{ gas:'шаурма үчүн газ гриль', el:'шаурма үчүн электр гриль', ten:' (ТЭН менен)', comp:'Компакттуу ', b:'горелка', p:'панель', kw:'кВт', ex:{', ручной поворот вертела':', сайманы кол менен буруу',', с дверцей':', эшиги менен'} }
  }[lang];
  let base = elec ? T.el : T.gas; if (ten) base += T.ten;
  base = base.charAt(0).toUpperCase() + base.slice(1);
  if (compact && !elec) base = (lang === 'en' ? 'Compact ' + base.charAt(0).toLowerCase() + base.slice(1) : T.comp + base.charAt(0).toLowerCase() + base.slice(1));
  let s = base;
  if (n) s += ', ' + n + ' ' + (elec ? T.p : T.b);
  s += ', ' + dec + ' ' + T.kw + (extra ? T.ex[extra] : '') + (model ? ' (' + model + ')' : '');
  return s;
}
let lang = 'ru';
const cache = new Map();
function unitRule(str, lg){
  const rest = str.replace(/кВт|кг|мм|Гц|Вт|В(?![а-яА-Я])/g, '');
  if (!/^[\d\s×.,/–~-]*$/.test(rest) || !/\d/.test(str) || rest === str) return null;
  const U = UNITS[lg] || {};
  let out = str.replace(/кВт|кг|мм|Гц|Вт|В(?![а-яА-Я])/g, u => U[u] || u);
  if (lg === 'en') out = out.replace(/(\d),(\d)/g, '$1.$2');
  return out;
}
function tr(str, lg){
  lg = lg || lang; if (lg === 'ru' || !str) return str;
  const key = lg + '|' + str; if (cache.has(key)) return cache.get(key);
  let out = null; const i = IDX[lg];
  const row = MAP.get(str); if (row && row[i]) out = row[i];
  if (out == null) {
    for (const p of P) {
      const m = str.match(p[0]); if (!m) continue;
      if (p[1] === '@name') { out = nameTr(lg, m); break; }
      out = p[i].replace(/~(\d)/g, (_, k) => tr(m[+k], lg)).replace(/\$(\d)/g, (_, k) => m[+k]);
      break;
    }
  }
  if (out == null) out = unitRule(str, lg);
  if (out == null) out = str;
  cache.set(key, out); return out;
}
function trWS(raw){ const m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/); if (!m[2]) return raw; const core = m[2].replace(/\s+/g, ' '); const t = tr(core); return t === core ? raw : m[1] + t + m[3]; }
const ATTRS = ['placeholder','aria-label','title','alt','content'];
const SKIP = 'script,style,.no-i18n,#langSel';
function walk(root){
  if (root.nodeType === 3) return tnode(root);
  if (root.nodeType !== 1) return;
  if (root.matches && root.matches(SKIP)) return;
  attrs(root);
  for (const c of root.childNodes) walk(c);
}
function tnode(n){
  if (n.parentNode && n.parentNode.closest && n.parentNode.closest(SKIP)) return;
  if (n.__tr !== undefined && n.data !== n.__tr) n.__ru = n.data;       // приложение записало новый текст
  if (n.__ru === undefined) n.__ru = n.data;
  const t = lang === 'ru' ? n.__ru : trWS(n.__ru);
  if (n.data !== t) { busy = true; n.data = t; busy = false; }
  n.__tr = n.data;
}
function attrs(el){
  for (const a of ATTRS) {
    if (!el.hasAttribute || !el.hasAttribute(a)) continue;
    if (a === 'content' && !(el.name === 'description')) continue;
    const k = '__ru_' + a; const cur = el.getAttribute(a);
    if (el[k] === undefined || (el['__tr_' + a] !== undefined && cur !== el['__tr_' + a])) el[k] = cur;
    const t = lang === 'ru' ? el[k] : trWS(el[k]);
    if (cur !== t) { busy = true; el.setAttribute(a, t); busy = false; }
    el['__tr_' + a] = t;
  }
}
let busy = false;
const mo = new MutationObserver(muts => {
  if (busy) return;
  for (const m of muts) {
    if (m.type === 'characterData') tnode(m.target);
    else if (m.type === 'attributes') attrs(m.target);
    else m.addedNodes.forEach(n => walk(n));
  }
});
function apply(){
  document.documentElement.lang = LANGS.find(l => l.code === lang).html;
  document.title = lang === 'ru' ? (document.title.__ru || document.title) : document.title;
  walk(document.body);
  const ti = document.querySelector('title'); if (ti){ if (!ti.__ru) ti.__ru = ti.textContent; ti.textContent = lang === 'ru' ? ti.__ru : tr(ti.__ru); }
  const md = document.querySelector('meta[name=description]'); if (md) attrs(md);
}
function setLang(l, silent){
  if (!LANGS.some(x => x.code === l)) l = 'ru';
  lang = l; try { localStorage.setItem('grill_lang', l); } catch(e){}
  const sel = document.getElementById('langSel'); if (sel) sel.value = l;
  document.documentElement.classList.toggle('not-ru', l !== 'ru');
  apply(); if (!silent) window.dispatchEvent(new CustomEvent('i18n:change', { detail: l }));
}
function init(){
  let l = 'ru';
  const q = new URLSearchParams(location.search).get('lang');
  try { l = (q || localStorage.getItem('grill_lang') || 'ru').toLowerCase(); } catch(e){ l = (q || 'ru').toLowerCase(); }
  if (l === 'tg') l = 'tj'; if (l === 'ky') l = 'kg';
  const sel = document.getElementById('langSel');
  if (sel) { sel.innerHTML = LANGS.map(x => `<option value="${x.code}" lang="${x.html}">${x.label}</option>`).join(''); sel.addEventListener('change', () => setLang(sel.value)); }
  mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  setLang(l, true);
}
window.I18N = { tr, setLang, get lang(){ return lang; }, init, LANGS };
I18N.init();
})();
