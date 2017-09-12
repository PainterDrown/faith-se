CREATE TABLE user(
  user_id     INT AUTO_INCREMENT,
  username    VARCHAR(32),
  password    VARCHAR(32),
  is_auth     TINYINT DEFAULT 0,
  realname    VARCHAR(32),
  email       VARCHAR(64),
  phone       CHAR(11),
  address     TINYTEXT,
  id          CHAR(18),
  bank_name   VARCHAR(64),
  bank_area   TINYTEXT,
  bank_cardno VARCHAR(19),
  bank_phone  CHAR(11),
  tcode       INT,
  savings     FLOAT(10, 2) DEFAULT 0.00,
  PRIMARY KEY(user_id)
);

CREATE TABLE fund(
  fund_id      INT AUTO_INCREMENT,
  name         VARCHAR(64),
  full_name    VARCHAR(64),
  code         SMALLINT,
  type         VARCHAR(16),
  state        VARCHAR(16),
  trade_state  VARCHAR(16),
  company      VARCHAR(64),
  bank         VARCHAR(64),
  manager      VARCHAR(32),
  mng_fee      FLOAT(10, 2),
  trs_fee      FLOAT(10, 2),
  init_scale   INT,
  latest_scale INT,
  latest_share INT,
  found_date   DATE,
  latest_netvalue      FLOAT(10, 2),
  latest_netvalue_date DATE,
  PRIMARY KEY(fund_id)
);

CREATE TABLE fund_netvalue(
  fn_id    INT AUTO_INCREMENT,
  fund_id  INT,
  date     DATE,
  netvalue FLOAT(10, 2) NOT NULL,
  PRIMARY KEY(fn_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);

CREATE TABLE fund_asset(
  fa_id      INT AUTO_INCREMENT,
  fund_id    INT,
  name       VARCHAR(64),
  percentage SMALLINT,
  PRIMARY KEY(fa_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);

CREATE TABLE fund_industry(
  fi_id      INT AUTO_INCREMENT,
  fund_id    INT,
  name       VARCHAR(64),
  percentage SMALLINT,
  PRIMARY KEY(fi_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);

CREATE TABLE fund_buy(
  fb_id   INT AUTO_INCREMENT,
  user_id INT,
  fund_id INT,
  time    DATETIME,
  price   FLOAT(10, 2),
  amount  INT,
  PRIMARY KEY(fb_id),
  FOREIGN KEY(user_id) REFERENCES user(user_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);

CREATE TABLE fund_collection(
  fc_id   INT AUTO_INCREMENT,
  user_id INT,
  fund_id INT,
  PRIMARY KEY(fc_id),
  FOREIGN KEY(user_id) REFERENCES user(user_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);
