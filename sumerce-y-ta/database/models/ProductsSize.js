module.exports = (sequelize, dataTypes) => {
  const ProductsSizes = sequelize.define(
    "productssizes",
    {
      idproductssizes: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      product_id: { type: dataTypes.INTEGER },
      size_id: { type: dataTypes.INTEGER },
    },
    { timestamps: false }
  );

  return ProductsSizes;
};
