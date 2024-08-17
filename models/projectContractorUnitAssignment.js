module.exports = (sequelize, DataTypes) => {
    const ProjectContractorUnitAssignment = sequelize.define('ProjectContractorUnitAssignment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      contractorUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ContractorUnits',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserTables',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserTables',
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
  
    ProjectContractorUnitAssignment.associate = function(models) {
        ProjectContractorUnitAssignment.belongsTo(models.Project, { foreignKey: 'projectId' });
        ProjectContractorUnitAssignment.belongsTo(models.ContractorUnit, { foreignKey: 'contractorUnitId' });
        ProjectContractorUnitAssignment.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
        ProjectContractorUnitAssignment.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    };
  
    return ProjectContractorUnitAssignment;
  };
  