const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getUserByUsername } = require('../db/queries/users');

const templateVars = {};

router.use((req, res, next) => {
  templateVars.userId = req.session.userId;
  next();
});
router.get('/', (req, res) => {
  templateVars.id = req.params.id;
  res.render('login', templateVars);
});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(400).send("Email or Password input is empty, please enter a valid email and password");
    return;
  }
  getUserByUsername(username)
    .then(data => {
      if (data.password !== password) {
        res.status(400).send("Incorrect Username or Password");
        return;
      }
      req.session.userId = data.id;
      templateVars.userId = req.session.userId;
      res.redirect(200, '/maps');
    });

});

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/maps");
});

module.exports = router;
