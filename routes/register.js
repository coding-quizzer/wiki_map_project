const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

const templateVars = {};

router.use((req, res, next) => {
  templateVars.userId = req.session.userId;
  next();
});

router.get('/', (req, res) => {
  templateVars.id = req.params.id;
  res.render('register', templateVars);
});


router.post('/'), (req, res) => {
  templateVars.id = req.params.id;
  res.redirect('/maps', templateVars);
// ERROR - Duplicate username OR blank password/username
};

module.exports = router;
