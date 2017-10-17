const express = require('express');
const router = express.Router();
const path =require('path');
const morgan =require('morgan');
const createConnection=require('./users/users.schema.js');
const passport = require('passport');
function setMongooseConnections()
{

  const mongoose = require('mongoose');
  const connect = mongoose.connect('mongodb://localhost/newsAppDataBase',{
    useMongoClient:true,
  });
  const db = mongoose.connection;
 db.on('connected', function() {
    console.log('Mongoose is now connected to ');
  });

 db.on('error', function(err) {
    console.log('Error in Mongoose connection: ', err);
  });

  db.on('disconnected', function() {
    console.log('Mongoose is now disconnected..!');
  });


  
  //const moduleOneRouter = require('./moduleOneRouter.js');

}

function createApp(){
    const app=express();
    return app;
}
function setRoutes(app){
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PATCH,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
//uncomment it for mongoose    app.use('/',require(path.join(__dirname, './newsApi')));
    app.use('/',require(path.join(__dirname, './users')));
    app.use(function(req, res, next) {
        var err = new Error('Resource not found');
        err.status = 404;
        return res.status(err.status).json({
          "error": err.message
        });
      });
    
    // console.log(__dirname); 
    return app;
}
function setupStaticRoutes(app) {
   // let path="/home/parijat/Downloads/express_server";
    
    app.use(express.static(path.join(__dirname, '../', '/angular/NewsApiAM/dist')));
    console.log(path.join(__dirname, '../', '/angular/NewsApiAM/dist'));
    return app;
  }
function setupMiddlewares(app) {
    //For logging each requests 
    app.use(morgan('dev'));
  
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
  
    return app;
  }
function initializepassport(app){
  app.use(passport.initialize());
  return app;
}
createConnection();
let app=createApp();
app = initializepassport(app);
app=setupStaticRoutes(app);  
app=setupMiddlewares(app);
app=setRoutes(app);

//setMongooseConnections();
app.listen(4200);