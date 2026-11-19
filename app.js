'use strict';
// ===== ГрильПро — каталог грилей, корзина-заявка, счёт, бронь =====
const CFG = window.SITE_CONFIG;
const PRODUCTS = window.PRODUCTS || [];
const BY_ID = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const PM_ALL = CFG.paymentMethods || {};
const PM = Object.fromEntries(Object.entries(PM_ALL).filter(([, m]) => m.enabled));
const LS_CART = 'grill_cart_v1', LS_RES = 'grill_reservations_v1', LS_INVSEQ = 'grill_invseq_v1', LS_ORDERS = 'grill_orders_v1';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num = n => Number(n || 0).toLocaleString('ru-RU');
const money = n => num(Math.round(n)) + ' ₽';
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch(e){ return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const round2 = n => Math.round(n * 100) / 100;

// ---------- цены, наличие, фото ----------
function priceOf(p){
  if (CFG.priceMode === 'request') return null;
  const o = CFG.priceOverrides || {};
  if (Object.prototype.hasOwnProperty.call(o, p.model)) return o[p.model] == null ? null : Number(o[p.model]);
  return p.price ?? null;
}
const priceText = p => priceOf(p) == null ? 'Цена по запросу' : money(priceOf(p));
const leadText = () => CFG.madeToOrderLead ? `срок поставки ${CFG.madeToOrderLead}` : 'срок сообщим при заказе';
function activeReservations(){
  const now = Date.now();
  const all = [...(window.RESERVATIONS || []), ...load(LS_RES, [])];
  return all.filter(r => r && !r.released && new Date(r.expiresAt).getTime() > now);
}
function reservedQty(model){ return activeReservations().filter(r => r.model === model).reduce((a, r) => a + (Number(r.qty) || 0), 0); }
function available(p){ const s = Number((CFG.stock || {})[p.model]) || 0; return Math.max(0, s - reservedQty(p.model)); }
function stockBadge(p){
  const a = available(p);
  return a > 0 ? `<span class="stock in">✅ В наличии: ${num(a)} шт</span>` : `<span class="stock order">🕓 Под заказ · ${esc(leadText())}</span>`;
}
function bigSrc(p){ const g = (CFG.productGallery || {})[p.model]; return (g && g[0]) || imgSrc(p); }
function imgSrc(p){ return (CFG.productPhotos || {})[p.model] || p.placeholder; }
const isPhoto = p => !!(CFG.productPhotos || {})[p.model];
function sectionsText(p){
  if (p.fuel === 'gas') return `${p.sections} гор.`;
  if (p.heater === 'панели') return `${p.sections} пан.`;
  if (p.heater === 'ТЭН') return 'ТЭН';
  return 'электро';
}

// ---------- контакты ----------
function waLink(text){ return waLink0(window.I18N ? I18N.tr(text) : text); }
const waLink0 = text => CFG.whatsapp + (text ? (CFG.whatsapp.includes('?') ? '&' : '?') + 'text=' + encodeURIComponent(text) : '');
function bindContacts(root = document){
  $$('[data-brand]', root).forEach(e => e.textContent = CFG.companyName);
  $$('[data-phone]', root).forEach(e => e.textContent = CFG.phone);
  $$('[data-phone-link]', root).forEach(e => e.href = CFG.phoneHref || ('tel:' + CFG.phone.replace(/[^\d+]/g, '')));
  $$('[data-tg]', root).forEach(e => e.href = CFG.telegram);
  $$('[data-wa]', root).forEach(e => e.href = waLink(e.dataset.wa));
  $$('[data-mail]', root).forEach(e => e.href = 'mailto:' + CFG.email);
  const ip = PM_ALL.ip;
  $$('[data-seller]', root).forEach(e => e.textContent = ip ? `${ip.legalName} · ИНН ${ip.inn}${ip.ogrnip ? ', ОГРНИП ' + ip.ogrnip : ''} · ${CFG.email} · ${CFG.phone}` : '');
}

// ---------- карточки ----------
function cardHTML(p){
  return `<article class="card" data-id="${p.id}">
    <button class="card-img${isPhoto(p) ? '' : ' ph'}" type="button" data-open="${p.id}" aria-label="Подробнее: ${esc(p.name)}">
      <img src="${esc(imgSrc(p))}" alt="${esc(isPhoto(p) ? p.name : 'Схематичный рисунок гриля, не фото')}" loading="lazy" width="600" height="800">
      ${p.hit ? '<span class="badge hit">Хит</span>' : ''}
      <span class="badge fuel ${p.fuel}">${p.fuel === 'gas' ? '🔥 Газ' : '⚡ Электро'}</span>
    </button>
    <div class="card-body">
      <h3><button type="button" class="linklike" data-open="${p.id}">${esc(p.shortName)}</button></h3>
      <div class="model">Модель ${esc(p.model)}</div>
      <ul class="facts"><li>${sectionsText(p)}</li><li>${esc(String(p.powerKw).replace('.', ','))} кВт</li>${p.warranty ? `<li>гарантия ${esc(p.warranty)}</li>` : ''}</ul>
      ${stockBadge(p)}
      <div class="price">${priceText(p)}</div>
      ${priceOf(p) != null && CFG.pricesNote ? `<div class="muted small">${esc(CFG.pricesNote)}</div>` : ''}
      <div class="card-actions">
        <button class="btn primary" type="button" data-add="${p.id}">${priceOf(p) == null ? 'Запросить цену' : 'В заявку'}</button>
        <a class="btn wa icon" href="${esc(waLink(`Здравствуйте! Интересует ${p.name}.`))}" target="_blank" rel="noopener" aria-label="Спросить в WhatsApp">💬</a>
      </div>
    </div>
  </article>`;
}
function renderHits(){ $('#hitsGrid').innerHTML = PRODUCTS.filter(p => p.hit).map(cardHTML).join(''); }

const F = { fuel: '', sec: '', kw: '' };
function filtered(){
  let list = PRODUCTS.filter(p => {
    if (F.fuel && p.fuel !== F.fuel) return false;
    if (F.sec){ const s = Number(F.sec); if (!p.sections) return false; if (s === 5 ? p.sections < 5 : p.sections !== s) return false; }
    if (F.kw){ const [a, b] = F.kw.split('-').map(Number); if (!(p.powerKw > a && p.powerKw <= b)) return false; }
    return true;
  });
  const s = $('#sortSel').value, pr = p => priceOf(p) ?? Infinity;
  if (s === 'priceAsc') list.sort((a, b) => pr(a) - pr(b));
  else if (s === 'priceDesc') list.sort((a, b) => (priceOf(b) ?? -1) - (priceOf(a) ?? -1));
  else if (s === 'kw') list.sort((a, b) => b.powerKw - a.powerKw);
  return list;
}
function renderCatalog(){
  const list = filtered();
  $('#catalogGrid').innerHTML = list.length ? list.map(cardHTML).join('') : '<p class="empty">Под такие условия моделей нет. Сбросьте фильтр или напишите нам — подберём.</p>';
  $('#foundInfo').textContent = `Найдено моделей: ${list.length} из ${PRODUCTS.length}`;
}
function bindFilters(){
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    F[b.dataset.f] = b.dataset.v;
    $$(`.chip[data-f="${b.dataset.f}"]`).forEach(c => c.classList.toggle('on', c === b));
    renderCatalog();
  });
  $('#sortSel').addEventListener('change', renderCatalog);
}

// ---------- карточка товара ----------
function openProduct(id){
  const p = BY_ID[id]; if (!p) return;
  const specs = p.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('') +
    `<tr><th>Гарантия</th><td>${p.warranty ? esc(p.warranty) : 'уточняйте у нас'}</td></tr>`;
  $('#productBody').innerHTML = `<div class="pm">
    <div class="pm-img"><img src="${esc(bigSrc(p))}" alt="${esc(isPhoto(p) ? p.name : 'Схематичный рисунок гриля, не фото')}" width="320" height="360">
      ${isPhoto(p) ? '' : '<p class="muted small">Схематичный рисунок, не фото модели.</p>'}
      ${((CFG.productGallery||{})[p.model]||[]).slice(1).map(u=>`<img class="pm-extra" src="${esc(u)}" alt="${esc(p.name)}" loading="lazy">`).join('')}</div>
    <div class="pm-info">
      ${p.hit ? '<span class="badge hit static">Хит</span>' : ''}
      <h2 id="pmTitle">${esc(p.name)}</h2>
      ${stockBadge(p)}
      <div class="price big">${priceText(p)}</div>
      ${priceOf(p) != null && CFG.pricesNote ? `<div class="muted small">${esc(CFG.pricesNote)}</div>` : ''}
      <table class="specs">${specs}</table>
      ${p.dimsKind === 'package' ? '<p class="muted small">Для этой модели указан размер упаковки; размеры самого гриля уточним.</p>' : ''}
      <div class="qty-row"><span>Количество</span><div class="qty"><button type="button" data-q="-1" aria-label="Меньше">−</button><input id="pmQty" type="number" min="1" value="1" inputmode="numeric" aria-label="Количество"><button type="button" data-q="1" aria-label="Больше">+</button></div></div>
      <div class="cta-row">
        <button class="btn big primary" type="button" id="pmAdd">${priceOf(p) == null ? 'Запросить цену' : 'Добавить в заявку'}</button>
        <a class="btn big wa" href="${esc(waLink(`Здравствуйте! Интересует ${p.name}. Пришлите фото и условия.`))}" target="_blank" rel="noopener">💬 Спросить в WhatsApp</a>
      </div>
    </div></div>`;
  const q = $('#pmQty');
  $$('[data-q]', $('#productBody')).forEach(b => b.onclick = () => { q.value = Math.max(1, (Number(q.value) || 1) + Number(b.dataset.q)); });
  $('#pmAdd').onclick = () => { addToCart(p.id, Math.max(1, Math.round(Number(q.value) || 1))); closeModal('productModal'); };
  openModal('productModal');
}

// ---------- модалки, тост ----------
function openModal(id){ const m = $('#' + id); m.hidden = false; document.body.classList.add('noscroll'); const x = $('.modal-x', m); if (x) x.focus(); }
function closeModal(id){ $('#' + id).hidden = true; if (!$$('.modal').some(m => !m.hidden)) document.body.classList.remove('noscroll'); }
function toast(t){ const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2200); }

// ---------- корзина ----------
let cart = load(LS_CART, {});
function cleanCart(){ for (const id of Object.keys(cart)) if (!BY_ID[id] || !(cart[id] > 0)) delete cart[id]; }
function addToCart(id, q = 1){ cart[id] = (cart[id] || 0) + q; save(LS_CART, cart); refreshCart(); toast('Добавлено в заявку: ' + BY_ID[id].model); }
function setQty(id, q){ if (q <= 0) delete cart[id]; else cart[id] = q; save(LS_CART, cart); refreshCart(); renderCartBody(); }
function calc(pmId){
  const lines = Object.entries(cart).map(([id, qty]) => {
    const p = BY_ID[id], unit = priceOf(p), a = available(p), inStock = Math.min(a, qty);
    return { p, qty, unitPrice: unit, sum: unit == null ? null : unit * qty, inStockQty: inStock, madeToOrderQty: qty - inStock };
  });
  const priced = lines.every(l => l.unitPrice != null) && lines.length > 0;
  const total = lines.reduce((a, l) => a + (l.sum || 0), 0);
  const pm = PM[pmId] || null;
  let markup = 0, vat = 0, grand = total;
  if (pm){
    markup = round2(total * (pm.markupRate || 0));
    const base = total + markup;
    if (pm.vatMode === 'included'){ vat = round2(base * pm.vatRate / (1 + pm.vatRate)); grand = base; }
    else if (pm.vatMode === 'added'){ vat = round2(base * pm.vatRate); grand = round2(base + vat); }
    else grand = base;
  }
  return { lines, priced, total, markup, vat, grand, pm, qty: lines.reduce((a, l) => a + l.qty, 0) };
}
function refreshCart(){
  cleanCart();
  const n = Object.values(cart).reduce((a, b) => a + b, 0);
  $('#cartCount').textContent = n; $('#cartCountMobile').textContent = n;
  $('#cartBtn').classList.toggle('has', n > 0);
}
function renderCartBody(){
  const c = calc('');
  if (!c.lines.length){ $('#cartBody').innerHTML = '<p>Заявка пока пустая. Выберите гриль в каталоге.</p><a class="btn primary" href="#catalog" data-close-go>К каталогу</a>'; return; }
  $('#cartBody').innerHTML = `<ul class="cart-list">${c.lines.map(l => `<li>
      <img src="${esc(imgSrc(l.p))}" alt="" width="64" height="72">
      <div class="cl-info"><b>${esc(l.p.name)}</b><div class="muted small">${l.madeToOrderQty ? (l.inStockQty ? `${l.inStockQty} в наличии + ${l.madeToOrderQty} под заказ` : 'под заказ') : 'в наличии'}</div>
        <div class="cl-price">${l.unitPrice == null ? 'цена по запросу' : money(l.unitPrice) + ' × ' + l.qty + ' = <b>' + money(l.sum) + '</b>'}</div></div>
      <div class="qty"><button type="button" data-cq="${l.p.id}" data-d="-1" aria-label="Меньше">−</button><span>${l.qty}</span><button type="button" data-cq="${l.p.id}" data-d="1" aria-label="Больше">+</button></div>
    </li>`).join('')}</ul>
    <div class="cart-total">${c.priced ? `Итого: <b>${money(c.total)}</b>${CFG.pricesNote ? ` <span class="muted small">· ${esc(CFG.pricesNote)}</span>` : ''}` : 'В заявке есть позиции с ценой по запросу — пришлём предложение.'}</div>
    <div class="cta-row"><button class="btn big primary" type="button" id="toCheckout">Оформить заявку</button><button class="btn ghost" type="button" id="clearCart">Очистить</button></div>`;
  $('#toCheckout').onclick = () => { closeModal('cartModal'); openCheckout(); };
  $('#clearCart').onclick = () => { cart = {}; save(LS_CART, cart); refreshCart(); renderCartBody(); };
}

// ---------- оформление ----------
const selectedPm = () => { const i = $('#orderForm input[name=payment]:checked'); return i ? i.value : ''; };
const selectedDlv = () => { const i = $('#orderForm input[name=delivery]:checked'); return i ? CFG.deliveryServices.find(d => d.id === i.value) : null; };
function renderPaymentOptions(){
  const ms = Object.values(PM);
  $('#payOptions').innerHTML = ms.map((m, i) => `<label class="opt pay"><input type="radio" name="payment" value="${m.id}" ${i === 0 ? 'checked' : ''}> <span><b>${esc(m.label)}</b><br><span class="muted small">${esc(m.hint || '')}</span></span></label>`).join('');
}
function renderDeliveryOptions(){
  $('#dlvOptions').innerHTML = CFG.deliveryServices.map((d, i) => `<label class="opt"><input type="radio" name="delivery" value="${d.id}" ${i === 0 ? 'checked' : ''}> ${esc(d.name)}${d.hint ? `<span class="muted small"> — ${esc(d.hint)}</span>` : ''}</label>`).join('') +
    `<p class="muted small">${esc(CFG.deliveryNotice)}</p>`;
}
function updateDeliveryFields(){
  const d = selectedDlv() || {};
  $('#dlvCityL').hidden = d.kind === 'pickup';
  $('#dlvAddrL').hidden = d.kind !== 'courier';
}
function isRequestOnly(c){ return !c.priced || !Object.keys(PM).length; }
function renderCheckoutSummary(){
  const c = calc(selectedPm()), req = isRequestOnly(c);
  $('#coSummary').innerHTML = `<div class="sum-scroll"><table class="sum-table"><thead><tr><th>Позиция</th><th class="r">Кол-во</th><th class="r">Цена</th><th class="r">Сумма</th></tr></thead><tbody>${c.lines.map(l => `<tr><td>${esc(l.p.name)}<br><span class="muted small">${l.madeToOrderQty ? (l.inStockQty ? `${l.inStockQty} в наличии + ${l.madeToOrderQty} под заказ` : 'под заказ, ' + esc(leadText())) : 'в наличии'}</span></td><td class="r">${l.qty}</td><td class="r">${l.unitPrice == null ? 'по запросу' : money(l.unitPrice)}</td><td class="r">${l.sum == null ? '—' : money(l.sum)}</td></tr>`).join('')}</tbody></table></div>`;
  $('#payBlock').hidden = req;
  const pm = c.pm;
  $('#buyerReq').hidden = req || !pm || pm.id === 'card';
  let t = '';
  if (req) t = 'Цену и условия пришлём ответом на заявку. Счёт выставим после согласования.';
  else {
    t = `Итого к оплате: <b>${money(c.grand)}</b>`;
    if (pm.vatMode === 'included') t += ` <span class="muted">(в т.ч. НДС ${Math.round(pm.vatRate * 100)}% — ${c.vat.toLocaleString('ru-RU', {minimumFractionDigits: 2})} ₽)</span>`;
    if (pm.vatMode === 'added') t += ` <span class="muted">(товары ${money(c.total)} + НДС ${Math.round(pm.vatRate * 100)}% ${money(c.vat)})</span>`;
    t += '<br><span class="muted small">Доставка в счёт не входит — рассчитаем отдельно.</span>';
  }
  $('#coTotal').innerHTML = t;
  $('#orderSubmit').textContent = req ? 'Отправить запрос' : 'Отправить заявку и получить счёт';
}
function openCheckout(){
  if (!Object.keys(cart).length){ toast('Заявка пустая'); return; }
  renderCheckoutSummary(); updateDeliveryFields(); $('#orderErr').textContent = '';
  openModal('checkoutModal');
}
function newId(prefix){
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `${prefix}-${d.getFullYear() % 100}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}
function reservationUntil(from = new Date()){ const d = new Date(from); d.setDate(d.getDate() + (CFG.reservationDays || 1)); d.setHours(23, 59, 59, 0); return d; }
function nextInvoiceNo(d = new Date()){
  const p = n => String(n).padStart(2, '0'), day = `${p(d.getDate())}${p(d.getMonth() + 1)}${d.getFullYear() % 100}`;
  const st = load(LS_INVSEQ, {}); const n = (st.day === day ? st.n : 0) + 1; save(LS_INVSEQ, {day, n});
  return `${day}-${String(n).padStart(3, '0')}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;
}
function validate(f){
  const errs = [];
  if (!f.elements.name.value.trim()) errs.push('Укажите имя');
  if (f.elements.phone.value.replace(/\D/g, '').length < 10) errs.push('Укажите телефон');
  const em = f.elements.email.value.trim(); if (em && !/^\S+@\S+\.\S+$/.test(em)) errs.push('Проверьте почту');
  const d = selectedDlv(); if (d && d.kind !== 'pickup' && !f.elements.dlvCity.value.trim()) errs.push('Укажите город доставки');
  if (!$$('[data-consent]', f).every(c => c.checked)) errs.push('Отметьте обязательные согласия (*)');
  return errs;
}
function buildOrder(f){
  const c = calc(selectedPm()), req = isRequestOnly(c), now = new Date(), d = selectedDlv() || {};
  const o = {
    id: newId(req ? 'RQ' : 'GR'), type: req ? 'request' : 'catalog', typeName: req ? 'Запрос цены' : 'Заказ', modeName: req ? 'Запрос' : 'Каталог',
    createdAt: now.toISOString(),
    contact: { name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), email: f.elements.email.value.trim(), company: f.elements.company.value.trim(),
      inn: req ? '' : f.elements.inn.value.trim(), requisites: req ? '' : f.elements.requisites.value.trim(), city: f.elements.dlvCity.value.trim() },
    comment: f.elements.comment.value.trim(),
    delivery: { id: d.id, kind: d.kind, service: d.name, city: d.kind === 'pickup' ? '' : f.elements.dlvCity.value.trim(), address: d.kind === 'courier' ? f.elements.dlvAddress.value.trim() : '', payer: 'стоимость рассчитаем отдельно' },
    consents: { pd: true, terms: true, at: now.toISOString(), version: CFG.legalDocs.version },
    items: c.lines.map(l => ({ id: l.p.id, model: l.p.model, name: l.p.name, category: 'grills', categoryName: l.p.fuel === 'gas' ? 'газовый гриль' : 'электрический гриль', unit: 'шт',
      qty: l.qty, unitPrice: l.unitPrice, sum: l.sum, inStockQty: l.inStockQty, madeToOrderQty: l.madeToOrderQty,
      availability: l.madeToOrderQty ? (l.inStockQty ? 'частично в наличии' : 'под заказ') : 'в наличии' })),
    totals: { total: c.total, markup: c.markup, markupRate: c.pm ? c.pm.markupRate || 0 : 0, vat: c.vat, vatRate: c.pm ? c.pm.vatRate : 0, vatMode: c.pm ? c.pm.vatMode : '', grand: c.grand }
  };
  if (!req){
    const pm = c.pm;
    o.payment = { id: pm.id, label: pm.label, legalName: pm.shortName || pm.legalName };
    const until = reservationUntil(now);
    o.invoice = { number: nextInvoiceNo(now), date: now.toISOString(), payUntil: until.toISOString() };
    o.reservation = { expiresAt: until.toISOString(), lines: c.lines.filter(l => l.inStockQty > 0).map(l => ({ model: l.p.model, productId: l.p.id, productName: l.p.name, category: 'grills', qty: l.inStockQty })) };
  }
  return o;
}
function reserve(o){
  if (!o.reservation || !o.reservation.lines.length) return;
  const list = load(LS_RES, []);
  o.reservation.lines.forEach(l => list.push({ model: l.model, qty: l.qty, expiresAt: o.reservation.expiresAt, invoice: o.invoice.number, order: o.id }));
  save(LS_RES, list);
}
function pushToSheet(o){
  if (!CFG.appsScriptUrl) return;
  let body = '';
  try { body = JSON.stringify({ action: 'order', order: { ...o, customerComment: o.comment || '' }, invoiceHtml: o.invoice ? invoiceHTML(o) : '' }); }
  catch(e){ console.warn('Apps Script payload', e); return; }
  try { fetch(CFG.appsScriptUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body }).catch(err => console.warn('Apps Script fetch', err)); }
  catch(e){ console.warn('Apps Script fetch', e); }
}
function orderText(o){
  const lines = o.items.map((i, n) => `${n + 1}. ${i.name} — ${i.qty} шт${i.sum != null ? ' × ' + money(i.unitPrice) + ' = ' + money(i.sum) : ' (цена по запросу)'} — ${i.availability}`);
  return [`${o.typeName} № ${o.id}`, o.invoice ? `Счёт № ${o.invoice.number}, к оплате ${money(o.totals.grand)}` : '', ...lines,
    `Имя: ${o.contact.name}, тел.: ${o.contact.phone}${o.contact.company ? ', ' + o.contact.company : ''}`,
    `Доставка: ${o.delivery.service}${o.delivery.city ? ', ' + o.delivery.city : ''}${o.delivery.address ? ', ' + o.delivery.address : ''}`,
    o.comment ? 'Комментарий: ' + o.comment : ''].filter(Boolean).join('\n');
}
function bindOrderForm(){
  const f = $('#orderForm');
  renderPaymentOptions(); renderDeliveryOptions();
  f.addEventListener('change', e => {
    if (e.target.name === 'payment') renderCheckoutSummary();
    if (e.target.name === 'delivery') updateDeliveryFields();
  });
  f.addEventListener('submit', e => {
    e.preventDefault();
    const errs = validate(f);
    $('#orderErr').innerHTML = errs.map(esc).join('<br>');
    if (errs.length) return;
    const o = buildOrder(f);
    reserve(o); pushToSheet(o);
    const hist = load(LS_ORDERS, []); hist.unshift({ id: o.id, at: o.createdAt, invoice: o.invoice ? o.invoice.number : '', grand: o.totals.grand }); save(LS_ORDERS, hist.slice(0, 30));
    window.__lastOrder = o;
    const txt = orderText(o);
    let invWin = null;
    if (o.invoice) invWin = openInvoice(o);
    closeModal('checkoutModal');
    $('#doneBody').innerHTML = `<h2>${o.invoice ? 'Заявка принята, счёт готов' : 'Запрос отправлен'}</h2>
      <p>${o.typeName} <b>№ ${esc(o.id)}</b>${o.invoice ? `, счёт <b>№ ${esc(o.invoice.number)}</b> на <b>${money(o.totals.grand)}</b>` : ''}.</p>
      ${o.invoice ? `<p>${o.reservation.lines.length ? `Товар из наличия забронирован до ${new Date(o.reservation.expiresAt).toLocaleString('ru-RU', {day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'})}. ` : ''}Позиции «под заказ»: ${esc(leadText())}.</p>` : ''}
      <p><b>Чтобы мы точно увидели заявку — отправьте её в мессенджер:</b></p>
      <div class="cta-row">
        <a class="btn big wa" href="${esc(waLink(txt))}" target="_blank" rel="noopener">💬 Отправить в WhatsApp</a>
        <a class="btn big tg" href="${esc(CFG.telegram)}" target="_blank" rel="noopener" id="tgCopy">✈️ Telegram (текст скопируем)</a>
        <a class="btn big ghost" href="mailto:${esc(CFG.email)}?subject=${encodeURIComponent(o.typeName + ' ' + o.id)}&body=${encodeURIComponent(txt)}">✉️ Письмом</a>
      </div>
      ${o.invoice ? `<div class="cta-row"><button class="btn primary" type="button" id="reopenInv">🧾 Открыть счёт</button><button class="btn ghost" type="button" id="dlInv">⬇️ Скачать счёт (HTML)</button></div>
      ${invWin ? '' : '<p class="muted small">Браузер не дал открыть счёт в новой вкладке — нажмите «Открыть счёт».</p>'}` : ''}`;
    if (o.invoice){
      $('#reopenInv').onclick = () => { if (!openInvoice(o)) download(`Счёт_${o.invoice.number}.html`, invoiceHTML(o), 'text/html'); };
      $('#dlInv').onclick = () => download(`Счёт_${o.invoice.number}.html`, invoiceHTML(o), 'text/html');
    }
    $('#tgCopy').addEventListener('click', () => { try { navigator.clipboard && navigator.clipboard.writeText(txt).catch(() => {}); } catch(e){} });
    cart = {}; save(LS_CART, cart); refreshCart(); renderCatalog(); renderHits();
    openModal('doneModal');
  });
}

// ---------- счёт ----------
function rubWords(sum){
  const ones = [['','один','два','три','четыре','пять','шесть','семь','восемь','девять'],['','одна','две','три','четыре','пять','шесть','семь','восемь','девять']];
  const teens = ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'];
  const tens = ['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
  const hund = ['','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'];
  const forms = (n, f) => { n = n % 100; if (n > 10 && n < 20) return f[2]; n = n % 10; return n === 1 ? f[0] : (n >= 2 && n <= 4 ? f[1] : f[2]); };
  const tri = (n, fem) => { const w = [hund[Math.floor(n / 100)]]; const t = n % 100; if (t >= 10 && t < 20) w.push(teens[t - 10]); else { w.push(tens[Math.floor(t / 10)]); w.push(ones[fem ? 1 : 0][t % 10]); } return w.filter(Boolean).join(' '); };
  const rub = Math.floor(sum), kop = Math.round((sum - rub) * 100);
  const groups = [[1e9, ['миллиард','миллиарда','миллиардов'], 0], [1e6, ['миллион','миллиона','миллионов'], 0], [1e3, ['тысяча','тысячи','тысяч'], 1]];
  let n = rub; const out = [];
  for (const [d, f, fem] of groups){ const g = Math.floor(n / d); if (g) out.push(tri(g, fem), forms(g, f)); n %= d; }
  if (n || !out.length) out.push(n ? tri(n, 0) : 'ноль');
  let txt = out.join(' ').replace(/\s+/g, ' ').trim(); txt = txt.charAt(0).toUpperCase() + txt.slice(1);
  return `${txt} ${forms(rub, ['рубль','рубля','рублей'])} ${String(kop).padStart(2, '0')} ${forms(kop, ['копейка','копейки','копеек'])}`;
}
const fmtDate = d => new Date(d).toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'});
function invoiceHTML(o){
  const pm = PM_ALL[o.payment.id], t = o.totals, e = esc, isCard = pm.id === 'card';
  const m2 = n => Number(n).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const vatPct = Math.round((pm.vatRate || 0) * 100);
  const bankTable = `<table class="bank">
    <tr><td colspan="2" rowspan="2" class="w60">${e(pm.bank)}${pm.bankCity ? ', ' + e(pm.bankCity) : ''}<br><small>Банк получателя</small></td><td>БИК</td><td>${e(pm.bik)}</td></tr>
    <tr><td>Сч. №</td><td>${e(pm.corrAccount)}</td></tr>
    <tr><td>ИНН ${e(pm.inn || '—')}</td><td>КПП ${e(pm.kpp || '—')}</td><td rowspan="2">Сч. №</td><td rowspan="2">${e(pm.account)}</td></tr>
    <tr><td colspan="2">${e(pm.fullName || pm.legalName)}<br><small>Получатель</small></td></tr></table>`;
  const cardTable = `<table class="bank kv">
    <tr><td>Получатель</td><td><b>${e(pm.legalName)}</b></td></tr><tr><td>Номер счёта</td><td><b>${e(pm.account)}</b></td></tr>
    <tr><td>Банк получателя</td><td>${e(pm.bank)}</td></tr><tr><td>БИК</td><td>${e(pm.bik)}</td></tr>
    <tr><td>ИНН банка / КПП банка</td><td>${e(pm.bankInn)} / ${e(pm.bankKpp)}</td></tr><tr><td>Корр. счёт</td><td>${e(pm.corrAccount)}</td></tr>
    <tr><td>Назначение платежа</td><td>Оплата по счёту № ${e(o.invoice.number)} от ${fmtDate(o.invoice.date)}. Без НДС</td></tr></table>`;
  const seller = isCard ? `${e(pm.legalName)} (перевод физическому лицу)` :
    [pm.fullName || pm.legalName, pm.inn && 'ИНН ' + pm.inn, pm.kpp && 'КПП ' + pm.kpp, pm.ogrnip && 'ОГРНИП ' + pm.ogrnip, pm.address, pm.phone && 'тел. ' + pm.phone].filter(Boolean).map(e).join(', ');
  const c = o.contact;
  const buyer = [c.company || c.name, c.company && c.name, c.inn && 'ИНН ' + c.inn, c.requisites, c.city, c.phone && 'тел. ' + c.phone, c.email].filter(Boolean).map(e).join(', ');
  const rows = o.items.map((i, n) => `<tr><td class="c">${n + 1}</td><td>${e(i.name)}${i.madeToOrderQty ? `<br><small>${i.inStockQty ? i.inStockQty + ' шт из наличия, ' : ''}${i.madeToOrderQty} шт под заказ (${e(leadText())})</small>` : ''}</td><td class="r">${num(i.qty)}</td><td class="c">шт</td><td class="r">${m2(i.unitPrice)}</td><td class="r">${m2(i.sum)}</td></tr>`).join('');
  let totals = `<tr><td>Итого:</td><td>${m2(t.total)}</td></tr>`;
  if (t.markup) totals += `<tr><td>Надбавка ${Math.round(t.markupRate * 100)}%:</td><td>${m2(t.markup)}</td></tr>`;
  if (pm.vatMode === 'included') totals += `<tr><td>В том числе НДС ${vatPct}%:</td><td>${m2(t.vat)}</td></tr><tr class="b"><td>Всего к оплате:</td><td>${m2(t.grand)}</td></tr>`;
  else if (pm.vatMode === 'added') totals += `<tr><td>НДС ${vatPct}%:</td><td>${m2(t.vat)}</td></tr><tr class="b"><td>Всего к оплате (в т.ч. НДС ${vatPct}%):</td><td>${m2(t.grand)}</td></tr>`;
  else totals += `<tr><td>Без НДС</td><td>—</td></tr><tr class="b"><td>Всего к оплате:</td><td>${m2(t.grand)}</td></tr>`;
  const vatWords = pm.vatMode === 'none' ? ', без НДС' : `, в т.ч. НДС ${vatPct}% — ${m2(t.vat)} руб.`;
  const resLines = (o.reservation && o.reservation.lines) || [];
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Счёт № ${e(o.invoice.number)}</title><style>
  body{font:13px/1.4 Arial,Helvetica,sans-serif;color:#000;background:#fff;max-width:800px;margin:20px auto;padding:0 16px}
  table{border-collapse:collapse;width:100%} td,th{border:1px solid #000;padding:4px 6px;vertical-align:top}
  .bank td{font-size:12px}.bank small{color:#444}.w60{width:60%}.kv td:first-child{width:35%;color:#333}
  h1{font-size:20px;border-bottom:2px solid #000;padding-bottom:6px;margin:22px 0 10px}
  .parties td{border:0;padding:3px 0}.parties td:first-child{width:110px;color:#333}
  .items th{background:#eee}.r{text-align:right;white-space:nowrap}.c{text-align:center}
  .tot{width:auto;margin-left:auto;margin-top:6px}.tot td{border:0;text-align:right;padding:2px 6px}.tot .b td{font-weight:bold;font-size:14px}
  .small{font-size:12px;color:#333}.box{border:2px solid #000;padding:8px 10px;margin:14px 0;font-weight:bold}.box.dlv{border-style:dashed;font-weight:normal}
  .sign{margin-top:30px;display:flex;gap:40px}.sign div{flex:1;border-bottom:1px solid #000;padding-bottom:18px}
  .tools{margin:0 0 14px;display:flex;gap:8px}.tools button{padding:8px 14px;font-size:14px;cursor:pointer}
  @media print{.tools{display:none} body{margin:0}}
  </style></head><body>
  <div class="tools"><button onclick="window.print()">🖨 Печать / Сохранить в PDF</button></div>
  ${isCard ? '<h3 style="margin:0 0 6px">Реквизиты для перевода</h3>' + cardTable : bankTable}
  <h1>Счёт на оплату № ${e(o.invoice.number)} от ${fmtDate(o.invoice.date)}</h1>
  <table class="parties"><tr><td>Продавец:</td><td><b>${seller}</b></td></tr>
  <tr><td>Покупатель:</td><td><b>${buyer}</b></td></tr>
  <tr><td>Основание:</td><td>Заказ № ${e(o.id)}, способ оплаты: ${e(pm.label)}</td></tr>
  <tr><td>Доставка:</td><td>${e(o.delivery.service)}${o.delivery.city ? ', ' + e(o.delivery.city) : ''}${o.delivery.address ? ', ' + e(o.delivery.address) : ''}</td></tr></table>
  <table class="items" style="margin-top:10px"><thead><tr><th>№</th><th>Товар</th><th>Кол-во</th><th>Ед.</th><th>Цена, ₽</th><th>Сумма, ₽</th></tr></thead><tbody>${rows}</tbody></table>
  <table class="tot">${totals}</table>
  <p>Всего наименований ${o.items.length}, на сумму ${m2(t.grand)} руб.<br><b>${rubWords(t.grand)}</b>${vatWords}</p>
  <div class="box">Счёт действителен до ${fmtDate(o.invoice.payUntil)} включительно.${resLines.length ? ` Товар из наличия (${num(resLines.reduce((a, l) => a + l.qty, 0))} шт) забронирован до ${fmtDate(o.reservation.expiresAt)}; если оплата не поступит, бронь снимается.` : ''}</div>
  <div class="box dlv">🚚 ${e(CFG.deliveryNotice)}</div>
  <p class="small">В назначении платежа укажите: «Оплата по счёту № ${e(o.invoice.number)}». Позиции «под заказ»: ${e(leadText())}.</p>
  <p class="small">Контакты: тел./Telegram/WhatsApp ${e(CFG.phone || '')}${CFG.email ? ', email ' + e(CFG.email) : ''}</p>
  ${isCard ? '' : `<div class="sign"><div>${pm.id === 'ip' ? 'Индивидуальный предприниматель' : 'Руководитель'}</div><div>${pm.id === 'ip' ? e(pm.signer || '') : 'Бухгалтер'}</div></div>`}
  </body></html>`;
}
function openInvoice(o){
  const html = invoiceHTML(o); let w = null;
  try { w = window.open('', '_blank'); if (w){ w.document.open(); w.document.write(html); w.document.close(); } } catch(e){ w = null; }
  return w;
}
function download(name, content, mime){
  const blob = new Blob([content], {type: mime}); const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

// ---------- подбор ----------
function bindPicker(){
  $('#pickPerDay').innerHTML = CFG.picker.map((r, i) => `<label class="opt"><input type="radio" name="perDay" value="${i}" ${i === 0 ? 'required' : ''}> ${esc(r.label)}</label>`).join('');
  $('#pickerForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, r = CFG.picker[Number(f.elements.perDay.value)], gas = f.elements.gas.value, v380 = f.elements.v380.value;
    if (!r || !gas || !v380){ toast('Ответьте на все 3 вопроса'); return; }
    const big = r.electric === 'big';
    const gasList = PRODUCTS.filter(p => p.fuel === 'gas' && r.gasSections.includes(p.sections));
    const elList = PRODUCTS.filter(p => p.fuel === 'electric' && (big ? p.powerKw > CFG.electricSmallMaxKw : p.powerKw <= CFG.electricSmallMaxKw));
    let list = [], note = '';
    if (gas === 'yes') { list = gasList; note = `Для ${esc(r.label)} подойдут газовые грили на ${r.gasSections.join('–')} горелки.`; }
    else if (gas === 'no') {
      list = elList; note = 'Без газа — электрический гриль.';
      if (v380 !== 'yes') note += ' Мощность электрогрилей 8–10,8 кВт: напишите нам, проверим, подойдёт ли ваша сеть.';
    } else { list = [...gasList, ...elList]; note = 'Показали и газовые, и электрические. Напишите, что есть на точке — поможем выбрать.'; }
    list.sort((a, b) => (b.hit - a.hit) || ((priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity)));
    const msg = `Здравствуйте! Помогите подобрать гриль. Шаурмы в день: ${r.label}. Газ: ${({yes:'есть',no:'нет',unknown:'не знаю'})[gas]}. 380 В: ${({yes:'есть',no:'нет',unknown:'не знаю'})[v380]}.`;
    $('#pickerResult').hidden = false;
    $('#pickerResult').innerHTML = `<p class="pick-note">${note} <span class="muted small">Это ориентир — точнее подскажем в мессенджере.</span></p>
      <div class="grid">${list.slice(0, 6).map(cardHTML).join('')}</div>
      <div class="cta-row"><a class="btn big wa" href="${esc(waLink(msg))}" target="_blank" rel="noopener">💬 Спросить в WhatsApp</a><a class="btn big tg" href="${esc(CFG.telegram)}" target="_blank" rel="noopener">✈️ Telegram</a></div>`;
    $('#pickerResult').scrollIntoView({behavior: 'smooth', block: 'start'});
  });
}

// ---------- FAQ ----------
function renderFaq(){
  const ip = PM.ip;
  const faq = [
    ['Газ или электро — что выбрать?', 'Если на точке есть газ (магистраль или баллон) — обычно берут газовый гриль. Если газа нет — электрический. Не уверены — напишите нам, подскажем по вашей точке.'],
    ['Сколько горелок нужно?', 'Чем больше продаж в день и чем больше вертел мяса, тем больше горелок. Воспользуйтесь блоком «Подобрать гриль» — покажем подходящие модели.'],
    ['Как оплатить?', ip ? 'По счёту на ИП, безналичным переводом. Цена на сайте уже включает НДС 5%. Счёт открывается сразу после заявки.' : 'Безналичным переводом по счёту.'],
    ['Сколько стоит доставка?', 'Зависит от города и способа (до терминала транспортной компании или до двери). Рассчитаем и сообщим до отправки. Можно забрать самому.'],
    ['Что значит «под заказ»?', 'Модели сейчас нет на складе. ' + (CFG.madeToOrderLead ? `Срок поставки ${CFG.madeToOrderLead}.` : 'Срок поставки сообщим при заказе.')],
    ['Что такое бронь?', `Если товар есть на складе, после выставления счёта он закреплён за вами до конца ${CFG.reservationDays === 1 ? 'следующего дня' : `${CFG.reservationDays}-го дня`}. Не оплатили — бронь снимается.`],
    ['Какая гарантия?', 'Срок указан в карточке модели. Где написано «Гарантия 1 год» — гарантия 1 год. Где не указано — уточните у нас до покупки.'],
    ['Есть фото и видео гриля?', 'Пришлём фото модели в WhatsApp или Telegram — напишите, какая модель интересует.'],
    ['Можно купить несколько грилей?', 'Да. Укажите нужное количество в заявке. Для нескольких точек — напишите, обсудим условия.']
  ];
  $('#faqList').innerHTML = faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  $('#paymentInfo').textContent = ip ? 'По счёту на ИП, безналичный перевод. Цена на сайте уже включает НДС 5%.' : 'Безналичная оплата по счёту.';
}

// ---------- общие обработчики ----------
function bindGlobal(){
  document.addEventListener('click', e => {
    const open = e.target.closest('[data-open]'); if (open){ openProduct(open.dataset.open); return; }
    const add = e.target.closest('[data-add]'); if (add){ addToCart(add.dataset.add, 1); return; }
    const cq = e.target.closest('[data-cq]'); if (cq){ setQty(cq.dataset.cq, (cart[cq.dataset.cq] || 0) + Number(cq.dataset.d)); return; }
    if (e.target.closest('[data-close]')){ closeModal(e.target.closest('.modal').id); return; }
    if (e.target.closest('[data-close-go]')){ closeModal('cartModal'); return; }
    if (e.target.classList.contains('modal')) closeModal(e.target.id);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.modal').filter(m => !m.hidden).forEach(m => closeModal(m.id)); });
  const oc = () => { renderCartBody(); openModal('cartModal'); };
  $('#cartBtn').onclick = oc; $('#cartBtnMobile').onclick = oc;
}

function init(){
  document.title = `Грили для шаурмы и донера — газ и электро | ${CFG.companyName}`;
  bindContacts(); renderHits(); bindFilters(); renderCatalog(); bindPicker(); renderFaq(); bindOrderForm(); bindGlobal(); refreshCart();
}
window.addEventListener('i18n:change', () => { bindContacts(); renderHits(); renderCatalog(); refreshCart(); });
init();
