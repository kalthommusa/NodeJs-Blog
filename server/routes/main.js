const express = require('express');

const router = express.Router();

const Article = require('../models/Article');

const Contact = require('../models/Contact');


/**
 * GET 
 * Home page
*/
router.get('/', async (req, res) => {
  try{
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 5; // Number of articles per page
    let page = req.query.page || 1; // Current page number from query parameter

    // Fetch articles for the current page
    const data = await Article.aggregate([ { $sort: { createdAt: -1 } } ]) // Sort articles by creation date in descending order
    .skip(perPage * page - perPage) // Skip articles for previous pages
    .limit(perPage) // Limit results to the number of articles per page
    .exec();

    // Calculate pagination details
    const count = await Article.countDocuments({}); // Total number of articles
    const nextPage = parseInt(page) + 1; // Next page number
    const hasNextPage = nextPage <= Math.ceil(count / perPage); // Check if there is a next page

    // Render the home page with data and pagination details
    res.render('home', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});   


// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try{
//       const data = await Article.find();
//       res.render('home', { locals, data }); // view // page // spacial content for each page in side the overall HTML layout strcture
//   }catch(error){
//       console.log(error);
//   }
// });


/**
 * GET 
 * Article page
*/
router.get('/article/:id', async (req, res) => {
  try {
    let id = req.params.id;
    
    // Fetch article by ID
    const data = await Article.findById({ _id: id });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    // Render the article page with article data
    res.render('article', { 
      locals,
      data,
      currentRoute: `/article/${id}`
    });
  } catch (error) {
    console.log(error);
  }

});



/**
 * Post 
 * Search bar
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    let searchTerm = req.body.searchTerm; // Search term from request body
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, ""); // Remove special characters from search term

    // Search for articles matching the search term
    const data = await Article.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    // Message to display if no results are found
    let message = null; 
    if (data.length === 0) {
      message = "Oops! no articles found. Try searching for something else or browse our latest posts.";
    }

    // Render the search results page with data and message
    res.render("search", {
      data,
      locals,
      currentRoute: '/',  
      message
    });

  } catch (error) {
    console.log(error);
  }
});



    
// function insertArticleData () {
//   Article.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertArticleData();



/**
 * GET 
 * About page
*/
router.get('/about', (req, res) => {
  res.render('about', { currentRoute: '/about' });
});



/**
 * GET 
 * Contact page
*/
router.get('/contact', (req, res) => {
  res.render('contact', { currentRoute: '/contact' });
});


 
/**
 * POST
 * Contact form submission
 */
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body; // Extract contact form data

    const contactMessage = new Contact({ name, email, message });

    await contactMessage.save();
    
    res.redirect('/contact-success'); // Redirect to the contact success page
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while submitting your message. Please try again later.');
  }
});



/**
 * GET
 * Contact form success page
 */
router.get('/contact-success', (req, res) => {
  res.render('contact-success', { currentRoute: '/contact-success' });
});


module.exports = router;