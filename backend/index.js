const express=require('express')
const app=express()
const port=5000
const mongoDB=require('./db');
mongoDB();

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));

app.get('/',(req,res)=>{
    res.send("Home page");
})

app.listen(port,()=>{
    console.log(`server up on port ${port}`)
})