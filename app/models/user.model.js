const UserModel = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "admin", // default role
    },
  });

  return User;
};

module.exports = UserModel;
