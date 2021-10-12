# Live Mart
LiveMart is a web application that allows consumers, sellers, and wholesalers to connect and engage in the online marketplace. Given the challenging circumstances of COVID-19, many people have taken to online alternatives for a variety of issues. Technology firms have seen significant increases in all internet-related acquisitions, and this trend is continuing.
Grocery stores now need a user interface that is genuinely comfortable for their customers. Consumers expect category pages and search results to change based on their personal browsing and shopping experience, as well as the ability to quickly select products by dietary requirement. Our app connects customers (home delivery) to retailers (shopkeepers), and retailers are connected to wholesalers. This application has been developed towards a project component of the course CS F213 - Object Oriented Programming.


## Hierarchy of Users
#### Customers  ⇆  Retailers   ⇆   Wholesalers
### Roles of Users: 
- `Customers`: selection of items (by search, by using filters or by browsing), adding to cart, place order, payment of order, feedback/queries.
- `Retailers`: adding new items, deleting items, deciding the price of items while adding, maintaining record of each customer (items they have bought, transactions they have done till now etc..), update item quantities (after every order placed by customer), place order, order payment, feedback/queries, etc.
- `Wholesalers`: adding new items, deleting items, deciding the price of items while adding, adding or deleting retailers, maintaining record of each retailer (items they have bought, transactions they have done till now etc..), items that they supply to the retailers, update item quantities (after every order placed by retailer) etc.


## Functionalities

### User Authentication
- SignUp Page for 4 different users( Customers, Retailers, Wholesalers, Delivery Officials) automatically creates a shop for the user if the user is a retailer or wholesaler. New users must generate a password for potential login while attempting to SignUp. The database saves this email and password combination along with Number, address and type of user.
- SignIn page helps the user to login with their email address and password. After entering the Email ID and Password, the user will get a verification email asking for confirmation.
- In the event you forget a password for your LiveMart account, you can reset your password directly through the system or application you’re using. The reset of your password can be done by requesting an email that contains a password reset link

### Dashboards for all Users
For Customers the dashboard shows the active orders and different categories from which the usr can choose to buy. For retailers it shows the active orders they did from the wholesaler as well as the pending orders which they have to fullfill for the customers. For wholesalers it just shows the pending orders from the retailers.

### Inventory Management
Adding Items has been made very easy and intuitive. One can select the name of the product, quantity in stock, price, Etc. All the changes are successfully updated immediately in our database.

### Order Tracking 
For Online orders, it tracks and displays the delivery status of the orders ordered from the user and for online orders it displays the pickup time schedule for the orders and also has an option for the seller to mark the item as collected. For online orders the delivery status can be changed by the assigned delivery person once the order is delivered.

### Search Items
Customers can make an easy search for the product of their choice and also filter the results according to - 
- `Categories` - by categories like personal care, kitchen essentials, etc 
- `Price` - by price of the items 
- `Brands` - by different brands for the product

### Reviews
Ratings and feedback in an ecommerce industry contribute to improved revenue by
providing consumers with insights about a product or service they are considering purchasing. People are more likely to buy a product or service based on other people's ratings and recommendations. Retailers/customers can easily visit the bottom of product page to checkout the reviews.

### Shopping Cart
After shopping, the final review of the products, their price & quantities, total cost and the delivery charges can be checked at shopping cart before proceeding to checkout. 

### Checkout
Checkout can be done by choosing order mode 
- Online orders(delivered)
- Offline order(pick up)

After which customers enter their shipping address, make their payment and have a final review of the transaction before placing order at LiveMart.

### Profile Page

Customers can edit their profile details, view their wallet balance and checkout their past shopping reviews. This page can be accessed by clicking on user icon on the top right and selecting ‘My Profile’.
The functionalities on the profile page include

-  View wallet balance
-  View and Edit Reviews
-  View Orders
-  View customer reviews (Retailers)



Proper documention can be found [here](https://drive.google.com/file/d/1AiyKzvcz1DfUJt31Vs2lB1bqrLGZ9bdo/view?usp=sharing).


## Contributors
- [Prasoon Baghel](https://github.com/prasoon0459)
- [Harsh Heda](https://github.com/harsh-heda)
- [Shaurya Vijayvargiya](https://github.com/CodeMonk263)



