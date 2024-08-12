# NodeJS Blog App

## Overview

This blog application is a web-based and user-friendly platform built using Node.js, Express, and MongoDB. It allows users to read, search, and interact with blog posts, while providing an administrative interface for managing content. It provides the following key features and functionalities:

## Public Features:

* Home page displaying the latest and oldest blog posts with pagination
* Ability to read individual blog posts
* Search functionality to find blog posts by title or content
* Access static pages like About and Contact.
* Ability to submit messages through the contact form.

## Admin Features:

* Admin registration and login
* Admin dashboard to manage blog articles.
* Create, update, and delete blog articles.
* View contact messages from users.


# The BLOG pages


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



# Routs

The routes are organized into two categories: main/public routes and admin routes. 
The main/public routes handle the main functionality of the blog, such as displaying the home page, individual articles, search functionality, and the contact form. 
The admin routes handle the administrative functions, such as user registration and login, managing blog posts, and viewing contact messages. The admin routes are protected by an authMiddleware that checks for a valid JWT token in the user's cookie. 

# 1- Main/Public Routes (in [main.js](server/routes/main.js)):

These routes are accessible to all users of the blog.

**GET /** - Home Page: Displays a list of blog articles with pagination.

**GET /article/:id** - Article page: Displays a specific article based on the given ID.

**POST /search** - Search: Allows users to search for articles by title or content.

**GET /about** - About Page: Provides information about the author.

**GET /contact** - Contact Page: Displays a contact form for users to reach out.

**POST /contact** - Contact form submission: Handles form submissions and saves messages to the database.

**GET /contact-success** - Contact success Page: Displays a success message after a contact form is successfully submitted.


# 2- Admin Routes (in [admin.js](server/routes/admin.js)):

These routes require authentication and are used for managing the blog content.

**GET /register** - Admin Registration Page: Displays the registration page for new admin users.

**POST /register** - Admin Register: Handles registration form submissions and creates new admin users.

**GET /login** - Admin Login Page: Displays the login page for admin users.

**POST /login** - Admin Login: Authenticates admin users and starts a session.

**GET /dashboard** - Admin Dashboard Page: Displays the dashboard with an overview of blog articles. (Protected route, requires authentication using the authMiddleware)

**GET /add-article** - Create New Post Page: Displays the form to create a new blog post. (Protected route, requires authentication using the authMiddleware)

**POST /add-article** - Create New Post: Handles the submission of new blog posts. (Protected route, requires authentication using the authMiddleware)

**GET /edit-article/:id** - Update Post Page: Displays the form to edit an existing blog post based on ID. (Protected route, requires authentication using the authMiddleware)

**PUT /edit-article/:id** - Update Post: Handles the submission of updates to existing blog posts. (Protected route, requires authentication using the authMiddleware)

**DELETE /delete-article/:id** - Delete Post: Deletes a blog post based on the given ID. (Protected route, requires authentication using the authMiddleware)

**GET /contact-messages** - View Contact Messages Page: Displays messages sent by users through the contact form. (Protected route, requires authentication using the authMiddleware)

**GET /logout** - Admin Logout: Logs out the admin user and ends the session.


# Middleware

**authMiddleware**: It is a custom middleware function that checks for a valid JWT token in the request cookies, it is used to protect certain routes, such as the admin dashboard, and ensure that only authorized admin users can access these routes.


# Models

**Article**: Represents a blog article with fields such as title, body.

**User**: Represents an admin user with fields such as username and password.

**Contact**: Represents a contact form message with fields such as name, email, and message.



# Technologies and Libraries Used:

* **Node.js**: JavaScript runtime for building server-side applications.
* **Express**: Web framework for Node.js, used for routing and middleware support.
* **MongoDB**: NoSQL database for storing articles and contact messages.
* **Mongoose**: ODM library for MongoDB, used for database interactions.
* **EJS**: Templating engine for rendering dynamic web pages.
* **Express-layout**: for managing page layouts.
* **Bcrypt**: Library for hashing passwords.
* **Jsonwebtoken**: Library for implementing JSON Web Token (JWT) authentication.
* **Express-session & Connect-mongo & Cookie-parser**: Libraries for managing sessions and authentication.
* **Method-override**: Middleware to support HTTP verbs like PUT and DELETE.
* **Dotenv**: for managing environment variables.