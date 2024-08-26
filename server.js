// Importar pacotes
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configurações
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://luisfelipe:abc123123@cristianoronaldo.x3nyw.mongodb.net/?retryWrites=true&w=majority&appName=CRISTIANORONALDO'; // Substitua pela sua URI

// Middleware
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o Schema e o Model
const historySchema = new mongoose.Schema({
    userId: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

// Endpoint para registrar o histórico
app.post('/api/history', async (req, res) => {
    const { userId, message } = req.body;
    if (!userId || !message) {
        return res.status(400).json({ error: 'userId e message são obrigatórios' });
    }

    try {
        const newHistory = new History({ userId, message });
        await newHistory.save();
        res.status(201).json(newHistory);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o histórico' });
    }
});

// Rota raiz
app.get('/', (req, res) => {
    res.send('Servidor está rodando');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
