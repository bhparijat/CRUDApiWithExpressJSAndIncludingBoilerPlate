const fs = require('fs');
const path =require('path');
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
let passFunctions={
    "getData":getData,
    "postData":postData,
    "deleteData":deleteData,
    "patchData":patchData
}
module.exports=passFunctions
