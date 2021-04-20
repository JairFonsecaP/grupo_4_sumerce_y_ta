module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define(
    "products",
    {
      idproduct: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      name: { type: dataTypes.STRING },
      photo: { type: dataTypes.STRING },
      description: { type: dataTypes.STRING },
      price: { type: dataTypes.DECIMAL },
      category_id: { type: dataTypes.INTEGER },
    },
    { timestamps: false }
  );
  return Product;
};
