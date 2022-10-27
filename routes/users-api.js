/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

const templateVars = {};

router.use((req, res, next) => {
  templateVars.userId = req.session.userId;
  next();
});

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(user => {
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/maps', (req, res) => {
  userQueries.getUserMaps(req.params.id)
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/favorites', (req, res) => {
  userQueries.getFavorites(req.params.id)
    .then(favArr => {
      const favoriteIDs = favArr.map(favObj => Object.values(favObj)[0]);
      res.json({ favoriteIDs });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id/favorites', (req, res) => {
  const favorite = req.body;
  userQueries.addFavorite(favorite.userId, favorite.mapID)
  .then((favorite) => {
    res.send(favorite)
  })
  .catch(err => console.error(err));
});

module.exports = router;
