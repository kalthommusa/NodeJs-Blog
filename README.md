# The BLOG views / pages


## Home page:
![](readme-imgs/1.png)

**List of the latest Posts (page 1)**
![](readme-imgs/2.png)

**List of the oldest Posts (page 2)**
![](readme-imgs/3.png)

**View a specific article**
![](readme-imgs/4.png)

**Search for an article**
![](readme-imgs/5.png)

![](readme-imgs/6.png)

**Positive search match**
![](readme-imgs/7.png)

![](readme-imgs/8.png)

**Negative search match**
![](readme-imgs/9.png)

![](readme-imgs/10.png)


## About page:

![](readme-imgs/11.png)


## Contact us page:
![](readme-imgs/12.png)
![](readme-imgs/13.png)
![](readme-imgs/14.png)
![](readme-imgs/15.png)

## Admin page:

**Admin Registration**
![](readme-imgs/16.png)

![](readme-imgs/17.png)

**Admin Login**
![](readme-imgs/18.png)

![](readme-imgs/19.png)


**Admin Dashboard**
![](readme-imgs/20.png)


**View Contact Messages**
![](readme-imgs/21.png)


## CRUD Operations by Admin:

**Make a new post**
![](readme-imgs/22.png)

![](readme-imgs/23.png)


**Update a post**
![](readme-imgs/24.png)

![](readme-imgs/25.png)

![](readme-imgs/26.png)


**Delete a post**
![](readme-imgs/27.png)

![](readme-imgs/28.png)

![](readme-imgs/29.png)



# Routs and functionalties

The routes are organized into two categories: main/public routes and admin routes. 
The main/public routes handle the main functionality of the blog, such as displaying the home page, individual articles, search functionality, and the contact form. 
The admin routes handle the administrative functions, such as user registration and login, managing blog posts, and viewing contact messages. The admin routes are protected by an authMiddleware that checks for a valid JWT token in the user's cookie. 

# 1- Main/Public Routes (in [main.js](server/routes/main.js)):

* Home Page (/):

Renders the home view.
Displays the latest blog posts, with pagination.

* Article Page (/article/:id):

Renders the article view.
Displays the details of a specific blog post.

* Search (/search):

Renders the search view.
Handles the search functionality for blog posts.


* About Page (/about):

Renders the about view.

* Contact Page (/contact):

Renders the contact view.
Displays the contact form and handles the submission.
Saves the contact message in the database.
Redirects to the contact-success page.

* Contact Form Success Page (/contact-success):

Renders the contact-success view.


# 2- Admin Routes (in [admin.js](server/routes/admin.js)):

* Admin Registration Page (/register):

Renders the admin registration view.
Handles the registration of a new admin.
Hashes the password using bcrypt.
Saves the new user in the database.
Redirects to the login page.

* Admin Login Page (/login):

Renders the admin login view.
Handles the login of an admin user.
Checks the username and password.
Generates a JWT token and stores it in the user's cookie.
Redirects to the admin dashboard.

* Admin Dashboard (/dashboard):

Renders the admin dashboard view.
Requires authentication using the authMiddleware.
Displays the list of blog posts.


* Add New Post (/add-article):

Renders the admin add-article view.
Requires authentication using the authMiddleware.
Handles the creation of a new blog post.

* Edit Post (/edit-article/:id):

Renders the admin edit-article view with the post details.
Requires authentication using the authMiddleware.
Handles the update of an existing blog post.

* Delete Post (/delete-article/:id):

Requires authentication using the authMiddleware.
Handles the deletion of a blog post.

* View Contact Messages (/contact-messages):

Renders the admin/contact-messages view.
Requires authentication using the authMiddleware.
Displays the list of contact messages.

* Admin Logout (/logout):

Clears the user's JWT token from the cookie.
Redirects to the home page.

