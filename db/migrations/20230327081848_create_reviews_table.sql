-- migrate:up
CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  review_type varchar(10) NULL,
  content varchar(500) NULL,
  rating INT NOT NULL,
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT reviews_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(id)
);


-- migrate:down
DROP TABLE reviews
