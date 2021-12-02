const mongoose = require("mongoose");
const db=process.env.DATABASE;
/*mongoose return promise*/
mongoose.connect(db,{useNewUrlParser:true,
    useCreateIndex:true,
 useUnifiedTopology:true,
useFindAndModify:false})
.then(()=>{ console.log("connection succesfull")})
.catch((err)=>console.log("no connection"));

