const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;',[id])
    .then(data => {
      return data.rows[0];
    })
};

const getUserFavorites = (userId) => {
  return db.query(`
    SELECT maps.*
    FROM favorites
    JOIN maps ON map_id = maps.id
    WHERE favorites.user_id = $1;
    ` , [userId])
    .then(data => {
      return data.rows;
    })
};

const getUserMaps = (userId) => {
  return db.query('SELECT * FROM maps WHERE user_id = $1;', [userId])
    .then(data => {
      return data.rows
    })
};

module.exports = { getUsers, getUserById, getUserFavorites, getUserMaps };
