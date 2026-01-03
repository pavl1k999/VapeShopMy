const ADMIN_NICK = 'gystds';
const ADMIN_URL = `https://t.me/${ADMIN_NICK}`;


const productsData = [
{id:1,name:'Elf Liq – Strawberry',priceOld:50,price:35,img:'https://via.placeholder.com/400'},
{id:2,name:'Vozol – Grape Ice',priceOld:50,price:35,img:'https://via.placeholder.com/400'},
{id:3,name:'Chaser – Berry',priceOld:60,price:45,img:'https://via.placeholder.com/400'}
];


let cart=[];let lastOrderText='';


const productsEl=document.getElementById('products');
const cartCountEl=document.getElementById('cartCount');


function renderProducts(){
productsEl.innerHTML='';
productsData.forEach(p=>{
productsEl.innerHTML+=`
<div class="product">
<img src="${p.img}">
<h4>${p.name}</h4>
<div class="price"><span class="old">${p.priceOld} zł</span> <span class="new">${p.price} zł</span></div>
<button class="btn btn-primary" onclick="addToCart(${p.id})">В корзину</button>
</div>`;
});
}


function addToCart(id){
const p=productsData.find(x=>x.id===id);
const e=cart.find(x=>x.id===id);
e?e.qty++:cart.push({...p,qty:1});
cartCountEl.textContent=cart.reduce((s,p)=>s+p.qty,0);
}


function openCart(){document.getElementById('cartSheet').classList.remove('hidden');renderCart();}
function closeCart(){document.getElementById('cartSheet').classList.add('hidden');}


function renderCart(){
const items=document.getElementById('cartItems');
const totalEl=document.getElementById('cartTotal');
items.innerHTML='';let total=0;
cart.forEach(p=>{total+=p.price*p.qty;items.innerHTML+=`<div>${p.name} × ${p.qty} — ${p.price*p.qty} zł</div>`});
totalEl.textContent=`Итого: ${total} zł`;
}


function checkout(){
let total=0;
const lines=cart.map(p=>{total+=p.price*p.qty;return `• ${p.name} × ${p.qty}`});
lastOrderText=`Заказ\n${lines.join('\n')}\nИтого: ${total} zł`;
document.getElementById('orderText').value=lastOrderText;
document.getElementById('orderModal').classList.remove('hidden');
closeCart();
}


function closeOrderModal(){document.getElementById('orderModal').classList.add('hidden')}
function copyAndOpenTelegram(){navigator.clipboard.writeText(lastOrderText);window.open(ADMIN_URL,'_blank')}
function scrollToProducts(){document.getElementById('catalog').scrollIntoView({behavior:'smooth'})}


renderProducts();
