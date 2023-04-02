-- migrate:up
CREATE TABLE single_volume_pages (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  single_volume_id INT NOT NULL,
  image_url varchar(2000) NOT NULL,
  name VARCHAR(30) NOT NULL,
  sequence INT NOT NULL,
  CONSTRAINT single_volume_pages_single_volume_id_fkey FOREIGN KEY (single_volume_id) REFERENCES single_volumes(id)
);

-- migrate:down
DROP TABLE single_volume_pages
