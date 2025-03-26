module.exports = (sequelize, DataTypes) => {
    const Basvuru = sequelize.define('basvurular', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kullanici_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ilan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      durum: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Beklemede'
      },
      basvuru_tarihi: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      guncelleme_tarihi: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      toplam_puan: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
      }
    }, {
      tableName: 'basvurular',
      timestamps: false
    });
  
    return Basvuru;
  };
  