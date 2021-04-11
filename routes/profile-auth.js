// require express & instance
const router = require('express').Router();


// check auth
const authCheck = (res,req,next) =>{
    if(req.user){
        // if user is not logged in
        res.redirect('/auth/login');
    
    }
    else {
        // if logged in 
        next();
    }
}

// get router profile
router.get('/',authCheck,(req,res) => {
  res.render('profile', {user:req.user})
})

// export module
module.exports = router;