// db/models/ilanlar.js
module.exports = (sequelize, DataTypes) => {
  const Ilan = sequelize.define('ilanlar', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    baslik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aciklama: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gerekli_belgeler: {
      // Adaylardan hangi belgeleri zorunlu tutmak istiyorsanız, admin bunları çoklu-checkbox ile belirler.
      // JSON dizisi tutabilirsiniz. Örnek: ["CV", "Doktora Diploması", "Atıf Listesi"]
      type: DataTypes.JSON,
      allowNull: true,
    },
    baslangic_tarihi: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    bitis_tarihi: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    olusturan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    olusturulma_tarihi: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'ilanlar',
    timestamps: false
  });

  return Ilan;
};
