
const express = require('express');
const router = express.Router();
const path = require('path');
const moduleOneController = require('./moduleOneController.js')
router.get('/articles',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
    try{
      moduleOneController.getData(req,(err,result)=>{
          if(err){
            return res.status(500).json({
                error: 'Something went wrong, please try later..!'
              });
          }
          else{
              return res.end(result);
          }
      });
    }catch(err){
        return res.status(500).json({
            error: err
          });
    }
});

router.post('/savedData',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
  // moduleOneController.postData(req,res);
   try{
    moduleOneController.postData(req,(err,result)=>{
        if(err){
          return res.status(500).json({
              error: 'Something went wrong, please try later..!'
            });
        }
        else{
            return res.end(result);
        }
    });
  }catch(err){
      return res.status(500).json({
          error: err
        });
  }
});
router.delete('/article/:id',(req,res,next)=>{
    res.writeHead(200,{"content-type":"application/json"});
   // moduleOneController.deleteData(req,res);
    try{
        moduleOneController.deleteData(req,(err,result)=>{
            if(err){
              return res.status(500).json({
                  error: 'Something went wrong, please try later..!'
                });
            }
            else{
                return res.end(result);
            }
        });
      }catch(err){
          return res.status(500).json({
              error: err
            });
      }
})
router.patch('/updateData/:id/',(req,res,next)=>{
    res.writeHead(201,{"content-type":"application/json"});
    //console.log(req.body);
    //moduleOneController.patchData(req,res);
    try{
        moduleOneController.patchData(req,(err,result)=>{
            if(err){
              return res.status(500).json({
                  error: 'Something went wrong, please try later..!'
                });
            }
            else{
                return res.end(result);
            }
        });
      }catch(err){
          return res.status(500).json({
              error: err
            });
      }
})
module.exports=router;