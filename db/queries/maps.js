const db = require('../connection');

const getMaps = () => {
  return db.query(`
  SELECT maps.id, maps.name, img_url, users.username
  FROM maps
  JOIN users ON user_id = users.id`)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

getMaps();

const getMap = (id) => {
  return db.query(`
    SELECT * FROM maps
    WHERE id = $1
    `, [id])
    .then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  });
};


const getMapPoints = (id) => {
  return db.query(`
  SELECT points.*
  FROM points
  JOIN maps ON map_id = maps.id
  WHERE map_id = $1
  `, [id])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const getMapPoint = (mapId, pointId) => {
  return db.query(`
  SELECT points.*
  FROM points
  JOIN maps ON map_id = maps.id
  WHERE map_id = $1
  AND points.id = $2
  `, [mapId, pointId])
    .then(data => {
      return data.rows[0];
    });
};
/**
 * options = {
 * name:
 * imgURL:
 * }
 *
 **/

const createMap = (options, user_id, latitude, longitude) => {
  return db.query(`
  INSERT INTO maps (name, user_id, latitude, longitude, img_url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `, [options.name, user_id, latitude, longitude, options.imgURL])
  .then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  });

}

/**
 * options = {
 * title:
 * description:
 * imgURL:
 * }
 *
 **/


const createPoint = (options, mapId, latitude, longitude) => {
  return db.query(`
  INSERT INTO points (title, img_url, description, map_id, latitude, longitude)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;` , [options.title, options.imgURL, options.description, mapId, latitude, longitude])
    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    });
};


module.exports = { getMaps, getMap, getMapPoints, getMapPoint, createMap };
