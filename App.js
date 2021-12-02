const dotenv = require("dotenv")
const express=require("express")
const app= express();

const mongoose= require ("mongoose")
dotenv.config({path:"./config.env"}) 
/*express.json krke koi bhi data aye usko convert krdo object me*/
app.use(express.json()); 
require("./db/conn");
//we link router files to make aour nroute easy
app.use(require("./router/auth"))
/*loi bhi data aye object me kr do convert and dikah 
do*/

const User = require("./model/userSchema")

const PORT=process.env.PORT || 5000;

// app.get("/contact",(req,res) =>{
//     res.cookie("test" ,'thapa');
//     res.send("hello from server");
// }) 

//3: heroku
if(process.env.NODE_ENV="production"){
    app.use(express.static("client/build"));
}
app.listen(PORT,()=>{
    console.log(`server is running ON PORT ${PORT}`)
})