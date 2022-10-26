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

router.get('/:id/points', (req, res) => {
  userQueries.getMapPoints(req.params.id)
    .then(points => {
      res.json({ points });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:map_id/points/:point_id', (req, res) => {
  userQueries.getMapPoint(req.params.map_id, req.params.point_id)
    .then(point => {
      res.json({ point });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});



router.post('/', (req, res) => {
  console.log(res.body);
  const userId = req.session.userId;
  userQueries.createMap(req.body, userId)
  .then(map => {
    res.redirect(`/maps/${map.id}`);
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.post('/:map_id/points', (req, res) => {
  userQueries
})
module.exports = router;
