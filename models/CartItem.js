const { Sequelize } = require("sequelize");
const sequelize = require("../util/dbUtils");
const cart = require("./Cart");

const cartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = cartItem;