# 前后端对接文档

## 1. HTTP请求结果
	1. 每个api的res都至少会有code和msg两个参数，来说明该次http请求的结果是否正常
	2. code所代表的信息如下表所示：

code | msg
---- | -----------------
0    | 正常
1    | 服务器内部错误
2    | 前端参数错误

## 2. API对接文档
	1. {}表示类型描述，如{[number]}表示该数据是数组类型，数组成员是number类型
	2. 前面有加✅的表示该api已经实现

### ✅1.1 登录
	POST api/login
	* req:
		* username  {string}  用户名
		* password  {string}  密码
	* res:
		* user_id   {number}  用户ID

### ✅1.2 注册
	* POST api/enroll
	* req:
		* username
		* password
	* res:
		* user_id

### ✅1.3 用户详情
GET
	* url: api/users/:user_id
	* req: (null)
	* res:
		* user
			* usernama
			* is_auth       {boolean}   是否已实名认证
			* realname      {string}    真实姓名
			* phone         {string}    手机号码
			* email         {string}    电子邮箱
			* address       {string}    住址
			* id            {string}    身份证号码
			* bankname      {string}    银行名称
			* bankarea      {string}    银行开户行
			* bankcard_no   {string}    银行卡号
			* bankphone     {string}    银行预留手机
			* savings       {number}    储蓄罐金额
			* total_asset   {number}    总资产
			* total_profit  {number}    总利润
			* owned_funds   {[number]}  拥有的基金，数组成员表示fund_id

### ✅1.4 实名认证
	* method: POST
	* url: api/certification
	* req:
		* user_id
		* id
		* realname
		* bankname
		* bankarea
		* bankcard_no
		* bankphone
		* tcode  {number}  支付密码
	* res: (null)

### 2.1 获取平台基金列表(分页)
	* method: GET
	* url: api/funds?page=&per_page=
	* query:
		* page      页号（从1开始）
		* per_page  每页显示的基金数目
	* req: (null)
	* res:
		* funds  {[object]}  基金数组
			* fund_id               {number}    基金ID
			* name                  {string}    基金名称
			* founddate             {date}      基金成立日期
			* latest_netvalue       {number}    最新基金净值
			* latest_netvalue_date  {date}      最新基金净值对应的日期
			* oneyear_profit_rate   {number}    基金一年利率
			* total_profit_rate     {number}    基金总利率
		* funds_leftnum  {number}    剩下基金的数量

### 2.2 获取基金详情
	* method: GET
	* url: api/funds/:fund_id
	* req: (null)
	* res:
		* netvalues          {[number]}  最新的4个基金净值，最新的在第一个
		* dates              {[date]}    对应的基金净值日期
		* raise_percentages  {[number]}  近3个月，6个月，9个月，1年的涨跌幅
		* profit_rates       {[number]}  近3个月，6个月，9个月，1年的回报率

### 2.3 获得平台推荐的基金产品
	* method: GET
	* url: api/recommmendations/funds?limit=
	* query:
    * limit  推荐基金的数量
	* req: (null)
	* res:
		* funds                   {[object]}  基金数组
			* fund_id
			* name
			* forecast_profit_rate  {number}    预期回报率
			* reason                {string}    推荐原因
			* star                  {number}    推荐星级（范围：0.0 ~ 5.0）
