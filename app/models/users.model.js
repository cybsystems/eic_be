module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  });

  return Tutorial;
};
