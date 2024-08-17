module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserTables', // This is the table name in the database
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserTables', // This is the table name in the database
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
    Project.associate = function(models) {
        Project.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
        Project.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    };
    return Project;
  };
  