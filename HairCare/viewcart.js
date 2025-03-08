document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    renderCartItems(cartItems);
});

function renderCartItems(cart) {
    const cartItemsContainer = document.querySelector(".cart-items");
    // Clear existing items except the header row
    while (cartItemsContainer.children.length > 1) {
        cartItemsContainer.removeChild(cartItemsContainer.lastChild);
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div>
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${(item.price).toFixed(2)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <input type="number" value="${item.quantity}" class="quantity-input" readonly>
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <span class="item-subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    updateTotal(cart);
}

function updateTotal(cart) {
    let subtotal = 0;
    let total = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    total = subtotal;

    document.getElementById('subtotal-value').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total-value').textContent = `$${total.toFixed(2)}`;
}

function changeQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            cart = cart.filter(item => item.id !== id);
        }
        localStorage.setItem('cartItems', JSON.stringify(cart));
        renderCartItems(cart);
    }
}