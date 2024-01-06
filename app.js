const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();
app.use(express.static('src'));

// Read the HTML file
const htmlFilePath = 'index.html';
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');
    
    // Write the HTML content to the response
    res.write(htmlContent);
    
    // End the response
    res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
