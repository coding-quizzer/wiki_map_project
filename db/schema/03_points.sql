DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL DEFAULT '/images/gray-square-hi.png',
  description TEXT,
  map_id INTEGER REFERENCES maps(id),
  latitude REAL NOT NULL,
  longitude  REAL NOT NULL
);
