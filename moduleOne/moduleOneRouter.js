
const express = require('express');
const router = express.Router();
const path = require('path');
const moduleOneController = require('./moduleOneController.js')
router.get('/articles',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
    
      moduleOneController.getData(req,(err,result)=>{
          if(err){
            return res.status(500).end(
                JSON.stringify( 'Something went wrong with get, please try later..!')
              );
          }
          else{
              return res.end(result);
          }
      });
  
       
    
});

router.post('/savedData',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
  // moduleOneController.postData(req,res);
   
    moduleOneController.postData(req,(err,result)=>{
        if(err){
            return res.status(500).end(
                JSON.stringify( 'Something went wrong with post, please try later..!')
              );
        }
        else{
            return res.end(result);
        }
    });
  
      
  
});
router.delete('/article/:id',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
   // moduleOneController.deleteData(req,res);
    
        moduleOneController.deleteData(req,(err,result)=>{
            if(err){
                return res.status(500).end(
                    JSON.stringify( 'Something went wrong with delete, please try later..!')
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
                    JSON.stringify( 'Something went wrong, please try later..!')
                  );
            }
            else{
                return res.end(result);
            }
        });
     
})
module.exports=router;