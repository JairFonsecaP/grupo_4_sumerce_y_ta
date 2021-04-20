module.exports = (sequelize, dataTypes) => {
  const Comuna = sequelize.define(
    "comunas",
    {
      idcomuna: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      name: { type: dataTypes.STRING },
      region_id: { type: dataTypes.INTEGER },
    },
    { timestamps: false }
  );
  return Comuna;
};
