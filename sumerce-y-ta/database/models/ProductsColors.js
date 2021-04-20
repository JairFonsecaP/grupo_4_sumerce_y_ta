module.exports = (sequelize, dataTypes) => {
  const ProductsColors = sequelize.define(
    "productscolors",
    {
      idproductscolor: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      product_id: { type: dataTypes.INTEGER },
      color_id: { type: dataTypes.INTEGER },
    },
    { timestamps: false }
  );

  return ProductsColors;
};
