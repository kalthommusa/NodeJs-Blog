// Import necessary modules
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mainLayout = './layouts/main'; // Define the main layout file path
const mainRoutes = require('./server/routes/main'); // Import main routes
const adminRoutes = require('./server/routes/admin'); // Import admin routes
const connectDB = require('./server/config/db'); // Import database connection function
const cookieParser = require('cookie-parser'); // Import cookie parser middleware
const session = require('express-session'); // Import session middleware
const MongoStore = require('connect-mongo'); // Import MongoDB session store
const methodOverride = require('method-override'); // Import method override middleware for PUT and DELETE requests
const { isActiveRoute } = require('./server/helpers/routeHelpers'); // Import route helper function
  
// Create an Express application
const app = express();

// Define the port for the server
const PORT = 5000; 

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies


// Session setup
app.use(session({
  secret: 'keyboard cat', // Secret key for session encryption
  resave: false, // Don't resave session if unmodified
  saveUninitialized: true, // Save new sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI // MongoDB connection string from environment variable
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } // Optional: Set cookie expiration time
})); 

app.use(methodOverride('_method'));

// Static file serving and view engine setup
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(expressLayout); // Enable express-ejs-layouts for layout management
app.set('layout', mainLayout); // Set the main layout file
app.set('view engine', 'ejs'); // Set EJS as the view engine

app.locals.isActiveRoute = isActiveRoute;      

app.use('/', mainRoutes);
app.use('/', adminRoutes);

// Connect to the MongoDB database
connectDB().then(() => {
  // Start the server only after the database connection is successful
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
 