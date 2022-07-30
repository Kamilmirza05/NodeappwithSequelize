const { type } = require('express/lib/response');
const Sequelize = require("sequelize");
const db = require('../Config/database');

// to add user
const Gig = db.define('users', {
    title: {
        type: Sequelize.STRING,
    },
    technologies: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    budget: {
        type: Sequelize.STRING,
    },
    Contact_email: {
        type: Sequelize.STRING,
    }
})
module.exports = Gig;

