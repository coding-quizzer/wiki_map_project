const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('register');
});


router.post('/'), (req, res) => {
  res.redirect('/maps');
// ERROR - Duplicate username OR blank password/username
};

module.exports = router;