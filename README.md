METHOD	ENDPOINT	ROL	AMAÇ
POST	/api/auth/register	Herkes	Yeni kullanıcı kaydı oluşturur. (TC, ad, soyad, email, şifre gibi bilgiler istenir)
POST	/api/auth/login	Herkes	Kullanıcı giriş yapar, JWT token döndürür. (Body: { tc, sifre })
GET	/api/users/profile	aday / admin	Token’daki kullanıcının profil bilgilerini döndürür (ad, soyad, email, rol, vs.).
POST	/api/admin/ilanlar	admin	Yeni ilan oluşturur. Body’de ilan bilgileri (baslik, aciklama, kategori, baslangic_tarihi, bitis_tarihi, gerekli_belgeler).
PUT	/api/admin/ilanlar/:id	admin	Belirtilen :id ilanı günceller. Body’de sadece güncellenmek istenen alanları (örn. baslik, gerekli_belgeler) gönderebilirsiniz.
DELETE	/api/admin/ilanlar/:id	admin	Belirtilen :id ilana ait kaydı siler.
GET	/api/admin/ilanlar (opsiyonel)	admin	Admin’in tüm ilan kayıtlarını listeleyebilir.
GET	/api/ilanlar	Herkes / Aday	Public olarak ilanları listeler (aday tarafında “son eklenen ilanlar” vb. için kullanılır).
POST	/api/basvurular	aday	Yeni başvuru oluşturur (Body: { "ilan_id": 5 }). Sunucu, aynı ilan için tekrar başvuru engeli vs. kontrol edebilir.
GET	/api/basvurular	aday	Adayın kendi tüm başvurularını döndürür.
DELETE	/api/basvurular/:id	aday	Aday, durumu “Beklemede” olan bir başvurusunu iptal / silme talebinde bulunabilir.
GET	/api/basvurular/all	admin	Admin, sistemdeki tüm başvuruları görüntüler.
PUT	/api/basvurular/:id/status	admin	Belirli bir başvurunun durum alanını günceller (“Onaylandı”, “Reddedildi” vb.). Body: { "durum": "Onaylandı" }
POST	/api/belgeler (opsiyonel)	aday	Aday, herhangi bir başvuruya ait belgeyi (örn. CV, Atıf, Diploma) dosya olarak yükler. Model: belgeler.js, Body’de (basvuru_id, belge_turu).
