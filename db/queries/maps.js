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
 * latitude:
 * longitude:
 * }
 *
 **/

const createMap = (options, user_id) => {
  console.log('options', options);
  console.log([options.name, user_id, options.latitude, options.longitude, options.imgURL]);
  return db.query(`
  INSERT INTO maps (name, user_id, latitude, longitude, img_url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `, [options.name, user_id, options.latitude, options.longitude, options.imgURL])
    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    });

};

/**
 * options = {
 * title:
 * description:
 * imgURL:
 * latitude:
 * longitude:
 * mapID:
 * }
 *
 **/


const createPoint = (options) => {
  return db.query(`
  INSERT INTO points (title, img_url, description, map_id, latitude, longitude)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;` , [options.title, options.imgURL, options.description, options.mapID, options.latitude, options.longitude])
    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    });
};

/**
 * options = {
 * mapID:
 * latitude:
 * longitude:
 * }
 *
 **/

const changeMapCenter = (options) => {
  return db.query(`
  UPDATE maps
  SET latitude = $2,
      longitude = $3
  WHERE id = $1
  RETURNING *`, [options.mapID, options.latitude, options.longitude]);
};
/**
 * @param {{}} options
 * {
 *    title: string
 *    imgURL: string
 *    description: string
 *    pointID: integer
 * }
 *
 */

const editPoint = (options) => {
  return db.query(`
    UPDATE points
    SET title = $2,
        img_url = $3,
        description = $4
    WHERE id = $1
    RETURNING *
  `, [options.pointID, options.title, options.imgURL, options.description])

    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    });
};

const isFavorite = (userID, mapID) => {
  return db.query(`
  SELECT * FROM favorites
  WHERE user_id = $1 AND map_id = $2
  `, [userID, mapID])
    .then(data => console.log("isFavorite", !!data.rows[0]));
};

module.exports = { getMaps, getMap, getMapPoints, getMapPoint, createMap, createPoint, editPoint, isFavorite};
