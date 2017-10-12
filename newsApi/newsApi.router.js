
const express = require('express');
const router = express.Router();
const path = require('path');
const moduleOneController = require('./newsApi.controller.js')
router.get('/articles',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
    console.log('inside get router');
      moduleOneController.getData(req,(err,result)=>{
          if(err){
            return res.status(500).end(
                JSON.stringify( err)
              );
          }
          else{
           
                return res.end(result);
           
             
          }
      });
  
       
    
});

router.post('/articles',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
  // moduleOneController.postData(req,res);
   
    moduleOneController.postData(req,(err,result)=>{
        if(err){
            return res.status(500).end(
                JSON.stringify( err)
              );
        }
        else{
            return res.end(result);
        }
    });
  
      
  
});
router.delete('/articles/:id',(req,res,next)=>{
    //console.log('delete request',req);
    res.writeHead(200,{"content-type":"application/json"});
   // moduleOneController.deleteData(req,res);
    
        moduleOneController.deleteData(req,(err,result)=>{
            if(err){
                return res.status(500).end(
                    JSON.stringify(  err)
                  );
            }
            else{
                return res.end(result);
            }
        });
      
})
router.patch('/updateData/:id/',(req,res,next)=>{
    res.writeHead(201,{"content-type":"application/json"});
    
   
        moduleOneController.patchData(req,(err,result)=>{
            if(err){
                return res.status(500).end(
                    JSON.stringify( err)
                  );
            }
            else{
                return res.end(result);
            }
        });
     
})
module.exports=router;