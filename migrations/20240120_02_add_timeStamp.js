const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
      const transaction = await queryInterface.sequelize.transaction();
    
      try {
        await queryInterface.addColumn('notes', 'createdAt', {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
        }, { transaction });
  
        await queryInterface.addColumn('notes', 'updatedAt', {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
        }, { transaction });
  
        await queryInterface.addColumn('users', 'createdAt', {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
        }, { transaction });
  
        await queryInterface.addColumn('users', 'updatedAt', {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
        }, { transaction });
  
        await queryInterface.addColumn('blogs', 'createdAt', {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
        }, { transaction });
  
        await queryInterface.addColumn('blogs', 'updatedAt', {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
        }, { transaction });
  
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    },
    down: async ({ context: queryInterface }) => {
      const transaction = await queryInterface.sequelize.transaction();
    
      try {
        await queryInterface.removeColumn('notes', 'createdAt', { transaction });
        await queryInterface.removeColumn('notes', 'updatedAt', { transaction });
        await queryInterface.removeColumn('users', 'createdAt', { transaction });
        await queryInterface.removeColumn('users', 'updatedAt', { transaction });
        await queryInterface.removeColumn('blogs', 'createdAt', { transaction });
        await queryInterface.removeColumn('blogs', 'updatedAt', { transaction });
  
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    },
  }
  