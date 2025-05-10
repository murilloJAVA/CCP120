const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Define o diretório onde estão os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Inicia o servidor na porta 80
server.listen(80, () => {
    console.log("Servidor rodando em http://localhost");
});
