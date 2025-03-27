const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const { basvurular: Basvuru } = require('../db');

// ▶ ADAY: Yeni başvuru oluştur
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { ilan_id } = req.body;
    const kullanici_id = req.user.id;

    const existing = await Basvuru.findOne({ where: { ilan_id, kullanici_id } });
    if (existing) return res.status(400).json({ error: 'Bu ilana zaten başvurdunuz.' });

    const yeni = await Basvuru.create({ ilan_id, kullanici_id });
    res.status(201).json(yeni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Başvuru oluşturulamadı.' });
  }
});

// ▶ ADAY: Kendi başvurularını listele
router.get('/', authenticateToken, async (req, res) => {
  try {
    const liste = await Basvuru.findAll({ where: { kullanici_id: req.user.id } });
    res.json(liste);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Başvurular getirilemedi.' });
  }
});

// ▶ ADAY: Başvuruyu sil (durumu "Beklemede" ise)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const basvuru = await Basvuru.findByPk(req.params.id);
    if (!basvuru || basvuru.kullanici_id !== req.user.id) return res.status(404).json({ error: 'Başvuru bulunamadı.' });
    if (basvuru.durum !== 'Beklemede') return res.status(400).json({ error: 'Sadece beklemedeki başvuru silinebilir.' });

    await basvuru.destroy();
    res.json({ message: 'Başvuru silindi.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Başvuru silinemedi.' });
  }
});

// ▶ ADMIN: Tüm başvuruları listele
router.get('/all', authenticateToken, async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Yetersiz yetki.' });
  const all = await Basvuru.findAll();
  res.json(all);
});

// ▶ ADMIN: Başvuru durumunu güncelle
router.put('/:id/status', authenticateToken, async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Yetersiz yetki.' });
  const { durum } = req.body;
  const basvuru = await Basvuru.findByPk(req.params.id);
  if (!basvuru) return res.status(404).json({ error: 'Başvuru bulunamadı.' });

  basvuru.durum = durum;
  basvuru.guncelleme_tarihi = new Date();
  await basvuru.save();
  res.json(basvuru);
});

module.exports = router;
