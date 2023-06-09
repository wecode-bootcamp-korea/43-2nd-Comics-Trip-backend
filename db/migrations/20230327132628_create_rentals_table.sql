-- migrate:up
CREATE TABLE rentals (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  single_volume_id INT NOT NULL,
  rental_status_id INT NOT NULL,
  price decimal(12, 4) NOT NULL,
  rental_date DATETIME NULL,
  return_date DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT rentals_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT rentals_single_volume_id_fkey FOREIGN KEY (single_volume_id) REFERENCES single_volumes(id),
  CONSTRAINT rentals_rental_status_id_fkey FOREIGN KEY (rental_status_id) REFERENCES rental_status(id),
  CONSTRAINT book_rental_only UNIQUE (user_id, single_volume_id)
);

-- migrate:down
DROP TABLE rentals
