const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsernameById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;',[id])
    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
};

const getUserFavorites = (userId) => {
  return db.query('SELECT * FROM favorites WHERE user_id = $1;' , [userId])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
};

const getUserMaps = (userId) => {
  return db.query('SELECT * FROM maps WHERE user_id = $1;', [userId])
    .then(data => {
      console.log(data.rows);
      return data.rows
    })
};
getUsernameById(1);
getUserMaps(1);
getUserFavorites(1);
module.exports = { getUsers, getUsernameById, getUserFavorites, getUserMaps };
