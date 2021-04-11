// require express & instance
const router = require('express').Router();

// require passport
const passport = require('passport')

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout()
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    // handle with passport
    scope : ['profile','email'],
}));
// callback route for google to redirect
router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    //res.send(req.user)
    res.redirect('/profile/')
})

// auth with github
router.get('/github',
  passport.authenticate('github', {
    // handle with passport
    scope : ['profile']
}));
// callback route for github to redirect
router.get('/github/redirect',passport.authenticate('github'),(req,res) => {
//res.send(req.user)
    res.redirect('/profile/')
})


module.exports 