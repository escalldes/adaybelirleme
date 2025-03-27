// routes/publicIlanlar.js

const express = require('express');
const router = express.Router();

// 'ilanlar' modelini db'den alıyoruz.
// db/index.js dosyanızda, modelleri "db" objesi içinde export ettiğinizi varsayıyoruz.
const { ilanlar: Ilan } = require('../db');

// Herkese açık ilan listeleme endpoint'i
router.get('/', async (req, res) => {
  try {
    const ilanlar = await Ilan.findAll();
    res.json({ ilanlar });
  } catch (err) {
    console.error('İlanlar getirilirken hata oluştu:', err);
    res.status(500).json({ error: 'İlanlar getirilirken hata oluştu' });
  }
});


module.exports = router;
