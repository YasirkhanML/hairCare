let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>...</p>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
            <span class="close-item" onclick="removeItem(${item.id})">X</span>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('subtotal-value').textContent = `$${subtotal.toFixed(2)}`;

    document.querySelector('.buttons').innerHTML = `
        <button onclick="viewCart()">VIEW CART</button>
        <button onclick="checkout()">CHECKOUT</button>
    `;

    localStorage.setItem('cartItems', JSON.stringify(cart));
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeItem(id);
        } else {
            updateCart();
        }
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function viewCart() {
    window.location.href = 'viewcart.html'; // viewcart.html पर जाएं
}

function checkout() {
    window.location.href = 'checkout.html';
}

function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
}

function showCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = 'block';
}

updateCart();

window.onclick = function(event) {
    if (event.target == document.getElementById('cart')) {
        toggleCart();
    }
};

function openCheckout() {
    window.location.href = 'checkout.html';
}

// प्रोडक्ट्स array में id जोड़ें
const products = [
    {
        id: 1, // id जोड़ें
        image: "images/tresemeshampoo.PNG",
        name: "Rich Moisture Shampoo for Dry Hair",
        price: 45.95,
        quantity: 1
    },
    {
        id: 2, // id जोड़ें
        image: "images/olaplexshampoo.PNG",
        name: "Nº.4P Blonde Enhancer Toning Shampoo",
        price: 99.00,
        quantity: 1
    },
    // ... बाकी प्रोडक्ट्स में भी id जोड़ें ...
];