'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var MingoStore = require('connect-mongo')(session);

const app = express();



mongoose.connect("mongodb://localhost:27017/toshopme");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



app.use(session({
    secret: 'secretttt',
    resave: true,
    saveUnitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })

}));

// Make user ID available in templates without passing it in each call
app.use((req, res, next) => {
  res.locals.current_user = req. session.user_id;
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('public'));


app.set('view engine', 'pug');

const routes = require('./routes');
const list_routes = require('./routes/lists');

app.use(routes);
app.use('list',list_routes);


app.use((req, res, next) => {
    if (req.cookies.user) {
        res.redirect('/');
    }
});


// Catch 404 and forward to error handler
app.use( (req, res, next) => {
    var err = new Error ("404 Not Found");
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) {
    res.status(err.status || 500);
    res.json({
       error: {
           message: err.message;
       }
    });

});


app.listen(3000, () => {

});