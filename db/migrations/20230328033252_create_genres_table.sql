-- migrate:up
CREATE TABLE genres (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  genre VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE genres
