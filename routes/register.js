const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const { getUserByUsername, registerUser } = require('../db/queries/users');

const templateVars = { userId: "" };

router.get('/', (req, res) => {
  res.render('register', templateVars);
});


router.post('/', (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password || !firstName || !lastName) {
    res.status(400).send("One or more input fields are empty, please fill out all input fields");
    return;
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  getUserByUsername(username)
    .then(data => {
      if (data) {
        res.status(400).send("Username has been taken, please choose a new username!");
        return;
      }
      registerUser(firstName, lastName, username, hashedPassword)
        .then(user => {
          req.session.userId = user.id;
          res.redirect('/maps');
        });
    });
});

module.exports = router;
