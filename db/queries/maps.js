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

getMap(1);



module.exports = { getMaps, getMap };
