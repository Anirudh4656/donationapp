const mongoose= require("mongoose");
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken");
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
      
        message:{
            type:String,
            required:true
        }        
    }],
    tokens:[{
        token:{
            type:String,
            required:true 
        }
    }]
    
})


//we are hashing the password 

userSchema.pre("save",async function(next){
    /*we have used traditional function because this key word work differently with ft arroy function*/ 
    /*promose return kr rha hoga*/
    console.log("hii")
    if (this.isModified("password")){
        /*password modify hoga to he hash ho nhi to save method me sab hash ho jayenge*/
        /*mene await mhi lgaya to error aya*/
       this.password = await bcrypt.hash(this.password,  12)
       this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
    /*next call keya taki iske bad ka process ho jaye*/
});
//we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        /*concat mtlb add krna tokens me jo token fiel h usme token ko add
        krna*/
       await  this.save();
       /*promise return krega*/
       return token;
       /*return ku kar rha h*/
    }catch(err){
        console.log(err); 
    }
}
/*stored the message*/
userSchema.methods.addMessage = async function(name, email,message){
  try{
   this.messages=this.messages.concat({name, email,message})
   await this.save();
   return this.messages;
  }catch(e){
      console.log(e);
  }
}
const User =mongoose.model("USER",userSchema);
/*collection name =USER*/

module.exports= User;