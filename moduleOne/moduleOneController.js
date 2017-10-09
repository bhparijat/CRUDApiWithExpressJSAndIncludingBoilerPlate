const fs = require('fs');
const path =require('path');
let getData=function(req,callback){
    fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{
        if(err)
         {
             return callback(err,{});
         }    
         else{
             return callback(null,data);
         }
      })
}
let postData=function(req,callback){
    fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{
     if(err){
         return callback(err,{});
     }   
    let dbData=JSON.parse(data);
    
    //console.log('articles',dbData.articles);
    dbData.articles.push(req.body);
    //console.log('articles modified',dbData.articles);
    fs.writeFile(path.join(__dirname,'./db.json'),JSON.stringify(dbData),(err)=>{

        // res.write('data saved');
         //res.end();
         return callback(null,JSON.stringify(dbData));

})

})
}
let deleteData=function(req,callback){
     fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{
         if(err){
             return callback(err,{});
         }
        let dbData=JSON.parse(data);
        let dupDbData=[];
        dbData.articles.forEach(function(element,index) {
            if(element.id==req.params.id){
                dbData.articles.splice(index,1);
            }
        });
       
        
        console.log('articles modified',dbData.articles);
        fs.writeFile(path.join(__dirname,'./db.json'),JSON.stringify(dbData),(err)=>{

             //res.write('data saved');
            // res.end(JSON.stringify(dbData));
            return callback(null,JSON.stringify(dbData));

    });
   
});
}
let patchData=function(req,callback){
     fs.readFile(path.join(__dirname,'./db.json'),(err,data)=>{
        if(err){
            return callback(err,{});
        }
         let dbData=JSON.parse(data);
         
         dbData.articles.forEach(function(element,index) {
            if(element.id==req.params.id){
                dbData.articles[index]=req.body;
            }
        });
         console.log('articles modified',dbData.articles);
         fs.writeFile(path.join(__dirname,'./db.json'),JSON.stringify(dbData),(err)=>{
 
              //res.write('done');
              return callback(null,JSON.stringify(dbData));
 
     });
})
}
let obj={
    "getData":getData,
    "postData":postData,
    "deleteData":deleteData,
    "patchData":patchData
}
module.exports=obj
