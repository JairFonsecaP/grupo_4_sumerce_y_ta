module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define(
    "Products",
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
    { tableName: "products", timestamps: false }
  );
  Product.associate = (models) => {
    Product.belongsTo(models.Categories, {
      foreignKey: "category_id",
      as: "categoria",
    });
    Product.belongsToMany(models.Colors, {
      as: "colors",
      through: "productscolors",
      otherKey: "color_id",
      foreignKey: "product_id",
      timestamps: false,
    });

    Product.belongsToMany(models.Sizes, {
      as: "sizes",
      through: "ProductsSizes",
      otherKey: "size_id",
      foreignKey: "product_id",
      timestamps: false,
    });
  };

  return Product;
};
