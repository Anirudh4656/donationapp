import React, { createContext,useReducer } from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Logout from "./components/Logout";

import "bootstrap/dist/css/bootstrap.min.css"
import {Route , Switch} from "react-router-dom";
import { initialState, reducer } from './components/reducer/UseReducer';
export const UserContext = createContext();
const Routing = ()=>{
    return(
    <Switch>
    <Route  exact path="/Home">
        <Home />
    </Route>
    <Route path="/About">
       <About/>
    </Route>
    <Route path="/Contact">
        <Contact />
    </Route>
    <Route path="/Login">
        <Login />
    </Route>
    <Route path="/Signup">
        <Signup />
    </Route>
    <Route path="/Logout">
        <Logout />
    </Route>
    /*last me lika nhi to / phle padh lega*/
    <Route  path="/">
        <Error />
    </Route>
 
    </Switch>)
}
const App = () => {
    //1.we need context api
   
    const[state, dispatch] = useReducer(reducer,initialState)
    return (
        <div>
            <UserContext.Provider value={{state ,dispatch}}>
            <Navbar />
             <Routing />
            </UserContext.Provider>
        </div>
    )
}

export default App
