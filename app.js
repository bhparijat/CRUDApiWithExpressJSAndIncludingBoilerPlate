


const express = require('express');
const router = express.Router();
const path =require('path');
const morgan =require('morgan');
//const app = express();
//const fs = require('fs');
const bodyParser = require('body-parser');
//const moduleOneRouter = require('./moduleOneRouter.js');



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
    app.use('/',require(path.join(__dirname, './newsApi')));
    app.use(function(req, res, next) {
        var err = new Error('Resource not found');
        err.status = 404;
        return res.status(err.status).json({
          "error": err.message
        });
      });
    
     console.log(__dirname); 
    return app;
}
function setupStaticRoutes(app) {
    let path="/home/parijat/Downloads/express_server";
    app.use(express.static(path.resolve(__dirname, '../', '/angular/NewsApp/dist')));
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

let app=createApp();
   
app=setupMiddlewares(app);
app=setRoutes(app);
app.listen(8000);