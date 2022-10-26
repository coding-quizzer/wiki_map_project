/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
  res.render('users', templateVars);
});

router.get('/:id', (req, res) => {
  templateVars.id = req.params.id;
  res.render('user_profile', templateVars);
});


module.exports = router;
