module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define(
    "Categories",
    {
      idcategory: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      category: { type: dataTypes.STRING },
    },
    { tableName: "categories_products", timestamps: false }
  );
  Category.associate = (models) => {
    Category.hasMany(models.Products, {
      foreignKey: "category_id",
      as: "products",
    });
  };
  return Category;
};
