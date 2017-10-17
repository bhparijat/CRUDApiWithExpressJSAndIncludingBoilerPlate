const express = require('express');
const controller = require('./users.controller.js');
const passport = require ('passport');
const local = require('passport-local').Strategy;
const router = express.Router();

router.post('/users', (req, res) => {
  controller.insertData(req, (err, result) => {
    console.log('error in posting',err);
    if (err) {
      res.status('500').send('cannot post to favourites'+'\n'+err);
    } else { res.send(req.body); }
  });
});
passport.use(new local(
 function(username,password,done){
    controller.sendDataById({username:username,password:password}, (err, user) => {
        console.log('inside passport use')
        if (err) {
         return  done(null,err);
          
        } else { 
          return done(err,user);
      }
 }
);
 }));
router.get('/dashboardUser',(req,res)=>{
    console.log('inside dashboard user');
    return res.status('200').send('success');
})
router.get('/loginUser',(req,res)=>{
    console.log('inside login user')
    return res.status('400').send('failed to log in');
})
router.post('/login',
  passport.authenticate('local',{
                                   successRedirect:'/dashboardUser',
                                   failureRedirect:'/loginUser',
                                   failureFlash:true
                                 }),  

(req, res) => {
 
});

module.exports = router