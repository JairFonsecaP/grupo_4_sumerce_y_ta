module.exports = (sequelize, dataTypes) => {
  const Cart = sequelize.define(
    "carts",
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
    { timestamps: false }
  );
  return Cart;
};
