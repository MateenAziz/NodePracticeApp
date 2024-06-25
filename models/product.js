const fs = require('fs');
const path = require('path');
const pool = require("../util/dbUtils");
const sequelize = require("../util/dbUtils");
const { type } = require('os');
const { DataTypes, Sequelize } = require('sequelize');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const Product = sequelize.define('products', {
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title:{
    type:Sequelize.STRING,
    allowNull: false
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl:{
    type:Sequelize.TEXT,
    allowNull: false
  },
  description:{
    type:Sequelize.TEXT,
    allowNull: false
  },
},
{
  tableName: "products"
}
);

module.exports = Product;
   