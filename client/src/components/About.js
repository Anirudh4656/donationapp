import React ,{useEffect, useState} from 'react'
import { useHistory  } from 'react-router';
import img5 from "../images/img5.svg";
import "./about.css";
const About = () => {
    const history = useHistory();
     const [userData, setUserData] = useState({});
     /*name not defined a rha kyoki initial hmne kuch nhi btaya*/
    const callAboutPage = async() =>{
        try{
            /*get =take data from backend*/
          const res =  await fetch("/about",{
              method:"GET",
              headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
              },
              credentials:"include"
          });
          const data =await res.json();
          console.log(data);
          setUserData(data);
          if(!res.status===200){
              const error = new Error(res.error);
              throw error;
          }
        }catch(err){
            console.log(err);
            history.push("/login");
        }
    }
    /*useeffect me async awit use na kr skta*/
    useEffect(()=>{
        callAboutPage();
    },[]);
    /*[]= array dependency means first time page load hoga tbhi chlega
    nhi to nhi chlega*/

    return (
        <>
            <form method ="GET">
            <div className="about-container">
                <div className="small-about">
                <div className="about-small-left">
                    <img src={img5}  className="about-small-left-img" alt="" />
                </div>
                    <div className="about-small-right">
                    <h1 className="name-field">{userData.name}</h1>
                    <p className="name-work">{userData.work}</p>
                    <div className="name-about">
                        <p className="name-about-name">About</p>
                        <ul className="name-profile">
                            <li>User-Id: <span className="li-span">{userData._id}</span> </li>
                            <li>Name:<span className="li-span">{userData.name}</span></li>
                            <li>Email:<span className="li-span">{userData.email}</span></li>
                            <li>Phone:<span className="li-span">{userData.phone}</span></li>
                            <li>Profession:<span className="li-span">{userData.work}</span></li>
                        </ul>
                    </div>
                   
                    </div>
               
                </div>
            </div>
            </form>
        </>
    )
}

export default About
