module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define(
    "categories_products",
    {
      idcategory: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      category: { type: dataTypes.STRING },
    },
    { timestamps: false }
  );
  return Category;
};
