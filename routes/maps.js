const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('maps');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const templateVars = { id };
  res.render('maps', templateVars);
});

router.get('/:id/api/points', (req, res) => {
  const id = req.params.id;
  // Get points from database with map id
  const points = [{}];
  res.send(points);
});

module.exports = router;
