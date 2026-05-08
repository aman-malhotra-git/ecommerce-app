const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
        return;
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            app: 'E-commerce API',
            version: '1.0.0',
            endpoints: ['/health', '/products']
        }));
        return;
    }

    if (req.url === '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([
            { id: 1, name: 'Widget', price: 9.99 },
            { id: 2, name: 'Gadget', price: 19.99 },
            { id: 3, name: 'Doohickey', price: 29.99 }
        ]));
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log(`E-commerce server running on port ${PORT}`);
});
