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
    });
};

const getUserByUsername = (username) => {
  return db.query('SELECT * FROM users WHERE username = $1;', [username])
    .then(data => {
      return data.rows[0];
    });
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
    });
};

const getUserMaps = (userId) => {
  return db.query('SELECT * FROM maps WHERE user_id = $1;', [userId])
    .then(data => {
      return data.rows;
    });
};

const addFavorite = (userId, mapId) => {
  return db.query(`
  INSERT INTO favorites (user_id, map_id)
  VALUES ($1, $2)
  RETURNING *;
  `, [userId, mapId])
  .then(data => {
    return data.rows[0];
  });
};

const getFavorites = (userID) => {
  return db.query(`
  SELECT map_id FROM favorites
  WHERE user_id = $1
  `, [userID])
    .then(data => {
      console.log("userFavorites", data.rows)
      return data.rows;
    });
};



const registerUser = (first_name, last_name, username, password) => {
  return db.query(`
  INSERT INTO users (first_name, last_name, username, password)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`, [first_name, last_name, username, password])
    .then(data => {
      return data.rows[0];
    });
};


module.exports = { getUsers, getUserById, getUserFavorites, getUserMaps, getUserByUsername, getFavorites, addFavorite, registerUser };
