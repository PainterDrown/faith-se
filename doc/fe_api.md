# 前后端对接文档

## 1. HTTP状态码
code | msg                   | description
---- | --------------------- | -----------
0    | SERVER_INTERNAL_ERROR | 服务器内部错误
1    | OK                    | 一切正常
2    |                       | 数据格式出错
3    | USER_NOT_EXIST        | 用户不存在
4    | USER_ALREADY_EXIST    | 用户已存在
5    | WRONG_PASSWORD        | 密码错误


1.获取平台基金列表(分页)：
request：
{
    "request": "getFundShowList" ,
    "pageSize": "xxx:int" , //页大小
    "pageNo": "xxx:int"     //当前页号
}
response：
{
    "fund": [
                {
                "fundID" : "xxx: int" ,
                "name" : "xxx:string" ,
                "perNetValue": "xxx:float" ,  //单位净值
                "netValueDate": "xxxx-xx-xx", //净值日期 (1,2,3,...写成01,02,03, ...)
                "buildDate" : 	"xxxx-xx-xx", 	//创立时间 (1,2,3,...写成01,02,03, ...)
                "profitRateOneYear":"xxx:float(%)", //一年收益率
                "profitRateTotal":	"xxx:float(%)"  //成立以来收益率
                },

                ........ (n个fund，n为 pageSize )
    ],

    "totalPages" : "xxx:int"  //总页数
}

2.获取基金详情：
request:
{
    "request": "fundDetails" ,
    "fundID" : "xxx:int"
}
response：
{
    "netValue": ["xxx:float" ,"xxx:float" ,"xxx:float" ,"xxx:float"],
    //季度净值 [最近一个季度，最近的第二个进度, ... ,最近的第四个季度]
    "date": 	[ // 上述净值的对应期末日期
                    "xxxx-xx-xx", 	//(1,2,3,...写成01,02,03, ...)
                    "xxxx-xx-xx", 	//(1,2,3,...写成01,02,03, ...)
                    "xxxx-xx-xx", 	//(1,2,3,...写成01,02,03, ...)
                    "xxxx-xx-xx" 	//(1,2,3,...写成01,02,03, ...)
                ],

    "vitalPartner":	[ //重仓持股 {公司名，持有比例}
                            {
                            "name" : "xxx:string",
                            "percentage" "xxx:float(%)"
                            },
                            {
                            "name" : "xxx:string",
                            "percentage" "xxx:float(%)"
                            },
                            {
                            "name" : "xxx:string",
                            "percentage" "xxx:float(%)"
                            },
                            {
                            "name" : "xxx:string",
                            "percentage" "xxx:float(%)"
                            }
                        ],

    "raisePercentage":  ["xxx:float(%)" , "xxx:float(%)", "xxx:float(%)"]  ，
    //近三个月涨跌幅，六个月，，近九个月，近一年]
    "profitRate": ["xxx:float(%)" , "xxx:float(%)", "xxx:float(%)"]
    // [近三个月回报率，近六个月，近九个月，近一年]
}

3.获得平台推荐的基金产品
request:
{
    "request": "getRecommmendations",
    "number": "xxx:int"
}
response：
{
    "fund": [
                {
                "fundID" : "xxx: int"
                "name": "xxx:string",
                "profitRateForecast": "xxx:float(%)"， //预期回报率
                "reason": "xxx:string"， //推荐理由
                },
                ......n个，n为number
            ]
}

4.登录
request：
{
    "request": "login",
    "username": "xxx:string",
    "password": "xxx:string"
}
response：
{
    "state": "success" / "failure",
    "userID": "xxx:int"
}

5.注册
request：
{
    "request" : "enroll",
    "username": "xxx:string",
    "password": "xxx:string"
}
responce:
{
    "state" : "success" / "failure" ,
    "userID": "xxx:int"
}

6.实名认证
request：
{
    "request" : "identify",
    "userID" : "xxx:string",
    "trueName" : "xxx:string", //真实姓名
    "IDNumber" : "xxx:string", //身份证号
    "mailAddress" : "String", //联系地址
    "bank": "xxx:string", //银行名称
    "bankNumber": "xxx:int", //银行卡号
    "phone" : "xxx:string", //预留手机
    "accountArea" : "xxx：string", //银行开户地点
    "passwordToTrade": "xxx：string" //交易密码
}
response：
{

    "state": "success" / "failure"
}

7.获得用户首页
request:
{
    "request": "getUserHome",
    "userID" : "xxx:int"
}
response：
{
    "totalProperty" : "xxx:int",
    "fundsAmount" : "xxx:float",//购买基金的金额总数
    "haveFundsNumber" : "xxx:string". //持有基金的数量
    "haveFunds" : ["fundID": "xxx:int", "fundID": "xxx:int", "fundID": "xxx:int", ....]
}
