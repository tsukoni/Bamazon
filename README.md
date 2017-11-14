# Bamazon

An interactive storefront that runs in the console using node. This storefront has no relation to Amazon besides its derivative name.

#How It Works

##There are three variations to this app, all of which have their own uses.

##Bamazon Customer The first, bamazonCustomer.js, Displays all currently available items and allows a "customer" to place an order from the Bamazon store. A check is then performed on the store inventory. The customer is either alerted that their order cannot be completed due to lack of stock, or they are shown the total amount owed. Behind the scenes, the quantity ordered by the customer is deducted from the store quantity (which is stored in a SQL table). At the same time, the $ amount of the order is sent to seperate SQL table to allow the corportate executives to track sales by department.

https://github.com/tsukoni/Bamazon/blob/master/Images/bamazonCustomer.png
