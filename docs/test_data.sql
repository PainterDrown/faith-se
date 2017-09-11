-- user
INSERT INTO user (username, password) VALUES ('111111', '111111');

-- fund
INSERT INTO fund (name, found_date, company) VALUES ('faith_fund_1', '2017-09-01', 'faith_company_1');
INSERT INTO fund (name, found_date, company) VALUES ('faith_fund_2', '2017-09-02', 'faith_company_2');
INSERT INTO fund (name, found_date, company) VALUES ('faith_fund_3', '2017-09-03', 'faith_company_3');

-- fund_netvalue
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (1, '2017-01-01', 10.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (1, '2017-04-01', 20.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (1, '2017-07-01', 30.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (1, '2017-10-01', 40.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (2, '2017-01-01', 10.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (2, '2017-04-01', 20.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (2, '2017-07-01', 30.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (2, '2017-10-01', 40.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (3, '2017-01-01', 10.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (3, '2017-04-01', 20.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (3, '2017-07-01', 30.00);
INSERT INTO fund_netvalue (fund_id, date, netvalue) VALUES (3, '2017-10-01', 40.00);

-- fund_asset
INSERT INTO fund_asset (fund_id, percentage, name) VALUES (1, 5000, 'faith_fund_1_asset_1');
INSERT INTO fund_asset (fund_id, percentage, name) VALUES (1, 5000, 'faith_fund_1_asset_2');
INSERT INTO fund_asset (fund_id, percentage, name) VALUES (2, 4000, 'faith_fund_2_asset_1');
INSERT INTO fund_asset (fund_id, percentage, name) VALUES (2, 6000, 'faith_fund_2_asset_2');
INSERT INTO fund_asset (fund_id, percentage, name) VALUES (3, 3000, 'faith_fund_3_asset_1');
INSERT INTO fund_asset (fund_id, percentage, name) VALUES (3, 7000, 'faith_fund_3_asset_2');

-- fund_industry
INSERT INTO fund_industry (fund_id, percentage, name) VALUES (1, 5000, 'faith_fund_1_industry_1');
INSERT INTO fund_industry (fund_id, percentage, name) VALUES (1, 5000, 'faith_fund_1_industry_2');
INSERT INTO fund_industry (fund_id, percentage, name) VALUES (2, 4000, 'faith_fund_2_industry_1');
INSERT INTO fund_industry (fund_id, percentage, name) VALUES (2, 6000, 'faith_fund_2_industry_2');
INSERT INTO fund_industry (fund_id, percentage, name) VALUES (3, 3000, 'faith_fund_3_industry_1');
INSERT INTO fund_industry (fund_id, percentage, name) VALUES (3, 7000, 'faith_fund_3_industry_2');

-- fund_buy
INSERT INTO fund_buy (user_id, fund_id, time, price, amount) VALUES (1, 1, '2017-09-01 00:00:00', 100.00, 100);
INSERT INTO fund_buy (user_id, fund_id, time, price, amount) VALUES (1, 2, '2017-09-02 00:00:00', 200.00, 200);
INSERT INTO fund_buy (user_id, fund_id, time, price, amount) VALUES (1, 3, '2017-09-03 00:00:00', 300.00, 300);
