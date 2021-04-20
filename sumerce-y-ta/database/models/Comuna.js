module.exports = (sequelize, dataTypes) => {
  const Comuna = sequelize.define(
    "Comunas",
    {
      idcomuna: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      name: { type: dataTypes.STRING },
      region_id: { type: dataTypes.INTEGER },
    },
    {
      tableName: "comunas",
      timestamps: false,
    }
  );

  Comuna.associate = (models) => {
    Comuna.belongsTo(models.Regions, {
      foreignKey: "region_id",
      as: "region",
    });
    Comuna.hasMany(models.Users, {
      foreignKey: "comuna_id",
      as: "users",
    });
  };
  return Comuna;
};
