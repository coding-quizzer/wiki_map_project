const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/'), (req, res) => {
  res.redirect('/maps');
  // ERROR - if password or username != then show appropriate error messages
};

module.exports = router;
