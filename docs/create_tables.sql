CREATE TABLE user(
  user_id  INT AUTO_INCREMENT,
  username VARCHAR(32),
  password VARCHAR(64),
  is_auth  TINYINT DEFAULT 0,
  realname VARCHAR(32),
  email    VARCHAR(64),
  phone    CHAR(11),
  address  TINYTEXT,
  id       CHAR(18),
  tcode    VARCHAR(64),
  savings  FLOAT(10, 2) DEFAULT 0.00,
  savings_date DATE,
  savings_rate SMALLINT,
  PRIMARY KEY(user_id)
);

CREATE TABLE fund(
  fund_id      INT AUTO_INCREMENT,
  name         VARCHAR(64),
  full_name    VARCHAR(128),
  code         VARCHAR(16),
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
  netvalue FLOAT(10, 2),
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

CREATE TABLE user_trade(
  fb_id       INT AUTO_INCREMENT,
  user_id     INT,
  fund_id     INT,
  time        DATETIME,
  bankcard_no VARCHAR(19),
  operation   VARCHAR(4),
  turnover    FLOAT(10, 2),
  PRIMARY KEY(fb_id),
  FOREIGN KEY(user_id) REFERENCES user(user_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);

CREATE TABLE user_collection(
  fc_id   INT AUTO_INCREMENT,
  user_id INT,
  fund_id INT,
  PRIMARY KEY(fc_id),
  FOREIGN KEY(user_id) REFERENCES user(user_id),
  FOREIGN KEY(fund_id) REFERENCES fund(fund_id)
);

CREATE TABLE user_bankcard(
  bk_id       INT AUTO_INCREMENT,
  user_id     INT,
  number      VARCHAR(19),
  bank_name   VARCHAR(64),
  bank_area   TINYTEXT,
  bank_phone  CHAR(11),
  PRIMARY KEY(bk_id),
  FOREIGN KEY(user_id) REFERENCES user(user_id)
);