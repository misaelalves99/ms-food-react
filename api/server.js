// Carregar as variáveis de ambiente com import
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const port = 5000;  // Porta do backend

// Usando a variável de ambiente
const apiUrl = process.env.API_URL || 'http://localhost:3001'; // Fallback para localhost caso não esteja configurado

app.get('/', (req, res) => {
  res.send(`A API está rodando em: ${apiUrl}`);
});

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
