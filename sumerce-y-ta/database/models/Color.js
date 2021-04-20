module.exports = (sequelize, dataTypes) => {
  const Color = sequelize.define(
    "colors",
    {
      idcolor: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      color: { type: dataTypes.STRING },
    },
    { timestamps: false }
  );
  return Color;
};
