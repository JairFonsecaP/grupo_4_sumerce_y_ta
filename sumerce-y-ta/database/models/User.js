module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define(
    "users",
    {
      iduser: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      name: { type: dataTypes.STRING },
      phone: { type: dataTypes.STRING },
      photo: { type: dataTypes.STRING },
      email: { type: dataTypes.STRING },
      password: { type: dataTypes.STRING },
      comuna_id: { type: dataTypes.INTEGER },
    },
    { timestamps: false }
  );
  return User;
};
