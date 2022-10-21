const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('maps');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const templateVars = { id };
  res.render('maps', templateVars);
});

module.exports = router;
