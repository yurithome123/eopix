// server.js
const express = require('express');
const path = require('path');

const app = express();

// Configura o parser para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a pasta pública para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para processar doações
app.post('/donate', (req, res) => {
  const { amount } = req.body;
  // Converte para número e valida o valor
  const donationValue = parseFloat(amount);
  if (isNaN(donationValue) || donationValue <= 0) {
    return res.status(400).json({ success: false, message: 'Valor inválido para doação.' });
  }

  // Distribuição hipotética: 70% para o desenvolvedor e 30% para a organização
  const donationData = {
    total: donationValue,
    developer: donationValue * 0.7,
    organization: donationValue * 0.3
  };

  console.log('Doação recebida:', donationData);
  // Responde com os dados da doação
  res.json({ success: true, donationData });
});

// Inicia o servidor na porta 3000 (ou porta definida na variável de ambiente PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
