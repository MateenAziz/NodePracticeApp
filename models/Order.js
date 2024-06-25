const { Sequelize } = require("sequelize");
const sequelize = require("../util/dbUtils");

exports.Order = sequelize.define('Order', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true, 
        allownull: false
    },
})