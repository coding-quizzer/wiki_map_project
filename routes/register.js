const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

const templateVars = { userId: "" };

router.get('/', (req, res) => {
  res.render('register', templateVars);
});


router.post('/'), (req, res) => {
  res.redirect('/maps');
// ERROR - Duplicate username OR blank password/username
};

module.exports = router;
