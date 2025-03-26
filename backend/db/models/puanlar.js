// db/models/puanlar.js
module.exports = (sequelize, DataTypes) => {
    const Puan = sequelize.define('puanlar', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      basvuru_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'basvurular',
          key: 'id'
        }
      },
      yayin_puani: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
      },
      proje_puani: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
      },
      ders_puani: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
      },
      idari_puan: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
      },
      danismanlik_puani: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
      },
      diger_puan: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
      },
      toplam_puan: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
      },
      guncelleme_tarihi: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'puanlar',
      timestamps: false
    });
  
    return Puan;
  };
  