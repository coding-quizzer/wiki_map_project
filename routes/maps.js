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
  res.render('maps_main', templateVars);
});

router.get('/new', (req, res) => {
  templateVars.id = req.params.id;
  res.render('create_map', templateVars);
});

router.get('/:id', (req, res) => {
  templateVars.id = req.params.id;
  res.render('map_view', templateVars);
});


router.get('/:id/api/points', (req, res) => {
  templateVars.id = req.params.id;
  // Get points from database with map id
  const points = [{}];
  res.send(points, templateVars);
});

module.exports = router;
