const {DataTypes}  = require('sequelize')
module.exports = {

    up: async ({context: queryInterface}) => {
        await queryInterface.addColumn('reading_lists', 'state', {
            type: DataTypes.ENUM('unread', 'read'),
            allowNull: false,
            defaultValue: 'unread'
        })
    },
    
    down: async ({context: queryInterface}) => {
        await queryInterface.removeColumn('reading_lists', 'state')
    },
}