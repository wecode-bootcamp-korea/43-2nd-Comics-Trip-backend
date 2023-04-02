-- migrate:up
CREATE TABLE owners (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL ,
  single_volume_id INT NOT NULL,
  price decimal(12, 4) NOT NULL,
  owner_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT owners_single_volume_id_fkey FOREIGN KEY (single_volume_id) REFERENCES single_volumes(id),
  CONSTRAINT owners_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT owners_owner_status_id_fkey FOREIGN KEY (owner_status_id) REFERENCES owner_status(id),
  CONSTRAINT book_owner_only UNIQUE (user_id, single_volume_id)
);

-- migrate:down
DROP TABLE owners
