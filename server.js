const http = require('http');

const PORT = process.env.PORT || 3000;

const products = [
    { id: 1, name: 'Wireless Headphones', desc: 'Noise-cancelling Bluetooth headphones', price: 79.99, img: 'Headphones' },
    { id: 2, name: 'Smart Watch', desc: 'Fitness tracker with heart rate monitor', price: 149.99, img: 'Watch' },
    { id: 3, name: 'Laptop Stand', desc: 'Ergonomic aluminum laptop stand', price: 39.99, img: 'Stand' },
    { id: 4, name: 'USB-C Hub', desc: '7-in-1 USB-C adapter', price: 29.99, img: 'Hub' },
    { id: 5, name: 'Mechanical Keyboard', desc: 'RGB mechanical keyboard', price: 89.99, img: 'Keyboard' },
    { id: 6, name: 'Webcam HD', desc: '1080p webcam with microphone', price: 49.99, img: 'Webcam' }
];

const deals = [
    { id: 7, name: 'Wireless Mouse', desc: 'Ergonomic wireless mouse - TODAY ONLY', price: 19.99, originalPrice: 39.99, img: 'Mouse' },
    { id: 8, name: 'Phone Charger', desc: 'Fast wireless charging pad - 50% OFF', price: 14.99, originalPrice: 29.99, img: 'Charger' },
    { id: 9, name: 'Bluetooth Speaker', desc: 'Portable waterproof speaker - LIMITED', price: 34.99, originalPrice: 69.99, img: 'Speaker' }
];

function renderProductCard(product) {
    const dealBadge = product.originalPrice ? `<span style="background:#e74c3c;color:white;padding:2px 8px;border-radius:4px;font-size:0.8rem;">DEAL</span>` : '';
    const priceHtml = product.originalPrice 
        ? `<p class="price"><s style="color:#999;font-size:0.9rem;">$${product.originalPrice.toFixed(2)}</s> $${product.price.toFixed(2)}</p>`
        : `<p class="price">$${product.price.toFixed(2)}</p>`;
    
    return `
        <div class="card">
          <img src="https://via.placeholder.com/200?text=${product.img}" alt="${product.name}">
          <h3>${product.name} ${dealBadge}</h3>
          <p>${product.desc}</p>
          ${priceHtml}
          <form method="POST" action="/cart/add">
            <input type="hidden" name="productId" value="${product.id}">
            <button class="btn" type="submit">Add to Cart</button>
          </form>
        </div>`;
}

function renderPage(showDeals) {
    const productCards = products.map(renderProductCard).join('\n');
    const dealCards = deals.map(renderProductCard).join('\n');
    
    const dealsSection = showDeals ? `
    <div class="container" style="margin-top:2rem;">
      <h1 style="color:#e74c3c;">🔥 Today's Deals</h1>
      <p style="margin-bottom:1rem;color:#666;">Limited time offers - grab them before they're gone!</p>
      <div class="grid">${dealCards}</div>
    </div>` : '';

    return `<!DOCTYPE html>
<html>
<head>
  <title>E-Commerce Store</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #f5f5f5; }
    nav { background: #232f3e; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #ff9900; text-decoration: none; margin-left: 1rem; }
    .container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
    h1 { color: #232f3e; margin-bottom: 1.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
    .card { background: white; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .card img { width: 100%; border-radius: 4px; }
    .card h3 { margin: 0.5rem 0; }
    .price { color: #b12704; font-size: 1.2rem; font-weight: bold; }
    .btn { background: #ff9900; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .btn:hover { background: #e88a00; }
    .banner { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 1rem 2rem; text-align: center; }
    .banner a { color: #ffd700; }
  </style>
</head>
<body>
  <nav>
    <strong>🛒 E-Commerce Store</strong>
    <div>
      <a href="/">Products</a>
      <a href="/deals">Today's Deals</a>
      <a href="/cart">Cart (0)</a>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
    </div>
  </nav>
  <div class="banner">🔥 NEW: Check out <a href="/deals">Today's Deals</a> - Up to 50% off selected items!</div>
  <div class="container">
    <h1>Products</h1>
    <div class="grid">${productCards}</div>
  </div>
  ${dealsSection}
  <footer style="text-align:center;padding:2rem;color:#666;margin-top:2rem;">
    <p>Deployed via CI/CD Pipeline | Last updated: ${new Date().toISOString()}</p>
  </footer>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
        return;
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderPage(false));
        return;
    }

    if (req.url === '/deals') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderPage(true));
        return;
    }

    if (req.url === '/api/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
        return;
    }

    if (req.url === '/api/deals') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deals));
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1><p><a href="/">Go back to store</a></p>');
});

server.listen(PORT, () => {
    console.log(`E-commerce server running on port ${PORT}`);
});
