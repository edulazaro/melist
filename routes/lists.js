const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req,res) => {
    if (!req.params.id.isInteger()) {
        var err =  new Error("Not Foune");
        err,status = 404;
        next(err);
    } else {
        next();
    }
}, (req, res) => {
    res.render('card', {
        //get data from sqlite req.query.id (use mongo lite)
    });

});

router.get('/add', (req, res) => {
    //add data to sqlite from req.params.id (use mongo lite)
});


module.exports = router;