truncate table purchase;
truncate table user_balance_transaction;
truncate table user_balance_transaction_weekly_gift;
truncate table user_balance_transaction_withdraw;
truncate table user_balance_transaction_transfer;
truncate table user_balance_transaction_purchase;
truncate table user_balance_transaction_agent_support;
truncate table user_balance_transaction_add_fund;
truncate table period;
truncate table user_balance_transaction_fee;
delete
from `user_balance`
where user_id != 1;
update `user_balance` set available = 0;
delete
FROM `member`
where id != 1;
update `member`
set package_id  = null,
    isPurchased = false
where id = 1;
delete
FROM `user`
where id != 1;
delete
from `career`
where userId != 1;
update `career` set career.`rank` = 0, totalPoint = 0 where userId = 1;
truncate table period_gift;
