import React,{useState,useEffect} from 'react'
import "./contact.css";
import img3 from "../images/img3.svg";
const Contact = () => {
  
    const [userData, setUserData] = useState({name:"", email:"", message:""});
    /*name not defined a rha kyoki initial hmne kuch nhi btaya*/
   const userContact= async() =>{
       try{
           /*get =beckend se data lena h*/
         const res =  await fetch("/getdata",{
             method:"GET",
             headers:{
                 /* no cookie shared so  no accept*/
               
                 "Content-Type":"application/json"
             },
            /*token nhi bhej rha to no credential*/
         });
         const data =await res.json();
         console.log(data);
         setUserData({...userData, name:data.name, email:data.email })
         
         if(!res.status===200){
             const error = new Error(res.error);
             throw error;
         }
       }catch(err){
           console.log(err);
          
       }
   }
   /*useeffect me async awit use na kr skta*/
   useEffect(()=>{
       userContact();
   },[]);
   /*we are storing data in state*/
   const handleEvents=(e)=>{
         const name= e.target.name;
         const value= e.target.value;
        setUserData({...userData, [name]:value})
    
   }
   const send = async(e) => {
      e.preventDefault();
      const{name,email,phone,message}= userData;

     const res= await fetch('/contact',{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             name,email,message
         })
         });
         const data= await res.json();
         if(!data){
             console.log("no message sent")
         } else{
             alert("message send")
             setUserData({...userData, message:""})
         }
   

   }
    return (
        <>
       
        <div className="contact-container">
            <div className="contact">
            <img  className="contact-img" src={img3} alt="" />
            <form  className="contact-forms" method="POST">
            <h2 class="title">Get in Touch</h2>
         
<div className="input-field-contact">
<label htmlfor="name">
<i class="zmdi zmdi-account material-icons-name"></i>
</label>
<input  className="input-field-input-contact" autoComplete="off"
name="name"
value={userData.name}
onChange= {handleEvents} />
   </div>
<div className="input-field-contact">
<label htmlfor="name">
<i class="zmdi zmdi-email material-icons-email"></i>
</label>
<input  className="input-field-input-contact" type="text" name="email" id="name" autoComplete="off"
value={userData.email}
onChange= {handleEvents}
   />
</div>
<div className="input-field-contact-textarea">
         <textarea 
         className="input-field-input-contact-placeholder"
             value={userData.message}
             name="message"
             onChange={handleEvents}
             placeholder="messages" cols="30" rows="10"></textarea>     
           
       
        <button  className="contact-btn" type="Submit"
        onClick={send}>Send message</button>
        </div>
        </form>
       
            </div>
            </div>
       
        </>
    )
}

export default Contact;
