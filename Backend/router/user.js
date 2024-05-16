const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.get('/register', async (req, res) => {
  try {
    // Extrair dados dos parâmetros da requisição
    const { firstName, lastName, email, password, phoneNumber, imageUrl, admin } = req.query;

    // Criar um novo usuário usando o modelo User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      imageUrl,
      admin,
    });

    // Salvar o novo usuário no banco de dados
    const savedUser = await newUser.save();

    // Responder com o novo usuário criado
    res.status(201).json(savedUser);
  } catch (error) {
    // Se ocorrer algum erro, responder com uma mensagem de erro
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

module.exports = router;
