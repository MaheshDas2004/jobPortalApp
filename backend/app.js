const express= require('express')
const app= new express()

const session=require("express-session")

app.use(session({
    maxAge:60*60*1000,
    secret:"my-secret-key"
}));

app.post('/login',(req,res)=>{

    
    req.session.user={
        email,
        isLoggedin:true
    }

});