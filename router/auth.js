const jwt = require("jsonwebtoken");
const express= require("express");
const app= express();
app.use(express.json());
const router= express.Router();
const bcrypt = require("bcryptjs") 
const cokkiep= require("cookie-parser")
const crypto = require("crypto");
router.use(cokkiep())

require("../db/conn")
const authenticate =require ("../middleware/authenticate");
const Razorpay =require("razorpay");
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRETKEY,
  });
  console.log(instance);
const User= require("../model/userSchema")
// router.get("/",(req,res) =>{
//     res.send("hello from server");
// })
//Using Promises
// router.post("/register",(req,res)=>{
//     const{name, email, phone , work,password,cpassword} = req.body
//     if( !name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"plz fill the field properly"});
//     }
//     user.findOne({email:email}).then((userExist)=>{
//         if (userExist){
//             return res.status(422).json({error:"already registered"});  
//         }
//         const user= new User({name, email, phone , work,password,cpassword})
//         user.save().then(()=>{
//             res.status(201).json({message:"user registered sucessfully"});
//         }).catch((err)=>res.status(500).json({error:"Failed to register"}))
//     }).catch(err =>{console.log(err);});
//     // user ne jo bhi likha vo mil gya
//     // console.log(name);
//     // console.log(email);
//     res.send("mera register page")
// })
/*jab bhi data cheye to post*/
router.post("/register",async(req,res)=>{
    const{name, email, phone , work,password,cpassword} = req.body
    if( !name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"plz fill the field properly"});
    }
    try{
       const userExist = await User.findOne({email:email});
       if (userExist){
        return res.status(422).json({error:"already registered"});
    }else if( password != cpassword){
        return res.status(422).json({error:"wrong password"})
    }else{
        const user= new User({name, email, phone , work,password,cpassword})
          /*sending to database*/
        await user.save();
            res.status(201).json({message:"user registered sucessfully"});
          
    }
     
            const userRegistration = await user.save();
            if(userRegistration){
               return res.status(201).json({message:"user registered sucessfully"});
            }
           
    } catch(err){
        console.log(err);
    }
   
   
    // res.send("mera register page")
})
router.post("/signin", async (req,res)=>{
    try{
        const{ email,password}= req.body;
        /*kye jgh to return use kr rkha h pr kye jgh nhi*/
        if(!email || !password){
            return res.status(400).json({error:"Plz fill the dta"})
        }
        const userLogin = await User.findOne({email:email})
        console.log(userLogin);
        if(userLogin){
            /*compare kr rha h ke user ne jo password dala h aur databse ka paaword*/
            const isMatch = await bcrypt.compare(password,userLogin.password)
            /*token genrate keya aur ye promise return kr rha h*/
            token =await userLogin.generateAuthToken();
            console.log(token)
            res.cookie("anirudh", token,{
                expires:new Date(Date.now() + 300000),/*millisec me likhna h*/
                httpOnly:true,
            })
            if(!isMatch){
              res.status(400).json({error:"Invalid credential"});
            //  return res.status(400).json({error:"Invalid credential"});
            }else{
            
               res.json({message:"user Signin Successsfully"});
            //   return  res.json({message:"user Signin Successsfully"});
            }
            
        }else{
            res.status(400).json({error:"Invalid credential"})
        //    return res.status(400).json({error:"Invalid credential"})
        }
        
       
    }catch (err){
        console.log(err)
    }
})
//about us ka page
router.get('/about',authenticate, (req,res)=>{
    console.log(`this is my cokkies ${req.cookies.anirudh}`);
    // res.send(req.rootUser);
    res.send(req.rootUser);

})
//get user data for contact us and homepage
router.get('/getData',authenticate, (req,res)=>{
    console.log("hello my about");
    // res.send(req.rootUser);
    res.send(req.rootUser);

})
router.post('/contact',authenticate, async(req,res)=>{
   try{
   const {name,email, message} = req.body;
   console.log(req.body);
   if(!name || !email || !message){
       console.log("error in contact form")
       return res.json({error:"plzz fillled the contact form"});
   }
   const userContact = await User.findOne({_id:req.userID});
   if(userContact){
       const userMessage =await userContact.addMessage( name,email,message);
       await userContact.save();
       res.status(201).json({message:"user contact succesfully"})
   }
   }catch(e){
       console.log(e);
   }

})

router.get('/logout', (req,res)=>{
    console.log("hello my logout page");
    res.clearCookie("anirudh",{path:'/'})
    // res.send(req.rootUser);
    res.status(200).send("user logout");

})
 router.post("/checkout",async(req,res)=>{
    const {amount}=req.body;
    console.log(amount);
    const options={
        amount:Number(amount*100),
        currency:"INR",
      
    };
   const orders = await instance.orders.create(options)
   console.log(orders);
   res.status(200).json({
    success:true,
    orders
   });
});
 router.post("/payment",async(req,res)=>{
 
    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

 
    const expectedSignature = crypto.createHmac('sha256', '9Ks4CEQeeDi0M893fJP9StqI')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received " ,req.body.response.razorpay_signature);
                                    console.log("sig generated " ,expectedSignature);
    var response = {"signatureIsValid":"false"}
    if(expectedSignature === req.body.response.razorpay_signature){
        await User.create({
            razorpay_signature,
            razorpay_order_id,
            razorpay_payment_id
        })
  res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_order_id}`)
    }else{
        res.status(400).json({
            success:false,
        });
    }




   res.status(200).json({
    success:true,
    orders
   });
})
 router.get("/gateway",async(req,res)=>{
   
   res.status(200).json({
    success:true,
  key:process.env.RAZORPAY_API_KEY
   });
});
module.exports=router;