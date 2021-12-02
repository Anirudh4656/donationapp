const jwt = require("jsonwebtoken");
const express= require("express");
const app= express();
app.use(express.json());
const User= require("../model/userSchema");
const cokkiep= require("cookie-parser")
/*middle ware ke trh use krna h to app.usr*/
app.use(cokkiep())
const authenticate = async (req,res,next)=>{
    try{
        console.log(req.cookies);
 const token =req.cookies.anirudh;
 
 /*revise once again*/
 const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
 const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})
 console.log(verifyToken)
 console.log(rootUser)
 if(!rootUser){ throw new Error("User not found")}
 req.token = token;
 req.rootUser= rootUser;
 req.userID = rootUser._id;
 next();
 /*next ko call krna pdega nhi to middleware me fas jayega*/
 }
     catch(err){
        res.status(401).send("Unauthorized:No token provided");
        console.log(err);
    }

}
module.exports= authenticate;