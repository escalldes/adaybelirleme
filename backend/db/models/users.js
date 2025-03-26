// models/users.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // pgAdmin4'te otomatik artan olacak
    },
    tc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // TC kimlik numarası benzersiz olmalı
    },
    ad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soyad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dogumYili: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'dogumyili'  // Veritabanındaki sütun adı küçük harflerle
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sifre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'aday',  // Varsayılan rol aday (candidate)
    }
  }, {
    tableName: 'users',   // Veritabanındaki tablo adı
    timestamps: false     // createdAt/updatedAt kullanmıyorsanız
  });

  return User;
};
 