module.exports = (sequelize, dataTypes) => {
  const Color = sequelize.define(
    "Colors",
    {
      idcolor: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      color: { type: dataTypes.STRING },
    },
    { tableName: "colors", timestamps: false }
  );
  Color.associate = (models) => {
    Color.belongsToMany(models.Products, {
      as: "products",
      through: "productscolors",
      foreignKey: "color_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };
  return Color;
};
