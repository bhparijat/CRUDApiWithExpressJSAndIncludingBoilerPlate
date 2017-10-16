const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const local = require('passport-local').Strategy;
const moduleOneController = require('./newsApi.controller.js')

router.post('/api/userRegister',(req,res,next)=>{
    moduleOneCassandraController.insertUser(req.body,(err,res)=>{
     if(err){
      return res.status(500).end(
          JSON.stringify( err)
        );
     }else{
         return res.end(result);
     }
  
    })
  
    
  })
  passport.use(new local(
   function(username,password,done){
    
  }));
  router.post('/userLogin',
  passport.authenticate('local',
     { 
          successRedirect:'/dashboard', 
          failureRedirect:'/userLogin',
          failureFlash:false
      }
  ),
  (req,res)=>{
   
  })