const { Sequelize } = require("sequelize");
const sequelize = require("../util/dbUtils");

exports.OrderItem = sequelize.define('OrderItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
})