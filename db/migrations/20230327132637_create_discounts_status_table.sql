-- migrate:up
CREATE TABLE discounts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL ,
  discount_rate INT NOT NULL,
  discount_date date NULL,
  CONSTRAINT discounts_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(id)
);

-- migrate:down
DROP TABLE discounts
