exports.getCustomer="select * from customers";

exports.findAcustomer="select * from customers cus where cus.CUSTOMER_ID = :cust_id";

exports.insertCustomer="insert into customers values (:cust_id ,:cust_name ,:city)";