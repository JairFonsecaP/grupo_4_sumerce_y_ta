module.exports = (sequelize, dataTypes) => {
  const Region = sequelize.define(
    "Regions",
    {
      idregion: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      name: { type: dataTypes.STRING },
      ordinal: { type: dataTypes.STRING },
    },
    {
      tableName: "regions",
      timestamps: false,
    }
  );

  Region.associate = function (models) {
    Region.hasMany(models.Comunas, {
      foreignKey: "region_id",
      as: "comunas",
    });
  };
  return Region;
};
