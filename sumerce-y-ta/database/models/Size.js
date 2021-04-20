module.exports = (sequelize, dataTypes) => {
  const Size = sequelize.define(
    "sizes",
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
  return Size;
};
