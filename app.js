require('dotenv').config();

const express = require('express');

const expressLayout = require('express-ejs-layouts');

const mainLayout = './layouts/main';   

const mainRoutes = require('./server/routes/main');

const adminRoutes = require('./server/routes/admin');

const connectDB = require('./server/config/db'); // Import the connectDB function

const cookieParser = require('cookie-parser');

const session = require('express-session');

const MongoStore = require('connect-mongo');

const methodOverride = require('method-override');

const { isActiveRoute } = require('./server/helpers/routeHelpers');
  
const app = express();

const PORT =  5000; 

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));  

app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(expressLayout);
app.set('layout', mainLayout);         
app.set('view engine', 'ejs');

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