const express = require('express');
const router = express.Router();
const adminLayout = '../views/layouts/admin';
const Article = require('../models/Article');
const User = require('../models/User');
const Contact = require('../models/Contact');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


/** 
 * Get
 * Admin - Registration Page
*/
router.get('/register', async (req, res) => {
  try {
    const locals = {
      title: "Admin - Register",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    res.render('admin/registration', { 
      locals, 
      layout: adminLayout,
      currentRoute: '/register'
     });
  } catch (error) {
    console.log(error);
  }
});



/**
 * POST 
 * Admin - Register
*/
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password:hashedPassword });
      //res.status(201).json({ message: 'User Created', user });
      res.redirect('/login');
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'User already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
    }

  } catch (error) {
    console.log(error);
  }
});



/**
 * Get 
 * Admin - Login Page
*/
router.get('/login', async (req, res) => {
  try{

    const locals = {
        title: "Admin - login",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }

    res.render('admin/login', { 
      locals, 
      layout: adminLayout, // custom layout for admin page/view
      currentRoute: '/login'
     }); 
  }catch(error){
    console.log(error);
  }
});


/**
 * POST 
 * Admin - Check Login
*/
// router.post('/admin', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     //console.log({ username, password });
//     //res.redirect('/admin');

//     if(req.body.username === 'kalthom' && req.body.password === 'password'){
//       console.log({ username, password });
//       res.send('You are Logged in !');
//     } else{
//       console.log({ username, password });
//       res.send('Wrong username or password !');
//     } 

//   } catch (error) {
//     console.log(error);
//   }
// });


/**
 * POST 
 * Admin - Check Login
*/
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne( { username } );

    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );

    res.cookie('token', token, { httpOnly: true });

    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
});


/**
 * Authorization Middleware 
*/
const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json( { message: 'Unauthorized'} );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}



/**
 * GET 
 * Admin Dashboard 
*/
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    const data = await Article.find();
    res.render('admin/dashboard', {
      locals,
      data, 
      layout: adminLayout, 
      currentRoute: '/dashboard'    
    });

  } catch (error) {
    console.log(error);
  }

});
  

/**
 * GET 
 * Admin - Create New Post
*/
router.get('/add-article', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    res.render('admin/add-article', {
      locals,
      layout: adminLayout, 
      currentRoute: '/add-article'    
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * POST 
 * Admin - Create New Post
*/
router.post('/add-article', authMiddleware, async (req, res) => {
  try {
    //console.log(req.body);

    //res.redirect('/dashboard');

    try {
      const newPost = new Article({
        title: req.body.title,
        body: req.body.body
      });

      await Article.create(newPost);

      res.redirect('/dashboard');

    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});



/**
 * GET 
 * Admin - Update & Edite Post
*/
router.get('/edit-article/:id', authMiddleware, async (req, res) => {
  try {

    const locals = {
      title: "Edit Post",
      description: "Free NodeJs User Management System",
    };

    const articleId = req.params.id;
    const data = await Article.findOne({ _id: articleId });

    res.render('admin/edit-article', {
      locals,
      data,
      layout: adminLayout, 
      currentRoute: `/article/${articleId}` 
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * PUT 
 * Admin - Update & Edite Post
*/
router.put('/edit-article/:id', authMiddleware, async (req, res) => {
  try {

    const articleId = req.params.id;

    await Article.findByIdAndUpdate(articleId, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    });

    // res.redirect(`/edit-article/${articleId}`);
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }

});



/**
 * DELETE 
 * Admin - Delete Post
*/
router.delete('/delete-article/:id', authMiddleware, async (req, res) => {

  try {
    const articleId = req.params.id;
    await Article.deleteOne( { _id: articleId } );
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }

}); 



/**
 * GET 
 * Admin - View Contact Messages
 */
router.get('/contact-messages', authMiddleware, async (req, res) => {
  try {
    const locals = { 
      title: 'Contact Messages',
      description: 'View messages sent by users through the contact form.',
    };

    const messages = await Contact.find().sort({ createdAt: -1 });

    res.render('admin/contact-messages', {
      locals,
      messages,
      layout: adminLayout,
      currentRoute: '/contact-messages',
    });

  } catch (error) {
    console.log(error);
  }
});



/**
 * GET 
 * Admin Logout
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});


module.exports = router;
