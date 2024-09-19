const Sequelize= require('sequelize');

const sequelize= require('./database');

const expenseData = sequelize.define('expense', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT('tiny'),
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = expenseData;