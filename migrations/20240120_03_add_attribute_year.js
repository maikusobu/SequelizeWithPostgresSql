const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    const transaction = await queryInterface.sequelize.transaction();
  
    try {
      await queryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: new Date().getFullYear(),
        validate: {
          min: 1991,
          max: {
            args: new Date().getFullYear(),
            msg: 'Year must be at least 1991 and not greater than the current year.'
          }
        }
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
      await queryInterface.removeColumn('blogs', 'year', { transaction });
  
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
}
