-- migrate:up
CREATE TABLE single_volumes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL,
  published_date VARCHAR(30) NOT NULL,
  book_image_url VARCHAR(2000) NOT NULL,
  name varchar(30) NOT NULL,
  sequence INT NOT NULL,
  CONSTRAINT single_volumes_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(id)
);

-- migrate:down
DROP TABLE single_volumes
