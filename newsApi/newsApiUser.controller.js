// const passport = require('passport');
// const dse = require('dse-driver');
// const client = new dse.Client({ contactPoints: ['127.0.0.1'], protocolOptions: { maxVersion:4 }
// });
// const username="ananth";
// const email="ananth.mallarapu@cgi.com";
// const contact="7306117896";
// const password=Buffer.from("0xffff","utf8");
// const param=[username,email,contact,password];
// const createKeyspaceQuery=`CREATE KEYSPACE user_database WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'}`
// const createTable=`create table users("username" text primary key ,"email" text,"contact" text,"password" blob)`


// const selectQuery=`select username,email,contact,password from users`;
// client.connect(function(err,result){
   

//    console.log('cassandra connected');
//    console.log(Object.keys(client.metadata.keyspaces));
//    console.log(Object.keys(client.metadata.keyspaces).includes('user_database'));
//    if(Object.keys(client.metadata.keyspaces).includes('user_database')===false){
//        client.execute(createKeyspaceQuery,function(err) {
//        if (!err) {
//            console.log("new keyspace created");
//            console.log(Object.keys(client.metadata.keyspaces));
//        }
//        else{
//            console.log(err);
//            console.log("error in keyspace creation");
//        }
//        client.execute("use user_database", (err,result) =>{
//            if(err){
//                console.log("err",err);
//            }
//            client.execute(createTable,(err,result) =>{
//                if(err){
//                    console.log("err",err);
       
//                }
//                console.log("table created");
       
//            });
//        });
//    });
 
   
   
//        }
   
   
// });
  /* client.execute("use user_database", (err,result) =>{
       if(err){
           console.log("err",err);
       }
       console.log("using database");
   });*/


/*client.execute(insertQuery,param, function(err, result) {
   if(err){
       console.log("error");
       console.log(err);
   }
   console.log("inserted")
 });*/

 /*client.execute(selectQuery, function(err, result) {
   if(err){
       console.log("error");
       console.log(err);
   }*
   console.log("display")
  console.log(result.rows.forEach(function(element) {
       console.log("username",element.username);
       console.log("email",element.email);
       console.log("contact",element.contact);
       console.log("password",(element.password.toString('utf8')));
       
   }));
 });*/
//app.post('/login', function(req, res) {
//     console.log(res);
//     passport.authenticate('local', function(err, user) {
//       if (req.xhr) {
//         //thanks @jkevinburton
//         if (err)   { return res.json({ error: err.message }); }
//         if (!user) { return res.json({error : "Invalid Login"}); }
//         req.login(user, {}, function(err) {
//           if (err) { return res.json({error:err}); }
//           return res.json(
//             { user: {
//                       id: req.user.id,
//                       email: req.user.email,
//                       joined: req.user.joined
//               },
//               success: true
//             });
//         });
//       } else {
//         if (err)   { return res.redirect('/login'); }
//         if (!user) { return res.redirect('/login'); }
//         req.login(user, {}, function(err) {
//           if (err) { return res.redirect('/login'); }
//           return res.redirect('/');
//         });
//       }
//     })(req, res);
//   });
let registerUser=function(req,callback){
 console.log('register user called');
}
module.exports={
    registerUser:registerUser
}