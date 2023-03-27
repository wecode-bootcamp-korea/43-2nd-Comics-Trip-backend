-- migrate:up
CREATE TABLE rental_status (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  status VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE rental_status
