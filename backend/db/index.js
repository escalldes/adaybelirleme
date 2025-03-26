
// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

// PostgreSQL veritabanı bağlantı bilgileri (kendi bilgilerini gir)
const sequelize = new Sequelize('KouDb', 'postgres', 'Alpbatu26.', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

// User modelini import ediyoruz
const User = require('./models/users')(sequelize, DataTypes);
const Ilanlar = require('./models/ilanlar')(sequelize, DataTypes);


// Eğer diğer modeller varsa burada import edip ilişkileri kurabilirsin.

// Veritabanı ile bağlantıyı senkronize ediyoruz.
// Bu işlem tablo varsa yapıyı kontrol eder, yoksa oluşturur.
sequelize.sync()
  .then(() => console.log('Veritabanı ve tablolar senkronize edildi!'))
  .catch(err => console.error('Senkronizasyon hatası:', err));

module.exports = {
  sequelize,
  User,
};
