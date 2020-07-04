UPDATE member
SET leftMember                   = NULL,
    rightMember                  = NULL,
    currentLeftBlock             = NULL,
    currentRightBlock            = NULL,
    paidLeftBlock                = NULL,
    paidRightBlock               = NULL,
    totalLeftBlock               = NULL,
    totalRightBlock              = NULL,
    total_sponsor_member_package = NULL,
    total_sponsor_member         = NULL,
    total_member_purchased       = NULL,
    package_id                   = NULL,
    qualified= true,
    total_member_package_1       = NULL,
    total_member_package_2       = NULL,
    total_member_package_3       = NULL,
    blockchain                   = 0,
    loyalty                      = 0,
    last_process_blockchain      = NULL
WHERE parent_id = 0;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE purchase;
TRUNCATE TABLE purchase_package;
TRUNCATE TABLE company_balance_transaction;
TRUNCATE TABLE user_balance_transaction;
TRUNCATE TABLE user_balance_transaction_purchase;
TRUNCATE TABLE user_balance_transaction_transfer;
TRUNCATE TABLE user_balance_transaction_bonus_uni;
TRUNCATE TABLE user_balance_transaction_bonus_direct;
TRUNCATE TABLE user_balance_transaction_fee;

SET FOREIGN_KEY_CHECKS = 1;
/*
Delete all User except 3 main member.
*/
DELETE
FROM `user`
WHERE id NOT IN (1);
DELETE
FROM member
WHERE id NOT IN (1);
DELETE
FROM user_balance
WHERE user_id NOT IN (1);
UPDATE user_balance
SET balance = 6000000
WHERE user_id = 1
  AND currency_id = 1;

# noinspection SqlWithoutWhere
UPDATE company_balance
SET balance = 5000000;
TRUNCATE TABLE proceed_purchase_bonus;
