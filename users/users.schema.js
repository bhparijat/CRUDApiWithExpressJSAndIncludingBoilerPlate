const dse = require('dse-driver');
const async=require('async');
const client = new dse.Client({ contactPoints: ['127.0.0.1'], protocolOptions: { maxVersion:4 }
});

const createKeyspaceQuery=`CREATE KEYSPACE user_database WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'}`
const createTable=`create table users("username" text primary key ,"email" text,"contact" text,"password" blob)`;

const createConnection=function createConnection(callback){
async.waterfall([
    function(callback){
        client.connect(function(err,result){
            if(err){
                callback(err,"eroor in connect");
            }
        
            console.log('cassandra connected');
            console.log(Object.keys(client.metadata.keyspaces));
            console.log(Object.keys(client.metadata.keyspaces).includes('user_database'));
            callback(null,Object.keys(client.metadata.keyspaces).includes('user_database'));
        });
    },    
    
        function(check,callback) {

            if(check===false){
                client.execute(createKeyspaceQuery,function(err) {
                if (!err) {
                    console.log("new keyspace created");
                    console.log(Object.keys(client.metadata.keyspaces));
                    callback(null,false);
                }
                else{
                    console.log(err);
                    console.log("error in keyspace creation");
                    callback(err,"eror inkeyspace");
                }
          
            });
        }
        else{
            callback(null,true);
        }
        
        } ,
        function(check,callback) {
            console.log(check);
            if(check===false){
                client.execute("use user_database", (err,result) =>{
                    if(err){
                        console.log("err",err);
                        callback(err,"use datase error");
                    }

                    else {
                        callback(null,false);
                    }
                });
            }
            else{
                callback(null,true);
            }
        },
        function(check,callback){
            console.log(check);
            if(check===false){
            client.execute(createTable,(err,result) =>{
                        if(err){
                            console.log("err",err);
                            callback(err,"create table error");
                        }
                        else {
                        console.log("table created");
                        callback(null,true);
                        }
                
                    });
                }
                else{
                    callback(null,true);
                }        
        },
        function(check,callback){
            client.execute("use user_database", (err,result) =>{
                console.log("use database when database exists method");
                if(err){
        
                    console.log("err",err);
                    callback(err,"error");
                }
                else{
                console.log("using database");
                callback(null,'using database')
                }
            });
        
        },

],(err,result) =>{
    if(err){
        console.log("error in async series",err);
    
    }
    else {
        console.log("connection successfull");
        console.log(result);
       
  
        
         
        
    }
   
    
});


};

module.exports=createConnection;
