const should = require('chai').should();
const assert = require('chai').assert;
const supertest = require('supertest');
const app = require('../../app')
const url = supertest("http://localhost:8000");
describe('Test suites',(err)=>{
    it("should handle get request and return json",(done)=>{
        // setTimeout(()=>
        // {
        //    console.log('done waiting')
        // },3000);
     url
       .get('/articles')
       .expect(200)
       .expect('Content-Type','application/json')
       .end((err,res)=>{
           if(err){
               throw err;
           }
           done();
       })
       
    }).timeout(5500);
    it.skip("should handle post request and return json",(done)=>{
        url
          .post('/articles')
          .expect(200)
          .expect('Content-Type','application/json')
          .end((err,res)=>{
              if(err){
                  throw err;
              }
              
              done();
          })
       })
       it.skip("should handle patch request and return json",(done)=>{
        url
          .patch('/updateData/:id')
          .expect(201)
          .expect('Content-Type','application/json')
          .end((err,res)=>{
            //   if(err){
            //       throw err;
            //   }
              
              done();
          })
       })
       it.skip("should handle delete request and return json",(done)=>{
        url
          .delete('/articles/:id')
          .expect(200)
          .expect('Content-Type','application/json')
          .end((err,res)=>{
              if(err){
                  throw err;
              }
              
              done();
          })
       })
       it.skip("should handle get request and check if article array is present or not",(done)=>{
        url
          .get('/articles')
          .expect(201)
          .end((err,res)=>{
              if(err){
                  throw err;
              }
              //res=res.json();
             //
            // console.log(res.body.articles);
              assert.isOk(res.body.hasOwnProperty('articles'))
              
              done();
          })
       })

})
