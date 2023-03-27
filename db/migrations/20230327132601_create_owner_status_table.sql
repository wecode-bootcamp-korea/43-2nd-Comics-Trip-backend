-- migrate:up
CREATE TABLE owner_status (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  status VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE owner_status
