module.exports = (sequelize, dataTypes) => {
  const Region = sequelize.define(
    "regions",
    {
      idregion: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      name: { type: dataTypes.STRING },
      ordinal: { type: dataTypes.STRING },
    },
    { timestamps: false }
  );
  return Region;
};
