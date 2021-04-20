module.exports = (sequelize, dataTypes) => {
  const Cart = sequelize.define(
    "Carts",
    {
      idcart: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      quantity: { type: dataTypes.INTEGER },
      price: { type: dataTypes.INTEGER },
      user_id: { type: dataTypes.INTEGER },
    },
    { tableName: "carts", timestamps: false }
  );
  Cart.associate = (models) => {
    Cart.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "usuario",
    });
  };
  return Cart;
};
