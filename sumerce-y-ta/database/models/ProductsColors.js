module.exports = (sequelize, dataTypes) => {
  const ProductsColors = sequelize.define(
    "ProductsColors",
    {
      idproductscolor: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      product_id: { type: dataTypes.INTEGER },
      color_id: { type: dataTypes.INTEGER },
    },
    { tableName: "productscolors", timestamps: false }
  );

  return ProductsColors;
};
