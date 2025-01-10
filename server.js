const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
const passport = require('./auth')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");

app.use(bodyParser.json())
dotenv.config();

const logRequest = (req,res,next) => {
    console.log(`[{${new Date().toLocaleString()}}] Request made to : ${req.originalUrl} `);
    next();
}
app.use(logRequest);

app.use(passport.initialize());
const localMiddleWare = passport.authenticate('local', {session: false})

app.get('/', localMiddleWare,function(req,res) {
    res.send('Welcome to my hotel')
})

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


//port 
app.listen(PORT, () => {
    console.log('Listening on port 3000');
})

