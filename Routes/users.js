const { text } = require('body-parser');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { use } = require('express/lib/router');
const { user } = require('pg/lib/defaults');
const { DataTypes } = require('sequelize');
const database = require('../Config/database');
const db = require('../Config/database');
const Sequelize = require('sequelize');
const Analytics = require('analytics-node');
const analytics = new Analytics("v72P6rr0tuRQS0O4hlAMqbadseL7RtJB");
const Op = Sequelize.Op;
const router = express.Router();
const Gig = require('../Models/Gig');

//display the form
router.get('/', (req, res) =>
  Gig.findAll()
    .then(users => {
      res.render('users', {
        users
      });
    })
    .catch(err => console.log(err)));

//display gig form
router.get('/add', (req, res) => res.render('add'));

// add gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, Contact_email } = req.body;

  let errors = [];

  if (!title) {
    errors.push({ text: 'please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'please add technologies' });
  }
  if (!budget) {
    errors.push({ text: 'please add budget' });
  }
  if (!description) {
    errors.push({ text: 'please add description' });
  }
  if (!Contact_email) {
    errors.push({ text: 'please add Contact_email' });
  }

  //check for errors

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      Contact_email
    });

  } else

    if (!budget)
      budget = 'unknown';
    else {
      budget =`$${budget}`;
    }

  technologies = technologies.toLowerCase().replace(/, /g, ',');
  {

    Gig.create({

      title,
      technologies,
      description,
      budget,
      Contact_email,
    })
      .then(Gig => res.redirect('/users'))
      .catch(err => console.log(err));

  }

});


router.get('/search', (req, res) => {
  const { term } = req.query;

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' }}})
    .then(users => res.render('users', { users }))
    .catch(err => console.log(err))

});

module.exports = router;