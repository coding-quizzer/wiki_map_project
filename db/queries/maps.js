const db = require('../connection');

const getMaps = () => {
  return db.query(`SELECT * FROM maps`)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

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






module.exports = { getMaps, getMap, getMapPoints, getMapPoint };
