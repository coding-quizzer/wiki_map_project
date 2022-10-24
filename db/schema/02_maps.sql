DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  latitude REAL,
  longitude REAL,
  img_url VARCHAR(255) NOT NULL DEFAULT '/images/gray-square-hi.png'
);
