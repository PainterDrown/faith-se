CREATE TABLE user(
  user_id      INT         NOT NULL AUTO_INCREMENT,
  username     VARCHAR(32) NOT NULL,
  password     VARCHAR(32) NOT NULL,
  tcode        INT,
  realname     VARCHAR(32),
  phone        CHAR(11),
  address      TINYTEXT,
  id           CHAR(18),
  bankcard_no  VARCHAR(19),
  email        VARCHAR(64),
  is_auth      TINYINT      DEFAULT 0,     
  savings      FLOAT(10, 2) DEFAULT 0.00,
  PRIMARY KEY(user_id)
);