// Admin
const ADMIN_NICK = 'pvlenemy';
const ADMIN_URL = `https://t.me/${ADMIN_NICK}`;

// Currency and language (updated rates)
const currencyRates = {
  EUR: 1,     // база
  UAH: 50     // примерный курс грн к евро (можешь поменять)
};

const currencySymbols = {
  EUR: '€',
  UAH: '₴'
};

// по умолчанию ЕВРО
let currency = localStorage.getItem('currency') || 'EUR';

let currentCategory = 'all'; // текущая категория
let currentBrand = '';        // текущий бренд / подбренд


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
  }
};
let lang = localStorage.getItem('lang') || 'ua';

const discounts = {
  elf: { old: 15, new: 12 },
  vozol: { old: 15, new: 12 },
  chaser: { old: 15, new: 12 },
  cartridge: { old: 25, new: 20 }
};


// Products (base prices in PLN)
const products = [
  // Elf Liq
  ...[
    'Apple Peach','Blackcurrant annised','Blueberry',
    'Cherry','Double Apple','Kiwi Passion Fruit Guava',
    'Lemon Lime','Strawberry Ice','Pineapple Ice','P&B Cloud'
  ].map((n,i)=>({
    id: i+1,
    name: `Elf Liq – ${n}`,
    brand: 'elf',
    price: discounts.elf.old,
    category: 'liquid',
    img: `images/elf/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png` // уникальная картинка по названию
  })),

  // Chaser

  // Chaser F/P
  ...[ 
    'Blue Raspberry','Cherry','Pomegranate','Watermelon Menthol','Sweet Cherry','Berries' 
  ].map((n,i)=>({
    id: 100+i,
    name: `Chaser – ${n}`,
    brand: 'chaser',
    subBrand: 'fp',   // Chaser F/P
    price: discounts.chaser.old,
    category: 'liquid',
    img: `images/chaser/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png`
  })),

// Chaser Black
  ...[ 
    'Grape Blackberry','Triple Berry','Wild Strawberry Mint' 
  ].map((n,i)=>({
    id: 200+i,
    name: `Chaser – ${n}`,
    brand: 'chaser',
    subBrand: 'black',  // Chaser Black
    price: discounts.chaser.old,
    category: 'liquid',
    img: `images/chaser/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png`
  })),

// Chaser My Mint
  ...[ 'PepperMint' ].map((n,i)=>({
    id: 300+i,
    name: `Chaser – ${n}`,
    brand: 'chaser',
    subBrand: 'mymint', // Chaser My Mint
    price: discounts.chaser.old,
    category: 'liquid',
    img: `images/chaser/${n.replace(/[^a-zA-Z0-9]/g,'_')}.png`
  })),

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

// State
let cart = [];
let favorites = [];
let filtered = [...products];
let showingFavorites = false;

// Elements
const mainPage = document.getElementById('mainPage');
const cartPage = document.getElementById('cartPage');
const productList = document.getElementById('productList');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const autocompleteBox = document.getElementById('autocomplete');
const sortSelect = document.getElementById('sortSelect');
const priceMinEl = document.getElementById('priceMin');
const priceMaxEl = document.getElementById('priceMax');
const backAllBtn = document.getElementById('backAllBtn');

// Utils
function formatPricePLN(eu){
  const rate = currencyRates[currency];
  const symbol = currencySymbols[currency];
  const converted = Math.round(eu * rate);
  return `${converted} ${symbol}`;
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

function getFilteredProducts() {
  let list = [...products];

  // Категория
  if(currentCategory !== 'all') {
    list = list.filter(p => p.category === currentCategory);
  }

  // Бренд / подбренд
  if(currentBrand) {
    if(currentBrand === 'elf') list = list.filter(p => p.brand === 'elf');
    else list = list.filter(p => p.subBrand === currentBrand);
  }

  // Избранное
  if(showingFavorites) {
    list = list.filter(p => favorites.includes(p.id));
  }

  return list;
}


}
function renderProducts() {
  const list = getFilteredProducts();
  productList.innerHTML = '';

  if(!list.length){
    productList.innerHTML = `<p class="empty">${i18n[lang].emptyProducts}</p>`;
    return;
  }

  list.forEach(p=>{
    const favActive = favorites.includes(p.id);
    const discount = discounts[p.brand];
    const newPrice = discount ? discount.new : p.price;

    productList.innerHTML += `
      <div class="product">
        <img src="${p.img}" onclick="previewImage('${p.img}')" alt="${p.name}">
        <h4>${p.name}</h4>
        <div class="muted">${i18n[lang][p.category] || p.category}</div>

        <div class="price-box">
          ${discount ? `<span class="old-price">${formatPricePLN(p.price)}</span>` : ''}
          <span class="new-price">${formatPricePLN(newPrice)}</span>
        </div>

        <div class="actions">
          <button class="btn btn-primary" onclick="addToCart(${p.id}, this)">
            ${i18n[lang].addToCart}
          </button>
          <button class="btn btn-outline ${favActive ? 'active' : ''}" onclick="toggleFavorite(${p.id})">
            ${favActive ? '🩷' : '🤍'}
          </button>
        </div>
      </div>
    `;
  });
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
  let totalPLN=0;
  cart.forEach((p,i)=>{
    totalPLN+=p.price*p.qty;
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
  totalBox.textContent = `${i18n[lang].total}: ${formatPricePLN(totalPLN)}`;
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

function filterCategory(cat){
  currentCategory = cat;
  showingFavorites = false;
  currentBrand = '';
  brandButtons.forEach(b => b.classList.remove('active'));
  favoritesBtn.classList.remove('active');
  renderProducts();
}


function searchProducts(q){
  backAllBtn.classList.add('hidden');
  showingFavorites = false;
  const v = q.toLowerCase();
  const candidates = products.filter(p=>p.name.toLowerCase().includes(v));
  filtered = candidates;
  renderProducts();

  // autocomplete
  if(q.trim().length && candidates.length){
    autocompleteBox.innerHTML = candidates.slice(0,6).map(p=>(
      `<div class="autocomplete-item" onclick="selectSearch('${p.name.replace(/'/g,"\\'")}')">${p.name}</div>`
    )).join('');
    autocompleteBox.classList.add('active');
  } else {
    autocompleteBox.classList.remove('active');
  }
}
function selectSearch(name){
  searchInput.value = name;
  autocompleteBox.classList.remove('active');
  filtered = products.filter(p=>p.name===name);
  renderProducts();
}

function sortProducts(t){
  if(t==='low') filtered.sort((a,b)=>a.price-b.price);
  else if(t==='high') filtered.sort((a,b)=>b.price-a.price);
  else if(t==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name));
  renderProducts();
}

function applyPriceFilter(skipRender){
  const min = Number(priceMinEl?.value)||0;
  const max = Number(priceMaxEl?.value)||Infinity;
  filtered = filtered.filter(p=>p.price>=min && p.price<=max);
  if(!skipRender) renderProducts();
}

// Favorites
function toggleFavorite(id){
  const idx = favorites.indexOf(id);
  if(idx>-1) favorites.splice(idx,1);
  else favorites.push(id);
  saveFavorites();
  renderProducts();
}

function showFavorites(){
  showingFavorites = !showingFavorites;
  renderProducts();
}


function backToAll(){
  showingFavorites = false;
  currentCategory = 'all';
  currentBrand = '';
  categoryButtons.forEach(b => b.classList.remove('active'));
  brandButtons.forEach(b => b.classList.remove('active'));
  favoritesBtn.classList.remove('active');
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
  if(!cart.length) return alert(i18n[lang].emptyCart);

  const orderId = Date.now().toString().slice(-6);
  const totalPLN = cart.reduce((s,p)=>s + p.price * p.qty, 0);

  const lines = cart.map(p =>
    `• ${p.name} × ${p.qty} — ${formatPricePLN(p.price * p.qty)}`
  );

  lastOrderText =
`${i18n[lang].orderNumber}: ${orderId}
${i18n[lang].consultant}: @${ADMIN_NICK}

${lines.join('\n')}

${i18n[lang].total}: ${formatPricePLN(totalPLN)}`;

  document.getElementById('orderText').value = lastOrderText;
  document.getElementById('orderNumberLabel').textContent =
    `${i18n[lang].orderNumber}: #${orderId}`;

  openOrderModal();
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
brandButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    brandButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    filterBrand(btn.dataset.brand);
  });
});

function filterBrand(brand){
  currentBrand = brand || '';
  showingFavorites = false;
  favoritesBtn.classList.remove('active');
  renderProducts();
}

function openAbout(){
  document.getElementById('aboutModal').classList.remove('hidden');
}

function closeAbout(){
  document.getElementById('aboutModal').classList.add('hidden');
}


window.addEventListener('load', ()=>{
  loadCart();
  loadFavorites();

  document.getElementById('langSelect').value = lang;
  document.getElementById('currencySelect').value = currency;

  applyI18n();

  filtered = [...products]; // сначала все товары
  currentCategory = 'all';
  currentBrand = '';
  showingFavorites = false;

  renderProducts();

  document.querySelectorAll('.category-btn').forEach(b =>
    b.classList.remove('active')
  );

  brandFilter.style.display = 'none';

  updateCartCount();
});


  brandFilter.style.display = 'none';

  updateCartCount();
});
