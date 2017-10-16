const fs = require('fs');
const path = require('path');
const entity = require('./newsApiEntity');
//const db = entity.db;
const newsApi = entity.newsApi;
let getDataMongo = function (req,callback){
    newsApi.find(function(err,results){
    try{
        if(err)
         throw err;
        else{
          //console.log('reasults',results);
         return callback(null,JSON.stringify(results))
        }
    }catch(err){
      return callback(err,null);
    }
    })
    
}
let postDataMongo = function(req,callback){
    let toSaveArticle=new newsApi(req.body);
        let  checkDup={
            author:toSaveArticle.author,
            title:toSaveArticle.title,
            description:toSaveArticle.description
        }
       newsApi.findOne(checkDup,function(err,res){
           //console.log('result',res);
           console.log(err);
            try{
                if(err)
                throw err;
                else if(res != null)
                throw new Error('duplicate exists')
            }catch(err){
            return callback(err,null);
            }
        })
    toSaveArticle.save(function(err,toSaveArticle,numAffectted){
        try{

            if(err)
            throw err;
            else if(numAffectted==0)
            throw new Error('unable to persist data');
            else
            return callback(null,JSON.stringify(toSaveArticle));
          

    }catch(err){
        return callback(err,null);
    }
    })
}
let  deleteDataMongo = function(req,callback){
   
    let  query = {"_id":req.params.id};
    //console.log(req.params.id);
    newsApi.findOneAndRemove(query,function(err,doc){
    try{
        if(err)
        throw err;
        else{
            console.log('deleted');
            return callback(null,JSON.stringify(doc));
        }
    }catch(err){
       // console.log(err);
        return callback(err,null);
    }

    })
}
let updateDataMongo = function(req,callback){
    let query = {"_id":req.params.id};
    let update = {"description":String(req.body.description)};
   
   newsApi.findOneAndUpdate(query,update,{new:true},function(err,doc){
   try{
      if(err)
      throw err;
      
      return callback(null,JSON.stringify(doc));
   }catch(err){
       //console.log(doc);
       return callback(err,null)
   }
   })
   
}

/*function for using file system*/
/* 
let getData=function(req,callback){
  
    fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{
        if(err)
         {
             return callback(err,{});
         }    
         else{
             //console.log('data',data);
             return callback(null,data);
         }
      })
}
let postData=function(req,callback){
    //console.log(req.body);
    fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{

    try{
        let dbData=JSON.parse(data);
        
        //console.log('articles',dbData.articles);
        dbData.articles.push(req.body);
        //console.log('articles modified',dbData.articles);
        fs.writeFile(path.join(__dirname,'./db.json'),JSON.stringify(dbData),(err)=>{

            // res.write('data saved');
            //res.end();
            return callback(null,JSON.stringify(dbData));

        })
    }catch(err){
        console.log('error in post')
        return callback(err,{});
    }

})
}
let deleteData=function(req,callback){
     fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{
        try{
        let dbData=JSON.parse(data);
        let dupDbData=[];
        dbData.articles.forEach(function(element,index) {
            if(element.title==req.params.id){
                dbData.articles.splice(index,1);
            }
        });
       
        
       // console.log('articles modified',dbData.articles);
        fs.writeFile(path.join(__dirname,'./db.json'),JSON.stringify(dbData),(err)=>{

             //res.write('data saved');
            // res.end(JSON.stringify(dbData));
            return callback(null,JSON.stringify(dbData));
       
    });
    }catch(err){
        return callback(err,{});
    }
   
});
}
let patchData=function(req,callback){
     fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{
      try{
       
         let dbData=JSON.parse(data);
         
         dbData.articles.forEach(function(element,index) {
            if(element.title==req.params.id){
                //console.log('voila found!')
                dbData.articles[index]=req.body;
            }
        });
        // console.log('articles modified',dbData.articles);
         fs.writeFile(path.join(__dirname,'./db.json'),JSON.stringify(dbData),(err)=>{
 
              //res.write('done');
              return callback(null,JSON.stringify(dbData));
 
     });
    }catch(error){
        //console.log(error);
        return callback(error,{});
    }
})
}
*/
let passFunctions={
    "getData":getDataMongo,
    "postData":postDataMongo,
    "deleteData":deleteDataMongo,
    "patchData":updateDataMongo
}
module.exports=passFunctions
