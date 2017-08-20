# 数据库表设计

## 1. user
fieldname     | type         | default | description
------------- | ------------ | ------- | -----------
user_id       | INT          |         | 用户ID（从0开始自增）
username      | VARCHAR(32)  |         | 用户名
password      | VARCHAR(32)  |         | 密码
is_auth       | TINYINT      | 0       | 是否已实名认证（0表示否，1表示是）
realname      | VARCHAR(32)  |         | 真实姓名
phone         | CHAR(11)     |         | 手机号码
email         | VARCHAR(64)  |         | 邮箱
address       | TINYTEXT     |         | 住址
id            | CHAR(18)     |         | 身份证号码
bankname      | VARCHAR(64)  |         | 银行名称
bankarea      | TINTTEXT     |         | 开户行
bankcard_no   | VARCHAR(19)  |         | 银行卡号（信用卡16位，储蓄卡19位）
tcode         | INT          |         | 交易密码（6位整数）
savings       | FLOAT(10, 2) | 0.00    | 储蓄罐金额
total_asset   | FLOAT(10, 2) | 0.00    | 总资产
total_profit  | FLOAT(10, 2) | 0.00    | 总收益

## 2. fund_company
fieldname | type        | default | description
--------- | ----------- | ------- | -----------
fc_id     | INT         |         | 基金公司ID
name      | VARCHAR(64) |         | 名称

## 3. fund
fieldname | type | default | description
--------- | ---- | ------- | -----------
fund_id   | INT  |         | 基金ID
fc_id     | INT  |         | 基金公司ID（外键->fund_company）
founddate | DATE |         | 基金成立日期

## 4. fund_buy
fieldname | type         | default | description
--------- | ------------ | ------- | -----------
fb_id     | INT          |         | 基金拥有关系ID
user_id   | INT          |         | 用户ID（外键->user）
fund_id   | INT          |         | 基金ID（外键->fund）
time      | DATETIME     |         | 购买基金日期
price     | FLOAT(10, 2) |         | 购买基金金额
amount    | INT          |         | 购买基金份数

## 5. fund_netvalue
fieldname | type         | default | description
--------- | ------------ | ------- | -----------
fn_id     | INT          |         | 基金净值ID
fund_id   | INT          |         | 基金ID（外键->fund）
date      | DATE         |         | 产生该净值的日期（每个季度末）
netvalue  | FLOAT(10, 2) |         | 基金净值
