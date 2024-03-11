const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.user, process.env.password, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  });

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
});

// Sync the model with the database (creates the table if it doesn't exist)
User.sync();

module.exports = User;
