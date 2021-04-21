// require express
const express = require ('express');

// require dotenv
require('dotenv').config()

// require setup passport
const passportSetup = require('./middlewares/passport_setup')

//require authRoute
const authRoutes = require('./routes/auth');

//require profile Route
const profileRoutes = require('./routes/profile-auth');

// require keys
const keys = require('./middlewares/keys')

// require cookie session
const cookieSession = require('cookie-session');

// require passport 
const passport = require('passport')

// instance app
const app = express();

// Middleware bodyparser (express json)
app.use(express.json())

// connect with DB
const connectDB = require('./config/connectDB')
connectDB(); 

// set view engine
app.set('view engine', 'ejs');

// set cookie session
app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000,
    keys : [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Routes
app.use('/api/project', require('./routes/project'))

// create home route
app.get('/', (req, res) => {
    res.render('home', {user:req.user});
});

// PORT
PORT = process.env.PORT;

// create server
app.listen(PORT, (err) => 
err ?
 console.error("server can not running") 
:console.log(`server is running on ${PORT}` )
)