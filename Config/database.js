
const { Sequelize } = require('sequelize');
module.exports = new Sequelize('expressapp', 'postgres', 'Mirza2022', {
    host: 'localhost',
    dialect: 'postgres',
});


