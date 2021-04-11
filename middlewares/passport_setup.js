// require passport & google & github
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

// require keys
const keys = require('./keys')

// const userDev & userEmp
const userDev = require('../models/userDev')
const userEmp = require('../models/userEmp')

// serializeUser 
passport.serializeUser((user,done) =>{
        done(null,user.id)
})

// deserializeUser google
passport.deserializeUser ((id,done) => {
    userEmp.findById(id).then((user) => {
        done(null,user);
    }) 
})

// deserializeUser github
passport.deserializeUser ((id,done) => {
    userDev.findById(id).then((user) => {
        done(null,user);
    }) 
})

// google passport
passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL : '/auth/google/redirect',
        clientID : keys.google.clientID,
        clientSecret : keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exist in our DB
        userEmp.findOne({googleId:profile.id}).then((currentEmp) =>{
            if(currentEmp){
                // already have the user
                console.log('employeer is already exist', currentEmp)
                done(null,currentEmp)
            } else {
                // if not create new 
                new userEmp({
                    name : profile.displayName,
                    googleId : profile.id
                }).save().then((newEmp) => {
                    console.log('new Employeer created :' +newEmp);
                    done(null,newEmp)
                });
            }
        })
       
    })
);

// github passport
passport.use(
    new GitHubStrategy({
            clientID:'e8db77544d2e4e9ab741',
            clientSecret: '7a1196478327ded443bacdb6c5ad1210cf5fa257',
            callbackURL: "http://localhost:7000/auth/github/redirect",
        },
    (accessToken, refreshToken, profile, done) =>{
              // check if user already exist in our DB
        userDev.findOne({githubId:profile.id}).then((currentDev) =>{
            if(currentDev){
                // already have the user
                console.log('developer is already exist', currentDev)
                done(null, currentDev)
            } else {
                // if not create new 
        new userDev({
            name : profile._json.login,
            githubId : profile.id
        }).save().then((newDev) => {
            console.log('new developer created :' +newDev);
            done(null,newDev);
        });
    }
})

})
);
