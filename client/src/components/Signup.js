import React, {useState} from 'react'
import { NavLink , useHistory}  from "react-router-dom";
import  "./signup.css"
import img1 from "../images/img1.svg";
const Signup = () => {
   const history = useHistory();
   const [user, setUser] = useState({
      name:"",email:"",phone:"" , work:"" , password:"", cpassword:""
    
     });
   let name, value;    
     const handleInputs =(e)=>{
      console.log(e);
      name = e.target.name;
      value = e.target.value;
      setUser({...user ,[name]:value})
   }
   const PostData = async(e)=>{
      /*promise return krta h fetch */
      e.preventDefault();
      const{ name,email,phone, work, password, cpassword} = user;
       const res= await fetch("/register",{
         method:"POST",
         headers:{
            "Content-Type": "application/json"},
          body:JSON.stringify({
             name, email, phone , work ,password , cpassword
          })

       });
       const data = await res.json();
       if (data.status===422 || !data){
          window.alert("Invalid Registration");
          console.log("Invalid Registration");
       }else{
          window.alert("Registration Successful");
          console.log("Successful Registration");

          history.push("/login");
       }
       
       
   }

    return (
        <>
        <section className="signup">
        <div className="container-signup">
       <div class="forms-container-signup">

<form method="POST" className="forms-container-form" id="registration-form" >
 <h2 class="title">SignUp</h2>
<div className="input-field-signup">
<label htmlfor="name">
<i class="zmdi zmdi-account material-icons-name"></i>
</label>
<input  className="input-field-input" type="text" name="name" id="name" autoComplete="off"
value={user.name}
onChange={handleInputs}
   placeholder="Your name"
   />
</div>
<div className="input-field-signup">
<label htmlfor="email">
<i class="zmdi zmdi-email material-icons-name"></i>
</label>
<input className="input-field-input" type="email" name="email" id="email" autoComplete="off"
value={user.email}
onChange={handleInputs}
   placeholder="Your email"
   />
</div>


<div className="input-field-signup">
<label htmlfor="phone">
<i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
</label>
<input className="input-field-input" type="number" name="phone" id="phone" autoComplete="off"
value={user.phone}
onChange={handleInputs}
   placeholder="Your phone"
   />
</div>
<div className="input-field-signup">
<label htmlfor="work">
<i class="zmdi zmdi-slideshow material-icons-name"></i>
</label>
<input className="input-field-input" type="text" name="work" id="work" autoComplete="off"
value={user.work}
onChange={handleInputs}
   placeholder="Your work"
   />
</div>
<div className="input-field-signup">
<label htmlfor="password">
<i class="zmdi zmdi-lock material-icons-name"></i>
</label>
<input className="input-field-input" type="password" name="password" id="password" autoComplete="off"
value={user.password}
onChange={handleInputs}
   placeholder="Your password"
   />
</div>
<div className="input-field-signup">
<label htmlfor="cpassword">
<i class="zmdi zmdi-lock material-icons-name"></i>
</label>
<input className="input-field-input" type="password" name="cpassword" id="password" autoComplete="off"
value={user.cpassword}
onChange={handleInputs}
   placeholder="Your cpassword"
   />
</div>

<input type="submit" name="signup" id="signup" className="btn-solid" value="registration" onClick={PostData}
/>

</form>

        <div className="signup-img">
        <div class="content-h3">
                <h3>One of us! </h3>
                <NavLink to="/login" className="img-link-2"> Signin </NavLink>
            </div>
        
           <img  className="signup-img"src={img1} alt="" />
         
             
          
        
        </div>
        </div>
        </div>
        </section> 

       
        </>
    )
}

export default Signup
