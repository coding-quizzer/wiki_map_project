const express = require('express');
const router = express.Router();
const db = require('../db/connection');
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
  getUserByUsername(username)
    .then(data => {
      console.log("SSDSSSSSSSSSSSSSSS" , data);
      if (data.username === username) {
        res.status(400).send("Username has been taken, please choose a new username!");
        return;
      }
      console.log("First name = ", firstName, "Last Name = ", lastName, "username = ", username, "password = ", password);
      registerUser(firstName, lastName, username, password);
      req.session.userId = data.id;
      templateVars.userId = req.session.userId;
      res.redirect('/maps');
    });
});

module.exports = router;
