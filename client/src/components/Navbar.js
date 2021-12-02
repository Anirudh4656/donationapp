import React ,{useContext} from 'react';
import { UserContext } from '../App';
import { NavLink }  from "react-router-dom";

const RenderMenu=()=>{
  const{state,dispatch} = useContext(UserContext)
  if(state){
return(
  <>
     <li class="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/Home">Home</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/About">About</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/Contact">Contact</NavLink>
        </li>
       
        <li class="nav-item">
          <NavLink className="nav-link" to="/Logout">logout</NavLink>
        </li>
  </>
)}else{
  return(
    <>
      <li class="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/Home">Home</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/About">About</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/Contact">Contact</NavLink>
        </li>
       <li class="nav-item">
          <NavLink className="nav-link" to="/Login">Login</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/Signup">Signup</NavLink>
        </li>
    </>
  )
}
}

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent ">
  <div class="container-fluid">
   
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mr-auto">
       <RenderMenu />
      
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
