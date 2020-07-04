-- Update for total sponsor member
UPDATE member AS target,
  (SELECT parent.id,
          (SELECT COUNT(child.id) FROM member AS child WHERE child.sponsor_id = parent.id) AS totalSponsorMember
   FROM member AS parent) AS temp
SET target.total_sponsor_member = temp.totalSponsorMember
WHERE target.id = temp.id;

-- update level of each member
update member as target,
  (SELECT p.user_id, max(pp.package_id) as package_id
   FROM purchase p
          LEFT JOIN purchase_package pp ON pp.purchase_id = p.id
   group by user_id) as temp
set target.package_id = temp.package_id
where target.id = temp.user_id;

-- Update total sponsor member that same level of sponsor
UPDATE member AS target,
  (SELECT parent.id,
          (SELECT COUNT(child.id)
           FROM member AS child
           WHERE child.sponsor_id = parent.id
             and child.package_id = parent.package_id
          ) AS total_same_package
   FROM member AS parent) AS temp
SET target.total_sponsor_member_package = temp.total_same_package
WHERE target.id = temp.id;

