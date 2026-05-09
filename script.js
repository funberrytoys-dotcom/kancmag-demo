// Products data
const products = [
    { id: 1, name: 'Ручка шариковая Pilot', category: 'pens', price: 120, emoji: '\u2708\ufe0f' },
    { id: 2, name: 'Набор ручек 12 шт', category: 'pens', price: 450, emoji: '\ud83d\udcdd' },
    { id: 3, name: 'Гелевая ручка 0.5мм', category: 'pens', price: 89, emoji: '\ud83d\udd8b\ufe0f' },
    { id: 4, name: 'Маркер перманентный', category: 'pens', price: 75, emoji: '\ud83d\udd8d\ufe0f' },
    { id: 5, name: 'Бумага A4 500 листов', category: 'paper', price: 320, emoji: '\u2702\ufe0f' },
    { id: 6, name: 'Блокнот Moleskine', category: 'paper', price: 950, emoji: '\ud83d\udcd5' },
    { id: 7, name: 'Стикеры 100 шт', category: 'paper', price: 180, emoji: '\ud83c\udff7\ufe0f' },
    { id: 8, name: 'Папка-регистратор', category: 'paper', price: 65, emoji: '\ud83d\udcc1' },
    { id: 9, name: 'Рюкзак школьный', category: 'school', price: 1890, emoji: '\ud83c\udf92' },
    { id: 10, name: 'Пенал с наполнением', category: 'school', price: 450, emoji: '\ud83c\udf9b\ufe0f' },
    { id: 11, name: 'Линейка 30см', category: 'school', price: 45, emoji: '\ud83d\udcd0' },
    { id: 12, name: 'Точилка электрическая', category: 'school', price: 290, emoji: '\u2702\ufe0f' },
    { id: 13, name: 'Набор акварели', category: 'art', price: 650, emoji: '\ud83c\udfa8' },
    { id: 14, name: 'Скетчбук A5', category: 'art', price: 380, emoji: '\ud83d\udcd6' },
    { id: 15, name: 'Набор кистей 6шт', category: 'art', price: 520, emoji: '\ud83c\udfa8' },
    { id: 16, name: 'Пластилин 12цветов', category: 'art', price: 240, emoji: '\ud83c\udfa8' },
];

// State
let cart = [];
let currentFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const toast = document.getElementById('toast');

// Initialize
function init() {
    renderProducts();
    updateCartUI();
}

// Render products
function renderProducts() {
    const filtered = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-img">${product.emoji}</div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">${product.price} \u0440\u0443\u0431</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0443
                </button>
            </div>
        </div>
    `).join('');
}

// Filter catalog
function filterCatalog(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(category));
    });
    renderProducts();
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showToast(`${product.name} \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d!`);
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Update cart
function updateCartUI() {
    // Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    
    // Items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">\u041a\u043e\u0440\u0437\u0438\u043d\u0430 \u043f\u0443\u0441\u0442\u0430</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #e5e7eb;"
>
                <div>
                    <strong>${item.name}</strong>
                    <p style="margin:0;color:#6b7280;font-size:0.85rem;">${item.quantity} x ${item.price} \u0440\u0443\u0431</p>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:1.2rem;"
>\u2715</button>
            </div>
        `).join('');
    }
    
    // Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total} \u0440\u0443\u0431`;
}

// Toggle cart
function toggleCart() {
    cartPanel.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showToast('\u041a\u043e\u0440\u0437\u0438\u043d\u0430 \u043f\u0443\u0441\u0442\u0430!');
        return;
    }
    showToast('\u0417\u0430\u043a\u0430\u0437 \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d! \u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u0441\u0432\u044f\u0436\u0435\u0442\u0441\u044f.');
    cart = [];
    updateCartUI();
    toggleCart();
}

// Toggle menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
}

// Handle form
function handleForm(e) {
    e.preventDefault();
    showToast('\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430! \u041c\u044b \u043f\u0435\u0440\u0435\u0437\u0432\u043e\u043d\u0438\u043c \u0432\u0430\u043c.');
    e.target.reset();
}

// Toast
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Run
init();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
