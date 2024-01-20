const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')
class Blog extends Model {}
Blog.init({
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
    },
    year: {
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
    },
    userId: {
        type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
    }

}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})
module.exports = Blog