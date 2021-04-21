module.exports = (sequelize, dataTypes) => {
  const ProductsInCart = sequelize.define(
    "productincarts",
    {
      productIncart: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      product_id: { type: dataTypes.INTEGER },
      cart_id: { type: dataTypes.INTEGER },
    },
    { timestamps: false }
  );

  return ProductsInCart;
};
