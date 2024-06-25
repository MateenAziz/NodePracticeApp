const { Sequelize } = require("sequelize");
const sequelize = require("../util/dbUtils");

const cart = sequelize.define('Cart', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
});

module.exports = cart;