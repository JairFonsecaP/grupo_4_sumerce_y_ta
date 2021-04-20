module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      iduser: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      name: { type: dataTypes.STRING },
      phone: { type: dataTypes.STRING },
      photo: { type: dataTypes.STRING },
      email: { type: dataTypes.STRING },
      password: { type: dataTypes.STRING },
      comuna_id: { type: dataTypes.INTEGER },
    },
    { tableName: "users", timestamps: false }
  );

  User.associate = (models) => {
    User.belongsTo(models.Comunas, {
      foreignKey: "comuna_id",
      as: "comuna",
    });
    User.hasMany(models.Carts, {
      foreignKey: "user_id",
      as: "compras",
    });
  };

  return User;
};
