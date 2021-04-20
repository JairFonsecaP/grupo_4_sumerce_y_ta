module.exports = (sequelize, dataTypes) => {
  const ProductsSizes = sequelize.define(
    "ProductsSizes",
    {
      idproductssizes: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      product_id: { type: dataTypes.INTEGER },
      size_id: { type: dataTypes.INTEGER },
    },
    { tableName: "productsizes", timestamps: false }
  );

  return ProductsSizes;
};
