/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  templateVars = { userId: 1};
  res.render('users', templateVars);
});

router.get('/:id', (req, res) => {
  const userId = req.params.id || 2;
  const templateVars = { userId };
  res.render('user_profile');
});

module.exports = router;
