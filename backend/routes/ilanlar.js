const express = require('express');
const router = express.Router();
const { ilanlar: Ilan } = require('../db'); // İlan modelini import ediyoruz
const authenticateToken = require('../middlewares/authenticateToken');

// Sadece admin yetkisine sahip kullanıcılar için kontrol middleware'i:
function isAdmin(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Yetersiz yetki' });
  }
  next();
}

// Yeni ilan ekleme (POST /api/admin/ilanlar)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { baslik, aciklama, kategori, baslangic_tarihi, bitis_tarihi } = req.body;
    // İlanı oluşturan kullanıcının id'sini token'dan alıyoruz.
    const newIlan = await Ilan.create({
      baslik,
      aciklama,
      kategori,
      gerekli_belgeler,
      baslangic_tarihi,
      bitis_tarihi,
      olusturan_id: req.user.id,
      olusturulma_tarihi: new Date()
    });
    res.status(201).json({ message: 'İlan oluşturuldu', ilan: newIlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'İlan oluşturulurken hata oluştu' });
  }
});

// İlan güncelleme (PUT /api/admin/ilanlar/:id)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { baslik, aciklama, kategori, gerekli_belgeler, baslangic_tarihi, bitis_tarihi } = req.body;
    const ilan = await Ilan.findByPk(id);
    if (!ilan) {
      return res.status(404).json({ error: 'İlan bulunamadı' });
    }
    // Sadece gönderilen alanları güncelliyoruz:
    ilan.baslik = baslik !== undefined ? baslik : ilan.baslik;
    ilan.aciklama = aciklama !== undefined ? aciklama : ilan.aciklama;
    ilan.kategori = kategori !== undefined ? kategori : ilan.kategori;
    ilan.gerekli_belgeler = gerekli_belgeler !== undefined ? gerekli_belgeler : ilan.gerekli_belgeler
    ilan.baslangic_tarihi = baslangic_tarihi !== undefined ? baslangic_tarihi : ilan.baslangic_tarihi;
    ilan.bitis_tarihi = bitis_tarihi !== undefined ? bitis_tarihi : ilan.bitis_tarihi;

    await ilan.save();
    res.json({ message: 'İlan güncellendi', ilan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'İlan güncellenirken hata oluştu' });
  }
});

// İlan silme (DELETE /api/admin/ilanlar/:id)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const ilan = await Ilan.findByPk(id);
    if (!ilan) {
      return res.status(404).json({ error: 'İlan bulunamadı' });
    }
    await ilan.destroy();
    res.json({ message: 'İlan silindi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'İlan silinirken hata oluştu' });
  }
});

// Tüm ilanları listeleme (GET /api/admin/ilanlar)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const ilanlar = await Ilan.findAll();
    res.json({ ilanlar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'İlanlar getirilirken hata oluştu' });
  }
});

module.exports = router;