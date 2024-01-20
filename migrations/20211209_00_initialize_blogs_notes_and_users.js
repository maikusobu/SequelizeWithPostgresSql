const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    const transaction = await queryInterface.sequelize.transaction();
  
    try {
      const tableNames = await queryInterface.sequelize.getQueryInterface().showAllTables();
  
      if (!tableNames.includes('notes')) {
        await queryInterface.createTable('notes', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          important: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
          date: {
            type: DataTypes.TIME,
          },
        }, { transaction });
      }
  
      if (!tableNames.includes('users')) {
        await queryInterface.createTable('users', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
        }, { transaction });
      }
  
      if (!tableNames.includes('blogs')) {
        await queryInterface.createTable('blogs', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author: {
            type: DataTypes.CHAR(10),
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
        }, { transaction });
      }
   
        await queryInterface.addColumn('notes', 'user_id', {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        }, { transaction });
   
  
  
        await queryInterface.addColumn('blogs', 'user_id', {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        }, { transaction });
    
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('notes')
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('blogs')
  },
}