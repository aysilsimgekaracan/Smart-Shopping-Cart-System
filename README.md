# Smart Shopping Cart System

![preview1](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/064eba14-beea-4552-90b0-84247667f80a) ![preview2](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/b4fe88f0-286e-4826-8376-124d7359b50c)

This study aims to provide customers with an easy, fast, and convenient shopping experience. Within the scope of the research, I developed an object detection model using my own dataset with YOLOv5 deep learning network. After that, I created a mobile application to utilize this model.

**! Please visit my other repository for dataset creation, preparation and model creation processes.**

## 1. Authentication
* Firebase Authentication
* Sign In and Sign Up functionalities

![Screenshot 2023-07-10 at 22 25 54](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/1499d8e3-7850-4ecb-9b9e-50217cef0baf)

## 2. Database
**Firebase Cloud Firestore**

![Screenshot 2023-07-10 at 22 26 12](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/0b997b4f-15fa-412b-b6fa-7541cf88b57b)


* The database consists of three tables. One of them is the “products” table, which stores detailed information about the products, such as their name, price, description, and image.
* When a user makes a purchase, the shopping details are recorded in the database with the user UID provided by Firebase Authentication integration of current logged-in user. The “orders” and “orderDetails” tables are used to store the users’ purchase history.
* The "orders" table contained general information about the orders. It included details such as the user who placed the order, the total amount, and the date of the order. On the other hand, the "orderDetails" table stored information about the quantities of each product purchased,
specifying which products were included in the order and how many of each were bought.

## 3. Frame Detection System
**Expo Camera**

![Screenshot 2023-07-10 at 22 26 26](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/b6936eab-6ba6-4d04-aba1-1ca2e61b81d8)

* As the user continues with their shopping, the application asynchronously captures frames at regular intervals in the background. To capture these frames, the takePictureAsync() method of Expo Camera is called every 2 seconds.
* The captured frames sent as requests to the model prepared using Roboflow's Hosted API.
* The response from the API is processed, and the information of the detected products from the Firebase products table is obtained. These products are then displayed on the screen for the user to see.

## Screens

### 1. Home Screen
![Screenshot 2023-07-10 at 22 19 12](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/c1c858a7-ae1c-49c3-8c54-0db5b03f0259)

* The home screen features a horizontally scrollable view that showcases the working principles of the application. Users can swipe through the cards to learn how to use the app effectively.
* In the products section, users can find a list where they can access images, detailed information, prices of products available in the store. Information about these products is retrieved from the database and provided on the home screen.

### 2. Profile Screen
![Screenshot 2023-07-10 at 22 19 57](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/3ca640d9-8e15-47ab-8d6c-d624427b864c)

* When the customer enters the profile screen, they encounter a button to view their orders and a button to sign out. When the customer presses the “Sign Out” button, they are directed to the Sign In screen.

* When the customer presses on the “Orders” button, they can view their past orders.

![Screenshot 2023-07-10 at 22 20 37](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/a57938bb-a87e-4bae-84aa-f8c871f1e012)

### 3. Cart Screen
#### Camera Permission
![Screenshot 2023-07-10 at 22 22 28](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/5e59a90c-64ac-4a5f-a7bc-4384cf7488bb)

#### Cart View
![Screenshot 2023-07-10 at 22 23 03](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/f628f437-8856-4af2-8aa6-844858bdfe56)

* Once the customer in the Cart Screen, all they need to do is to proceed with the shopping.
* the captured images from the camera start to be processed in the background without the user's awareness. The processes described in the Frame Detection System section are applied in the background in sequence. The response obtained from this system is reflected on this screen.

### 4. Payment and Order Confirmation Screens
![Screenshot 2023-07-10 at 22 25 07](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/96ea5599-7fd2-45f8-81c5-1b9d39572cdf)
![Screenshot 2023-07-10 at 22 25 18](https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/assets/43148881/deba9fd1-3c4c-4c4a-9c67-6c49e868a156)






