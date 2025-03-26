// db/index.js
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('KouDb', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const db = {};

// db/models klasöründeki tüm .js dosyalarını yükleyelim:
const modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

/* İlişkilendirmeler */

// 1. Users ↔ Basvurular
if (db.users && db.basvurular) {
  db.users.hasMany(db.basvurular, { foreignKey: 'kullanici_id' });
  db.basvurular.belongsTo(db.users, { foreignKey: 'kullanici_id' });
}

// 2. Ilanlar ↔ Basvurular
if (db.ilanlar && db.basvurular) {
  db.ilanlar.hasMany(db.basvurular, { foreignKey: 'ilan_id' });
  db.basvurular.belongsTo(db.ilanlar, { foreignKey: 'ilan_id' });
}

// 2.1. Users ↔ Ilanlar (ilanı oluşturan kullanıcı)
if (db.users && db.ilanlar) {
  db.users.hasMany(db.ilanlar, { foreignKey: 'olusturan_id' });
  db.ilanlar.belongsTo(db.users, { foreignKey: 'olusturan_id' });
}

// 3. Basvurular ↔ Belgeler
if (db.basvurular && db.belgeler) {
  db.basvurular.hasMany(db.belgeler, { foreignKey: 'basvuru_id' });
  db.belgeler.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 4. Basvurular ↔ Degerlendirmeler
if (db.basvurular && db.degerlendirmeler) {
  db.basvurular.hasMany(db.degerlendirmeler, { foreignKey: 'basvuru_id' });
  db.degerlendirmeler.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 4.1. Users (as Jüri) ↔ Degerlendirmeler
if (db.users && db.degerlendirmeler) {
  db.users.hasMany(db.degerlendirmeler, { foreignKey: 'juri_id' });
  db.degerlendirmeler.belongsTo(db.users, { foreignKey: 'juri_id' });
}

// 5. Basvurular ↔ Yayinlar
if (db.basvurular && db.yayinlar) {
  db.basvurular.hasMany(db.yayinlar, { foreignKey: 'basvuru_id' });
  db.yayinlar.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 6. Basvurular ↔ Projeler
if (db.basvurular && db.projeler) {
  db.basvurular.hasMany(db.projeler, { foreignKey: 'basvuru_id' });
  db.projeler.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 7. Basvurular ↔ Ders_Yukleri
if (db.basvurular && db.ders_yukleri) {
  db.basvurular.hasMany(db.ders_yukleri, { foreignKey: 'basvuru_id' });
  db.ders_yukleri.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 8. Basvurular ↔ Idari_Gorevler
if (db.basvurular && db.idari_gorevler) {
  db.basvurular.hasMany(db.idari_gorevler, { foreignKey: 'basvuru_id' });
  db.idari_gorevler.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 9. Basvurular ↔ Diger_Faaliyetler
if (db.basvurular && db.diger_faaliyetler) {
  db.basvurular.hasMany(db.diger_faaliyetler, { foreignKey: 'basvuru_id' });
  db.diger_faaliyetler.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 10. Basvurular ↔ Danismanliklar
if (db.basvurular && db.danismanliklar) {
  db.basvurular.hasMany(db.danismanliklar, { foreignKey: 'basvuru_id' });
  db.danismanliklar.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

// 11. Basvurular ↔ Puanlar (1:1 ilişki)
if (db.basvurular && db.puanlar) {
  db.basvurular.hasOne(db.puanlar, { foreignKey: 'basvuru_id' });
  db.puanlar.belongsTo(db.basvurular, { foreignKey: 'basvuru_id' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Tabloları otomatik oluştur (eğer veritabanında yoksa)
sequelize.sync()
  .then(() => console.log('Veritabanı ve tablolar senkronize edildi!'))
  .catch(err => console.error('Senkronizasyon hatası:', err));

module.exports = db;