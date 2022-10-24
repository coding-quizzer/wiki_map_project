const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/maps');

router.get('/', (req, res) => {
  userQueries.getMaps()
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  userQueries.getMap(req.params.id)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
