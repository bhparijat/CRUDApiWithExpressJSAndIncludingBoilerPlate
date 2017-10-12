const mongoose = require('mongoose');

const schema = mongoose.Schema;
const  ObjectId = schema.ObjectId;
//const ObjectId = new mongoose.Types.ObjectId;
const dbSchema = schema({
      
        author: String,
        title: String,
        description: String,
        url: String,
        urlToImage: String,
        publishedAt: String,
      
})
const newsApi = mongoose.model('model',dbSchema);
const db = mongoose.connection;
module.exports={
    newsApi:newsApi,
    db:db,
    dbSchema:dbSchema
}
// db.once('open',()=>{
//     console.log('connected');
//     const art = new newsApi({
//         author:"parijat",
//         title:"title again",
//         description:"descritpion again",
//         url:"url again",
//         urlToImage:"urlToImage again",
//         publishedAt:"published so what jd tujdt rtdscstu "
//     })
//     art.save((err,prod,abc)=>{
//         if(err)
//         console.log('error is here',err);
//     })
//     newsApi.find({ publishedAt:"published so what jd tujdt rtdscstu "},(err,articles)=>{
//        if(err)
//        console.log(err);
//        else
//        console.log(articles);
//     })
// })

