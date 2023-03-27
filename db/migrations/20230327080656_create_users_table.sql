-- migrate:up
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kakao_id BIGINT NULL,
  email VARCHAR(100) NULL,
  password VARCHAR(200) NULL,
  age INT NOT NULL,
  point decimal(12, 4) NULL,
  gender VARCHAR(10) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users
