module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    siteName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserTables', // Reference to UserTable table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserTables', // Reference to UserTable table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  });

  Site.associate = function(models) {
    Site.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    Site.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
  };

  return Site;
};
