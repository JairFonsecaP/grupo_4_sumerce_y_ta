module.exports = (sequelize, dataTypes) => {
  const Size = sequelize.define(
    "Sizes",
    {
      idsize: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      size: { type: dataTypes.STRING },
    },
    { timestamps: false }
  );

  Size.associate = (models) => {
    Size.belongsToMany(models.Products, {
      as: "products",
      through: "ProductsSizes",
      foreignKey: "size_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };
  return Size;
};
