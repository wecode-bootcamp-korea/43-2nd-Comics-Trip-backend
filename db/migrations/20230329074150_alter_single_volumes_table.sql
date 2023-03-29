-- migrate:up
ALTER TABLE single_volumes ADD (rental_price decimal(12, 4) NOT NULL, owner_price decimal(12, 4) NOT NULL)

-- migrate:down

