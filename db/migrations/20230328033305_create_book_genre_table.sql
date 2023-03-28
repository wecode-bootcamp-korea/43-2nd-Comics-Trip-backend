-- migrate:up
CREATE TABLE book_genre (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  genre_id INT NOT NULL
  book_id INT NOT NULL
  CONSTRAINT book_genre_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES genres(id),
  CONSTRAINT book_genre_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(id)
);

-- migrate:down
DROP TABLE book_genre
