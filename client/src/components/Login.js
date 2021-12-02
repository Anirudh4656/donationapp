import React ,{useState,useContext} from 'react'
import { NavLink , useHistory}  from "react-router-dom";
import  "./Login.css"
import img2 from "../images/img2.svg";
import { UserContext } from '../App';

const Login = () => {
    const {state, dispatch} = useContext(UserContext);

   const history = useHistory();
   const[email, setEmail]= useState('');
   const[password, setPassword]= useState('');
 
   const loginUser = async(e)=>{
      e.preventDefault();
      const res= await fetch("/signin",{
         method:"POST",
         headers:{
            "Content-Type": "application/json"},
          body:JSON.stringify({
             email,
             password 
          })
          });
          const data = res.json();
          console.log(data)
          if(res.status ===400 || !data){
             window.alert("Invalid Credentials");
          }else{
             dispatch({type:"USER",payload:true})
             window.alert("login successfully")
             history.push("/Home");
          }
          
   }
    return (
       <>
      
        <div className="container-signin">
        <div class="forms-container">
          <div className="signin-img">
           <img  className="signin-img"src={img2} alt="" />
            <div class="content-signin">
                <h3 className="content-signin-newhere">New Here?</h3>
                <h3 className="content-signin-signupNow"> Don't worry<span> <NavLink to="/signup" className="img-link-2">Sign up </NavLink> </span>  Now </h3>
               
            </div>
            </div>
       
<form  method="POST" className="forms-container-form" id="registration-form" >
 <div className="forms-container-form-div">
<p class="title-welcome">Welcome Back</p>
<p class="title-title">Please sign-in to continue!</p></div>
<div className="input-field">
<label htmlfor="email">
<i class="zmdi zmdi-email material-icons-name"></i>
</label>
<input className="input-field-input" type="email" name="email" 
   value={email}
   onChange={(e)=> setEmail(e.target.value)}
   id="email" autoComplete="off"
   placeholder="Your email"
   />
</div>


<div className="input-field">
<label htmlfor="password">
<i class="zmdi zmdi-lock material-icons-name"></i>
</label>
<input className="input-field-input"  type="password" name="password"
 value={password}
onChange={(e)=> setPassword(e.target.value)}
 id="password" autoComplete="off"
   placeholder="Your password"
   />
</div>

<button  className="btn-solid" type="Submit" name="signin" value="LOGIN"
      onClick={loginUser}  >Login</button>
</form>

        </div>
        </div>
      
     
       </>
    )
}

export default Login
