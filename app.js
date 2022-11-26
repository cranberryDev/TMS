// import client from './dbconnection.js'

const express=require('express');
const http=require('http');
const app=express();
const bodyParser=require('body-parser');
const Pool=require('pg').Pool;
const port=3000;
const fs=require('fs');
const dotenv = require("dotenv")
const account=require('./users/accounts')
const payment=require('./payment/payment')



dotenv.config()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
app.use((req,res,next)=>{
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Credentials','true');
    res.set('Access-Control-Allow-Headers','*');
    res.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
    next();
})
app.get('/',(request,response)=>{
    response.json({info:'Node.js Express'})
})

app.get('/getUsers',account.getUsers)
app.get('/getUsers/:id',account.getUserById)
app.get('/userCheck',account.userCheck)

app.post('/createUsers',account.createUsers)
app.post('/pay',payment.makePayment)
// app.post('/students',account.students)

app.delete('/deleteUsers/:id',account.deleteUser)


app.listen(port,function(error){
    if(error){
        console.log('something went wrong',error);
    }
    else{
        console.log("server is listening on port:"+port);
    }

})







