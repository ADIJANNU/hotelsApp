const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config();

app.get('/',function(req,res) {
    res.send('Welcome to my hotel')
})

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


//port 
app.listen(PORT, () => {
    console.log('Listening on port 3000');
})

