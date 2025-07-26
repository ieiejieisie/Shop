let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const totalElem = document.getElementById('total');
  const cartCount = document.getElementById('cart-count');
  const orderLink = document.getElementById('order-link');

  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      ${item.name} – ${item.price} грн 
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });

  totalElem.textContent = `Загалом: ${total} грн`;
  cartCount.textContent = cart.length;

  // Формуємо посилання на Telegram
  let message = '🛍 Замовлення:%0A';
  cart.forEach(item => {
    message += `• ${item.name} – ${item.price} грн%0A`;
  });
  message += `%0AЗагальна сума: ${total} грн`;

  orderLink.href = `https://t.me/share/url?url=&text=${encodeURIComponent(message)}`;
}

updateCartDisplay(); // запуск при завантаженні