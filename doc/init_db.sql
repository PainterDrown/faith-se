CREATE TABLE user(
  user_id      INT         NOT NULL AUTO_INCREMENT,
  username     VARCHAR(32) NOT NULL,
  password     VARCHAR(32) NOT NULL,
  is_auth      TINYINT      DEFAULT 0,
  realname     VARCHAR(32),
  email        VARCHAR(64),
  phone        CHAR(11),
  address      TINYTEXT,
  id           CHAR(18),
  bankname     VARCHAR(64),
  bankarea     TINYTEXT,
  bankcard_no  VARCHAR(19),
  tcode        INT,
  savings      FLOAT(10, 2) DEFAULT 0.00,
  PRIMARY KEY(user_id)
);

CREATE TABLE fund_company(
  fc_id INT         NOT NULL AUTO_INCREMENT,
  name  VARCHAR(64) NOT NULL,
  PRIMARY KEY(fc_id)
);

CREATE TABLE fund(
  fund_id   INT      NOT NULL AUTO_INCREMENT,
  fc_id     INT      NOT NULL,
  founddate DATETIME NOT NULL,
  PRIMARY KEY(fund_id),
  FOREIGN KEY(fc_id) REFERENCES fund_company(fc_id)
);

CREATE TABLE fund_buy(
  fb_id   INT          NOT NULL AUTO_INCREMENT,
  user_id INT          NOT NULL,
  fund_id INT          NOT NULL,
  time    DATETIME     NOT NULL,
  cost    FLOAT(10, 2) NOT NULL,
  amount  INT          NOT NULL,
  PRIMARY KEY(fb_id),
  FOREIGN KEY(user_id) REFERENCES user(user_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);

CREATE TABLE fund_netvalue(
  fn_id    INT          NOT NULL AUTO_INCREMENT,
  fund_id  INT          NOT NULL,
  date     DATE         NOT NULL,
  netvalue FLOAT(10, 2) NOT NULL,
  PRIMARY KEY(fn_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);
