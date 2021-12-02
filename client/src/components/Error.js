import React from 'react'
import {NavLink} from "react-router-dom";
import "./Error.css"

const Error = () => {
    return (
        <>
         <div id="notfound">
 <div className="notfound">
     <div className="not found-404">
     <h1>404 </h1>
            
        </div> 
        <h2>we are sorry,page not found</h2>
        <p className="mb-5">
        the page you are looking is not av..
        </p>

        /*isse button a gya*/
        <NavLink to ="/"> Back to Homepage </NavLink>
        </div> 
        </div> 
        
        </>  
       
    )
}

export default Error
