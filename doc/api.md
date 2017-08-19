# 前后端对接文档

## 1. HTTP状态码
code | msg
---- | ---
0    | 服务器内部错误
1    | 正常
2    | 数据格式出错
3    | 用户不存在
4    | 用户已存在
5    | 密码错误

## 2. API对接文档

### ✅1.1 登录
	- url: api/login
	- req:
		- username
		- password
	- res:
		- user_id

### ✅1.2 注册
	- url: api/enroll
	- req:
		- username
		- password
	- res:
		- user_id

### 1.3 用户详情
	- url: api/get-user-detail
	- req:
		- user_id
	- res:
		- total_asset（总资产）
		- total_fund_cost（购买基金总金额）
		- owned_funds（拥有的基金）：
			- [fund_id]（array类型，数组成员为number类型）


### 1.4 实名认证
	- url: api/realname-authentication
	- req:
		- user_id
		- realname
		- id
		- email
		- phone
		- bankname
		- bankarea
		- bankcard_no
		- tcode
	- res（无）

### 2.1 获取平台基金列表(分页)
	- url: api/get-fund-list
	- req：
		- page_size
		- page_no
	- res：
		- funds
			- fund_id
			- name
			- latest_netvalue
			- latest_netvalue_date
			- date
			- oneyear_profit_rate
			- total_profit_rate
		- page_num

### 2.2 获取基金详情
	- url: api/get-fund-detail
	- req:
		- fund_id
	- res:
		- netvalues（最新的4个基金净值，最新的在第一个）
		- dates（对应的基金净值日期）
		- raise_percentages（近3个月，6个月，9个月，1年的涨跌幅）
		- profit_rate（近3个月，6个月，9个月，1年的回报率）

### 2.3 获得平台推荐的基金产品
	- url: api/get-recommmendations
	- req:
		- num
	- res:
		- funds(array类型)
			- fund_id
			- name
			- forecast_profit_rate
			- reason
			- star（number类型）
