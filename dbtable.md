# 数据库表设计

## 1. user
field     | type         | default | description
--------- | ------------ | ------- | -----------
user_id   | INT          |         | 用户ID（从0开始自增）
username  | VARCHAR(32)  |         | 用户名
password  | VARCHAR(32)  |         | 密码
tcode     | INT          |         | 交易密码（6位整数）
realname  | BIGINT       |         | 真实姓名
phone     | CHAR(11)     |         | 手机号码
address   | TINYTEXT     |         | 住址
id        | CHAR(18)     |         | 身份证号码
card_no   | VARCHAR(19)  |         | 银行卡号（信用卡16位，储蓄卡19位）
email     | VARCHAR(64)  |         | 邮箱
is_auth   | TINYINT      | 0       | 是否已实名认证（0表示否，1表示是）
savings   | FLOAT(10, 2) | 0.00    | 储蓄罐金额

## 2. fund
field     | type | default | description
--------- | ---- | ------- | -----------
fund_id   | INT  |         | 基金ID
fc_id     | INT  |         | 基金公司ID（外键->fund_company）
founddate | DATE |         | 基金成立日期

## 3. fund_buy
field   | type         | default | description
------- | ------------ | ------- | -----------
fb_id   | INT          |         | 基金拥有关系ID
user_id | INT          |         | 用户ID（外键->user）
date    | DATE         |         | 购买基金日期
cost    | FLOAT(10, 2) |         | 购买基金金额
amount  | INT          |         | 购买基金份数

## 4. fund_company
field | type        | default | description
----- | ----------- | ------- | -----------
fc_id | INT         |         | 基金公司ID
name  | VARCHAR(64) |         | 名称

## 5. fund_netvalue
field    | type         | default | description
-------- | ------------ | ------- | -----------
fn_id    | INT          |         | 基金净值ID
date     | DATE         |         | 产生该净值的日期（每个季度末）
netvalue | FLOAT(10, 2) |         | 基金净值
