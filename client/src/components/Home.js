import React, {useState, useEffect} from 'react'
import "./home.css";

const Home = () => {
    
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
  
    /*name not defined a rha kyoki initial hmne kuch nhi btaya*/
   const homePage = async() =>{
       try{
           /*get =beckend se data lena h*/
         const res =  await fetch("/getdata",{
             method:"GET",
             headers:{
               
                 "Content-Type":"application/json"
             },
           
         });
         const data =await res.json();
         console.log(data);
         setName(data.name);
        //  if(!res.status===200){
        //      const error = new Error(res.error);
        //      throw error;
        //  }
        setShow(true);
       }catch(err){
           console.log(err);
         
       }
   }
   /*useeffect me async awit use na kr skta*/
   useEffect(()=>{
       homePage();
   
   },[]);
    return (
      
        <>
        <div className="home-main">
        <p className="home-main-p">Welcome!</p>
        <h2 className="home-main-p-h2">{name}</h2>
       
             <p className="home-main-p2">{show ?"Happy To See you"
              :"Please Sigin to Continue!"}</p>

        </div>
        </>
    )
}

export default Home
