const express = require('express');
const pool = require("./Config/database");
const pg = require("postgres");
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser')
const { user, password } = require('pg/lib/defaults');
const Analytics = require('analytics-node');
const analytics = new Analytics("v72P6rr0tuRQS0O4hlAMqbadseL7RtJB");
const port = 5000;

const db = require('./Config/database');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');


// test connection 
  db.authenticate()
  .then(()=>console.log('database is connected'))
  .catch(err=>console.log('error'+ err))

const app = express();

var hbs = handlebars.create({ layoutsDir: 'views/layouts', defaultLayout:'main'});

//body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>  res.render('index'));

app.use('/users', require('./Routes/users'));


age = 20;
console.log('this is me ' + 'kamil Mirza full stack developer age ' + age);
const PORT = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


