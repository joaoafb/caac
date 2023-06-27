const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login', 'login.html'));
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});