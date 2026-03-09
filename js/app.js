// Admin
const ADMIN_NICK = 'VaporsManagerKE';
const ADMIN_URL = `https://t.me/${ADMIN_NICK}`;

// Currency and language (updated rates)
const currencyRates = {
  EUR: 1,     // база
  UAH: 51     // примерный курс грн к евро (можешь поменять)
};

const currencySymbols = {
  EUR: '€',
  UAH: '₴'
};

// по умолчанию ЕВРО
let currency = localStorage.getItem('currency') || 'EUR';
let selectedDelivery = '';
let selectedPayment = '';
let lastOrderDelivery = '';
let lastOrderPayment = '';
let lastOrderText = '';



// I18n dictionary
const i18n = {
  ru: {
    addToCart: "В корзину",
    search: "Поиск...",
    liquid: "Жидкости",
    disposable: "Одноразки",
    cartridge: "Картриджи",
    categories: "Категории",
    allProducts: "Все товары",
    liquids: "Жидкости",
    disposable: "Одноразки",
    cartridges: "Картриджи",
    priceFilter: "Фильтр по цене",
    favorites: "Избранное ❤️",
    backToAll: "Все товары",
    sort: "Сортировка",
    priceAsc: "Цена ↑",
    priceDesc: "Цена ↓",
    byName: "По названию",
    back: "← Назад",
    cart: "Корзина",
    checkout: "Оформить заказ",
    contactAdmin: "Написать админу",
    emptyProducts: "Нет товара в наличии",
    emptyCart: "Корзина пуста",
    addedToCart: "Товар добавлен в корзину ✅",
    removedFromCart: "Товар удалён",
    orderTitle: "Ваш заказ",
    copyOrder: "Скопировать заказ",
    sendTelegram: "Открыть Telegram",
    close: "Закрыть",
    consultant: "Ваш консультант",
    orderNumber: "Номер заказа",
    total: "Итого",
    aboutBtn: "О нас",    
    aboutTitle: "О нас",
    aboutCities: "Работаем в Košice и Prešov",
    aboutLocation: "Самовывоз: Pražská 2 (общежитие)",
    aboutDelivery: "Доставка: Aupark +1€, TUKE — договорная цена",
    aboutPayment: "Любые способы оплаты — наличные, карты, крипта",
    aboutNote: "Telegram может блокировать каналы.",
    aboutAdapter: "Наш переходник",
    deliveryPayment: "Доставка и оплата",
    delivery: "Способ доставки",
    continue: "Продолжить",
    copyOrder: "Скопировать и открыть Telegram",
    pickup_prazska: "Самовывоз — Pražska 2",
    pickup_aupark: "Доставка ТЦ Aupark (+1€)",
    pickup_tuke: "Доставка TUKE (+1,5€)",
    pickup_tesco: "Доставка Tesco Džungla (+1,5€)", 
    delivery_kosice: "Доставка по Кошице (+2,5€)",
    pay_cash: "Наличные",
    pay_ua_card: "Украинская карта",
    pay_tatra: "Европейская карта",
    pay_usdt: "USDT (TRC20)",
    deliveryLabel: "📦 Доставка",
    paymentLabel: "💳 Оплата",
    cashNoChange: 'Без сдачи',
    cashFromSum: 'С какой суммы',
    cashFrom: 'Сдача с',
    cashChange: 'Сдача'
    
  },
  ua: {
    addToCart: "До кошика",
    search: "Пошук...",
    liquid: "Рідини",
    disposable: "Одноразки",
    cartridge: "Картриджі",
    categories: "Категорії",
    allProducts: "Всі товари",
    liquids: "Рідини",
    disposable: "Одноразки",
    cartridges: "Картриджі",
    priceFilter: "Фільтр за ціною",
    favorites: "Обране 🩷",
    backToAll: "Всі товари",
    sort: "Сортування",
    priceAsc: "Ціна ↑",
    priceDesc: "Ціна ↓",
    byName: "За назвою",
    back: "← Назад",
    cart: "Кошик",
    checkout: "Оформити замовлення",
    contactAdmin: "Написати адміну",
    emptyProducts: "Немає товарів у наявності",
    emptyCart: "Кошик порожній",
    addedToCart: "Додано до кошика ✅",
    removedFromCart: "Видалено з кошика",
    orderTitle: "Ваше замовлення",
    copyOrder: "Скопіювати замовлення",
    sendTelegram: "Відкрити Telegram",
    close: "Закрити",
    consultant: "Ваш консультант",
    orderNumber: "Номер замовлення",
    total: "Разом",
    aboutBtn: "Про нас",
    aboutTitle: "Про нас",
    aboutCities: "Працюємо в Košice та Prešov",
    aboutLocation: "Самовивіз: Pražská 2 (гуртожиток)",
    aboutDelivery: "Доставка: Aupark +1€, TUKE — ціна за домовленістю",
    aboutPayment: "Будь-які способи оплати — готівка, картка, крипта",
    aboutNote: "Telegram може блокувати канали.",
    aboutAdapter: "Наш перехідник",
    deliveryPayment: "Доставка та оплата",
    delivery: "Спосіб доставки",
    payment: "Спосіб оплати",
    continue: "Продовжити",
    copyOrder: "Скопіювати і відкрити Telegram",
    pickup_prazska: "Самовивіз — Pražska 2",
    pickup_aupark: "Доставка ТЦ Aupark (+1€)",
    pickup_tuke: "Доставка TUKE (+1,5€)",
    pickup_tesco: "Доставка Tesco Džungla (+1,5€)", 
    delivery_kosice: "Доставка по Košice (+2,5€)", 
    pay_cash: "Готівка",
    pay_ua_card: "Українська карта",
    pay_tatra: "Європейська карта",
    pay_usdt: "USDT (TRC20)",
    deliveryLabel: "📦 Доставка",
    paymentLabel: "💳 Оплата",
    cashNoChange: 'Без решти',
    cashFromSum: 'З якої суми',
    cashFrom: 'Решта з',
    cashChange: 'Решта'
  },
  en: {
    addToCart: "Add to cart",
    search: "Search...",
    liquid: "Liquids",
    disposable: "Disposables",
    cartridge: "Cartridges",
    categories: "Categories",
    allProducts: "All products",
    liquids: "Liquids",
    disposable: "Disposables",
    cartridges: "Cartridges",
    priceFilter: "Price filter",
    favorites: "Favorites 🩷",
    backToAll: "All products",
    sort: "Sort",
    priceAsc: "Price ↑",
    priceDesc: "Price ↓",
    byName: "By name",
    back: "← Back",
    cart: "Cart",
    checkout: "Checkout",
    contactAdmin: "Contact admin",
    emptyProducts: "No products available",
    emptyCart: "Cart is empty",
    addedToCart: "Added to cart ✅",
    removedFromCart: "Removed from cart",
    orderTitle: "Your order",
    copyOrder: "Copy order",
    sendTelegram: "Open Telegram",
    close: "Close",
    consultant: "Your consultant",
    orderNumber: "Order number",
    total: "Total",
    aboutBtn: "About us",
    aboutTitle: "About us",
    aboutCities: "We work in Košice and Prešov",
    aboutLocation: "Pickup: Pražská 2 (dormitory)",
    aboutDelivery: "Delivery: Aupark +1€, TUKE — price by agreement",
    aboutPayment: "Any payment methods — cash, card, crypto",
    aboutNote: "Telegram can block channels.",
    aboutAdapter: "Our adapter",
    deliveryPayment: "Delivery & payment",
    delivery: "Delivery method",
    payment: "Payment method",
    continue: "Continue",
    copyOrder: "Copy & open Telegram",
    pickup_prazska: "Pickup — Pražska 2",
    pickup_aupark: "Delivery Aupark Mall (+1€)",
    pickup_tuke: "Delivery TUKE (+1,5€)",
    pickup_tesco: "Delivery Tesco Džungla (+1.5€)",  
    delivery_kosice: "Delivery in Košice (+2.5€)",
    pay_cash: "Cash",
    pay_ua_card: "Ukrainian card",
    pay_tatra: "European card",
    pay_usdt: "USDT (TRC20)",
    deliveryLabel: "📦 Delivery",
    paymentLabel: "💳 Payment",
    cashNoChange: 'No change',
    cashFromSum: 'Cash amount',
    cashFrom: 'Change from',
    cashChange: 'Change'
  }
};
let lang = localStorage.getItem('lang') || 'ua';

const discounts = {
  elf: { old: 15, new: 12 },
  vozol: { old: 15, new: 12 },
  chaser: { old: 15, new: 12 },
  cartridge: { old: 25, new: 20 }
};

const outOfStockNames = [
  // Chaser F/P
  'Chaser – Blue Raspberry',
  'Chaser – Cherry Menthol',
  'Chaser – Currant Menthol',
  'Chaser – Mint',
  'Chaser – Blueberry Menthol',
  'Chaser – Kiwi',

  // Chaser My Mint
  'Chaser – Peach Pomeganate',
  'Chaser – Raspberry Rose',

  // Chaser Black
  'Chaser – Blueberry Lemon',
  'Chaser – Triple Berry',
  'Chaser – Energy Grape',
  'Chaser – Forest Mix',
  
  'Elf Liq – Strawberry Kiwi',
  'Elf Liq – Watermelon'
];

// Products (base prices in PLN)
const products = [

  // Chaser F/P
  ...[ 
    'Blue Raspberry','Cherry Menthol','Currant Menthol',
    'Mint','Blueberry Menthol','Kiwi'
  ].map((n,i)=>({
    id: 100+i,
    name: `Chaser – ${n}`,
    brand: 'chaser',
    subBrand: 'fp',   // Chaser F/P
    price: discounts.chaser.old,
    category: 'liquid',
    img: `images/chaser/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png`
  })),

  // Chaser My Mint
  ...[ 'Peach Pomeganate', 'Raspberry Rose' ].map((n,i)=>({
    id: 300+i,
    name: `Chaser – ${n}`,
    brand: 'chaser',
    subBrand: 'youme', // Chaser My Mint
    price: discounts.chaser.old,
    category: 'liquid',
    img: `images/chaser/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png`
  })),

// Chaser Black
  ...[ 
    'Blueberry Lemon','Triple Berry','Energy Grape','Forest Mix'
  ].map((n,i)=>({
    id: 200+i,
    name: `Chaser – ${n}`,
    brand: 'chaser',
    subBrand: 'black',  // Chaser Black
    price: discounts.chaser.old,
    category: 'liquid',
    img: `images/chaser/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png`
  })),

    // Elf Liq
  ...[
    'Rhubarb Snoow','Blue razz Ice','Strawberry Snoow','Peach Ice','Watermelon',
    'Lemon Lime','Strawberry Ice','Pineapple Ice','P&B Cloud', 'Pink Lemonade',
    'Strawberry raspberry cherry ice','Elf Jack','Blackberry lemon',
    'Apple Peach','Blackcurrant aniseed','Blueberry','Blueberry Rose Mint',
    'Strawberry Kiwi','Cherry','Double Apple','Kiwi Passion Fruit Guava', 'Cola',
    'Sour Watermelon Gummy','Blueberry sour raspberry','Jasmine Raspberry'
  ].map((n,i)=>({
    id: i+1,
    name: `Elf Liq – ${n}`,
    brand: 'elf',
    price: discounts.elf.old,
    category: 'liquid',
    img: `images/elf/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png` // уникальная картинка по названию
  })),

// Chaser My Mint
  /*...[ 'PepperMint' ].map((n,i)=>({
    id: 300+i,
    name: `Chaser – ${n}`,
    brand: 'chaser',
    subBrand: 'mymint', // Chaser My Mint
    price: discounts.chaser.old,
    category: 'liquid',
    img: `images/chaser/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png`
  })),*/

  // Cartridge
  /*{
  id: 300,
  name: 'Xros Cartridge 0.6Ω',
  brand: 'cartridge',
  price: discounts.cartridge.old,
  category: 'cartridge',
  img: 'images/cart/xros.png'
}*/

];

products.forEach(product => {
  product.inStock = !outOfStockNames.includes(product.name);
});

// State
let cart = [];
let favorites = [];
let showingFavorites = false;
let promoActive = false;
let promoPercent = 20;

function calcBulkDiscount() {
  const qtys = { liquid: 0, disposable: 0 };
  cart.forEach(p => {
    const base = products.find(b => b.id === p.id);
    if (!base) return;
    if (base.category in qtys) qtys[base.category] += p.qty;
  });
  let discount = 0;
  Object.values(qtys).forEach(qty => {
    if (qty === 2) discount += 2;        // 2 шт → −2€
    else if (qty >= 3) discount += qty * 2; // 3шт→−6, 4шт→−8, 5шт→−10...
  });
  return discount;
}

// Elements
const mainPage = document.getElementById('mainPage');
const cartPage = document.getElementById('cartPage');
const productList = document.getElementById('productList');
const cartCount = document.getElementById('cartCount');

// Utils
function formatPricePLN(eu){
  const rate = currencyRates[currency];
  const symbol = currencySymbols[currency];
  const converted = eu * rate;
  return `${converted.toFixed(1)} ${symbol}`;
}

function showToast(msgKeyOrText){
  const t=document.getElementById('toast');
  const msg = i18n[lang][msgKeyOrText] || msgKeyOrText;
  t.textContent = msg;
  t.className = "toast show";
  setTimeout(()=>t.className="toast", 1800);
}

function flyToCart(imgEl){
  const cartBtn = document.querySelector('.cart-btn');
  if(!imgEl || !cartBtn) return;
  const rectImg = imgEl.getBoundingClientRect();
  const rectCart = cartBtn.getBoundingClientRect();
  const clone = document.createElement('img');
  clone.src = imgEl.src;
  clone.className = 'fly-img';
  clone.style.left = rectImg.left + 'px';
  clone.style.top = rectImg.top + 'px';
  document.body.appendChild(clone);
  const dx = rectCart.left - rectImg.left;
  const dy = rectCart.top - rectImg.top;
  clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.4)`;
  clone.style.opacity = '0.2';
  setTimeout(()=> clone.remove(), 620);
}

// Persistence
function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }
function loadCart(){
  const data = localStorage.getItem('cart');
  if(data) {
    try { cart = JSON.parse(data); } catch(e){ cart=[]; }
  }
}
function saveFavorites(){ localStorage.setItem('favorites', JSON.stringify(favorites)); }
function loadFavorites(){
  const data = localStorage.getItem('favorites');
  if(data){
    try { favorites = JSON.parse(data); } catch(e){ favorites=[]; }
  }
}
function updateCartCount(){
  const totalQty = cart.reduce((sum,p)=>sum + (p.qty||0), 0);
  cartCount.textContent = totalQty;
}

function renderProducts() {
  const items = getFilteredProducts();
  productList.innerHTML = '';

  if (!items.length) {
    productList.innerHTML = `<p class="empty">${i18n[lang].emptyProducts}</p>`;
    return;
  }

  items.forEach(p => {
    const favActive = favorites.includes(p.id);
    const discount = discounts[p.brand];
    const newPrice = discount ? discount.new : p.price;

    productList.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <div class="muted">${i18n[lang][p.category] || p.category}</div>

        <div class="price-box">
          ${discount ? `<span class="old-price">${formatPricePLN(p.price)}</span>` : ''}
          <span class="new-price">${formatPricePLN(newPrice)}</span>
        </div>

        <div class="actions">
${!p.inStock ? `
  <button class="btn btn-disabled" disabled>
    ${lang === 'ua' ? 'Немає в наявності' :
      lang === 'ru' ? 'Нет в наличии' :
      'Out of stock'}
  </button>
` : `
  <button class="btn btn-primary" onclick="addToCart(${p.id}, this)">
    ${i18n[lang].addToCart}
  </button>
`}
          <button class="btn btn-outline ${favActive ? 'active' : ''}" onclick="toggleFavorite(${p.id})">
            ${favActive ? '🩷' : '🤍'}
          </button>
        </div>
      </div>
    `;
  });
}

function getFilteredProducts() {
  let list = [...products];

  // категория
  if (currentCategory !== 'all') {
    list = list.filter(p => p.category === currentCategory);
  }

  // бренд / подбренд
  if (currentBrand) {
    if (currentBrand === 'elf') {
      list = list.filter(p => p.brand === 'elf');
    } else {
      list = list.filter(p => p.subBrand === currentBrand);
    }
  }

  // избранное
  if (showingFavorites) {
    list = list.filter(p => favorites.includes(p.id));
  }

  list.sort((a, b) => {
  if (a.inStock === b.inStock) return 0;
  return a.inStock ? -1 : 1;
});

  return list;
}

function renderCart(){
  const box=document.getElementById('cartItems');
  const totalBox=document.getElementById('cartTotal');
  box.innerHTML='';
  if(!cart.length){
    box.innerHTML = `<p class="empty">${i18n[lang].emptyCart}</p>`;
    totalBox.textContent = '';
    return;
  }
  let totalPLN = 0;
  cart.forEach((p,i)=>{
    totalPLN += p.price * p.qty;
  
    box.innerHTML+=`
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div style="flex:1">
          <div class="name">${p.name}</div>
          <div class="line">${formatPricePLN(p.price)} × ${p.qty}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${i},-1)">–</button>
            <div>${p.qty}</div>
            <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
            <button class="remove-btn" onclick="removeFromCart(${i})">${lang==='ru'?'Удалить':lang==='ua'?'Видалити':'Remove'}</button>
          </div>
        </div>
      </div>`;
  });

  const bulkDiscount = calcBulkDiscount();
  let finalTotal = promoActive
    ? Math.round(totalPLN * 0.8)
    : totalPLN;
  finalTotal = Math.max(0, finalTotal - bulkDiscount);

  const bulkDiscountHtml = bulkDiscount > 0
    ? `<div class="promo-active">Знижка за кількість −${bulkDiscount.toFixed(1)} €</div>`
    : '';

  totalBox.innerHTML = `
  ${i18n[lang].total}: ${formatPricePLN(finalTotal)}
  ${promoActive ? `<div class="promo-active">🎉 Промокод активований −20%</div>` : ''}
  ${bulkDiscountHtml}
`;

}

// Interactions
function addToCart(id, btnEl){
  const base = products.find(p=>p.id===id);
  const discount = discounts[base.brand];
  const finalPrice = discount ? discount.new : base.price;

  const exist = cart.find(p=>p.id===id);
  if(exist){ exist.qty++; }
  else { cart.push({...base, price: finalPrice, qty:1}); }

  updateCartCount();
  saveCart();
  showToast('addedToCart');

  const card = btnEl?.closest('.product');
  const img = card?.querySelector('img');
  if(img) flyToCart(img);
}


function removeFromCart(i){
  cart.splice(i,1);
  updateCartCount(); renderCart(); saveCart();
  showToast('removedFromCart');
}

function changeQty(i,delta){
  cart[i].qty += delta;
  if(cart[i].qty <= 0){ cart.splice(i,1); }
  updateCartCount(); renderCart(); saveCart();
}

function openCart(){
  mainPage.classList.add('hidden');
  cartPage.classList.remove('hidden');
  document.getElementById('adminBtn').href = ADMIN_URL;
  renderCart();
}
function closeCart(){
  cartPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
}

let currentCategory = 'all'; // по умолчанию

// Filtering & search
function filterCategory(cat) {
  currentCategory = cat;
  currentBrand = null;
  showingFavorites = false;

  document.querySelectorAll('.category-btn')
    .forEach(b => b.classList.toggle('active', b.dataset.category === cat));

  brandFilter.style.display = (cat === 'liquid') ? 'flex' : 'none';

  renderProducts();
}


// Favorites
function toggleFavorite(id){
  const idx = favorites.indexOf(id);
  if(idx>-1) favorites.splice(idx,1);
  else favorites.push(id);
  saveFavorites();
  renderProducts();
}

function showFavorites() {
  showingFavorites = !showingFavorites;
  renderProducts();
}

// Sidebar toggle
function toggleMenu(force){
  const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('menuBtn');

  if(force === false){
    sidebar.classList.remove('active');
    btn.textContent = '☰';
    return;
  }

  sidebar.classList.toggle('active');
  btn.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
}


// Header compact
window.addEventListener('scroll',()=>{
  document.getElementById('header')
    .classList.toggle('compact', window.scrollY>20);
});

// Language and currency
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(i18n[lang][key]) el.textContent = i18n[lang][key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.dataset.i18nPlaceholder;
    if(i18n[lang][key]) el.placeholder = i18n[lang][key];
  });
}

function setLang(l){
  lang = l; localStorage.setItem('lang', l);
  document.getElementById('langSelect').value = lang;
  applyI18n(); renderProducts(); renderCart();
}
function setCurrency(c){
  currency = c; localStorage.setItem('currency', c);
  document.getElementById('currencySelect').value = currency;
  renderProducts(); renderCart();
}

// Checkout modal
function checkout(){
  if(!cart.length){
    alert(i18n[lang].emptyCart);
    return;
  }
  openDeliveryModal();
}

function openOrderModal(){
  document.getElementById('orderModal').classList.remove('hidden');
  closeCart();
}

function closeOrderModal(){
  document.getElementById('orderModal').classList.add('hidden');
}

async function copyAndOpenTelegram(){
  try{
    await navigator.clipboard.writeText(lastOrderText);

    if (promoActive && window.Telegram?.WebApp) {
      Telegram.WebApp.sendData(JSON.stringify({
        action: "use_promo"
      }));
      promoActive = false;
    }

    showToast(lang==='ua'?'Скопійовано':'Скопировано');
    window.open(ADMIN_URL,'_blank');
  }catch{
    showToast('Ошибка копирования');
  }
}


function sendOrderTelegram(){
  // Откроем чат с админом; пользователь отправит ему скопированный текст
  window.open(ADMIN_URL, '_blank');
}

// переключение категории
const categoryButtons = document.querySelectorAll('.category-btn');
const brandFilter = document.getElementById('brandFilter');

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // показывать бренды только для Жижи
    if(btn.dataset.category === 'liquid') {
      brandFilter.style.display = 'flex';
    } else {
      brandFilter.style.display = 'none';
    }

    // Здесь вызываем функцию фильтрации товаров по категории
    filterCategory(btn.dataset.category);
  });
});

// переключение бренда
const brandButtons = document.querySelectorAll('.brand-btn');
let currentBrand = null;

document.querySelectorAll('.brand-btn').forEach(btn => {
  btn.onclick = () => {
    currentBrand = btn.dataset.brand;

    document.querySelectorAll('.brand-btn')
      .forEach(b => b.classList.toggle('active', b === btn));

    renderProducts();
  };
});

function openAbout(){
  document.getElementById('aboutModal').classList.remove('hidden');
}

function closeAbout(){
  document.getElementById('aboutModal').classList.add('hidden');
}


function openDeliveryModal(){
  document.getElementById('deliveryModal').classList.remove('hidden');
  closeCart(); // скрываем корзину на время
}

function closeDeliveryModal(){
  document.getElementById('deliveryModal').classList.add('hidden');
}

let lastOrderCashText = '';
const cashChangeBlock = document.getElementById('cashChangeBlock');
const cashFromInput = document.getElementById('cashFromInput');
let cashChangeType = '';
let cashFromAmount = 0;

function confirmDelivery() {
  const deliveryEl = document.querySelector('input[name="delivery"]:checked');
  const paymentEl  = document.querySelector('input[name="payment"]:checked');

  if (!deliveryEl || !paymentEl) {
    showToast(lang === 'ua' ? 'Оберіть доставку та оплату' : 'Выберите доставку и оплату');
    return;
  }

  lastOrderDelivery = deliveryEl.value;
  lastOrderPayment  = paymentEl.value;

let orderTotal = cart.reduce((s, p) => s + p.price * p.qty, 0);
  orderTotal = Math.max(0, orderTotal - calcBulkDiscount());
  let deliveryPrice = 0;
  if (lastOrderDelivery === 'pickup_aupark') deliveryPrice = 1;
  if (lastOrderDelivery === 'pickup_tuke') deliveryPrice = 1.5;
  if (lastOrderDelivery === 'pickup_tesco') deliveryPrice = 1.5;
  if (lastOrderDelivery === 'delivery_kosice') deliveryPrice = 2.5;
  orderTotal += deliveryPrice;

  if (promoActive) {
    orderTotal = Math.round(orderTotal * 0.8);
  }

  if (lastOrderPayment === 'cash') {
    if (!cashChangeType) {
      showToast(lang === 'ua' ? 'Оберіть варіант здачі' : 'Выберите вариант сдачи');
      return;
    }

    if (cashChangeType === 'from_sum' && cashFromAmount < orderTotal) {
      showToast(lang === 'ua' ? 'Сума менше вартості замовлення' : 'Сумма меньше стоимости заказа');
      return;
    }
  }

  lastOrderCashText = '';
  if (lastOrderPayment === 'cash') {
    lastOrderCashText =
      cashChangeType === 'no_change'
        ? i18n[lang].cashNoChange
        : `${i18n[lang].cashFrom} ${cashFromAmount} €`;
  }

  closeDeliveryModal();
  showOrderModal();
}

function showOrderModal(){
  const orderId = Date.now().toString().slice(-6);
  let itemsTotal = cart.reduce((s,p)=>s + p.price*p.qty, 0);
  const bulkDisc = calcBulkDiscount();
  itemsTotal = Math.max(0, itemsTotal - bulkDisc);
  if (promoActive) { itemsTotal = Math.round(itemsTotal * 0.8); }
  let deliveryFee = 0;
  if (lastOrderDelivery === 'pickup_aupark') deliveryFee = 1;
  if (lastOrderDelivery === 'pickup_tuke') deliveryFee = 1.5;
  if (lastOrderDelivery === 'pickup_tesco') deliveryFee = 1.5;
  if (lastOrderDelivery === 'delivery_kosice') deliveryFee = 2.5;
  const total = itemsTotal + deliveryFee;


  const lines = cart.map(p =>
    `• ${p.name} × ${p.qty} — ${formatPricePLN(p.price*p.qty)}`
  );

  // Получаем текст доставки и оплаты из словаря i18n
  const deliveryText = i18n[lang][lastOrderDelivery] || lastOrderDelivery;
  const paymentText  = i18n[lang][lastOrderPayment]  || lastOrderPayment;

   const bulkDiscLine = bulkDisc > 0
  ? `\n🎁 ${lang === 'ua' ? 'Знижка за кількість' : lang === 'ru' ? 'Скидка за количество' : 'Bulk discount'}: −${bulkDisc.toFixed(1)} €`
  : '';

  lastOrderText =
`${i18n[lang].orderNumber}: #${orderId}
👨‍💼 ${i18n[lang].consultant}: @${ADMIN_NICK}

${i18n[lang].deliveryLabel}: ${deliveryText}
${i18n[lang].paymentLabel}: ${paymentText}${bulkDiscLine}
${lastOrderCashText ? '💶 ' + lastOrderCashText : ''}

${lines.join('\n')}

💰 ${i18n[lang].total}: ${formatPricePLN(total)}`;

  document.getElementById('orderText').value = lastOrderText;
  document.getElementById('orderNumberLabel').textContent =
    `${i18n[lang].orderNumber}: #${orderId}`;

  document.getElementById('orderModal').classList.remove('hidden');
}

// Показываем/скрываем блок сдачи при выборе способа оплаты
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', e => {
    if (e.target.value === 'cash') {
      cashChangeBlock.classList.remove('hidden'); // показываем
      cashChangeType = ''; // сбрасываем
      cashFromAmount = 0;
      cashFromInput.value = '';
    } else {
      cashChangeBlock.classList.add('hidden'); // скрываем
      cashChangeType = '';
      cashFromAmount = 0;
      cashFromInput.value = '';
    }
  });
});

// Отслеживаем выбор радио для сдачи
document.querySelectorAll('input[name="cash_change"]').forEach(radio => {
  radio.addEventListener('change', () => {
    cashChangeType = radio.value;
    if (radio.value === 'from_sum') {
      cashFromInput.classList.remove('hidden');
      cashFromInput.focus();
    } else {
      cashFromInput.classList.add('hidden');
      cashFromAmount = 0;
    }
  });
});

cashFromInput.addEventListener('input', e => {
  cashFromAmount = parseFloat(e.target.value) || 0;
});


document.getElementById('cashFromInput').addEventListener('input', e => {
  cashFromAmount = parseFloat(e.target.value) || 0;
});

function requestPromoStatus() {
  if (!window.Telegram?.WebApp) return;

  Telegram.WebApp.sendData(JSON.stringify({
    action: "check_promo"
  }));
}

if (window.Telegram?.WebApp) {
Telegram.WebApp.onEvent("web_app_data", (event) => {
  const msg = event?.data;
  if (!msg) return;

  if (msg === "PROMO_ACTIVE") {
    promoActive = true;
    renderProducts();
    renderCart();
  }

  if (msg === "PROMO_USED" || msg === "PROMO_NONE") {
    promoActive = false;
    renderProducts();
    renderCart();
  }
});
}

window.addEventListener('load', ()=>{
  requestPromoStatus();
  loadCart();
  loadFavorites();

  document.getElementById('langSelect').value = lang;
  document.getElementById('currencySelect').value = currency;

  applyI18n();

  filtered = [...products];
  renderProducts();

  // ❗️ВАЖНО: убираем активность со всех категорий
  document.querySelectorAll('.category-btn').forEach(b =>
    b.classList.remove('active')
  );

  brandFilter.style.display = 'none';

  updateCartCount();
});
