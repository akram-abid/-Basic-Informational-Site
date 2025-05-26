const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const query = url.parse(req.url);
    let filePath;

    if (
        query.pathname === '/about' ||
        query.pathname === '/index' ||
        query.pathname === '/contact-me'
    ) {
        filePath = `.${query.pathname}.html`;
    } else {
        filePath = './404.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Internal Server Error</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

