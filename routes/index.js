const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mid = require('../middleware');


let user = {
    'name': 'Edu'
};

let list = {
    'id': 1,
    'name': 'default'
};


router.get('/', (req, res) => {
    res.render('index', {'user': user, 'list': list});
});

router.post('/', (req, res) => {
    res.render('index', {'user': user, 'list': list, "name": req.body.child_name});
});

router.get('/login', mid.loggedOut, (req, res) => {
    return res.render('login');
});

route.post('/login', (req, res) => {
    if (req.body,email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if(error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.iser_id = user.id;
                return res.redirect('/');
            }
        })
    } else {
        var err = new Error('Email and password are required');
        err.status = 401;
        return next(err);
    }
    return res.render('login');
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.get('/register', mid.loggedOut, (req, res, next) => {
    res.render('register');
});


router.get('/register', (req, res, next) => {
    if (req.body.user_email && req.body.user_password && req.body.user_confirm_password) {
        if (req.body.user_password && req.body.user_confirm_password) {
            var err = new Error('The passwords  do not match');
            err.status = 400;
            return next(err);
        }

        var userData = {
            email: req.body.email;
            name: req.body.name;
        }

        User.create(userData, (error, user) => {
            if (error) {
                return next(error);
            } else {
                return res.redirect('/');
            }
        });

    } else {
        var err = new Error('YOu should input all fields');
        err.status = 400;
        return next(err);
    }
});

router.get('/profile', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.user_id)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render('profile', { title: 'Profile', name: user.name });
            }
        });
});


router.get('/lists', (req, res) => {
    res.render('lists', {'user': user, 'lists': lists});
});


router.get('/logout', (req, res) => {
    res.clearCookie('user');
});

module.exports = router;