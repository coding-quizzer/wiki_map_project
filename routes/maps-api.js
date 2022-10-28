const express = require('express');
const router = express.Router();
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
  const options = { ...req.body, latitude: 62.4748444, longitude: -114.4790338 };
  const userId = req.session.userId;
  userQueries.createMap(options, userId || 1)
    .then(map => {
      res.redirect(`/maps/${map.id}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id', (req, res) => {
  const pointInfo = req.body;
  userQueries.createPoint({
    title: pointInfo['point-name'],
    description: pointInfo['point-description'],
    imgURL: pointInfo['point-photo-url'],
    mapID: pointInfo.mapID,
    latitude: pointInfo.latitude,
    longitude: pointInfo.longitude
  })
    .then(point => {
      res.send(point);
    })
    .catch(e => {
      console.error(e.message);
      res.send(e);
    });

});

router.post('/:map_id/center', (req, res) => {
  userQueries.changeMapCenter(req.body)
    .then(map => {
      res.send(map);
    })
    .catch(e => {
      console.error(e.message);
      res.send(e);
    });
});



module.exports = router;
