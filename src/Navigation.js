import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { auth } from './Firebase';
import {  signOut } from "firebase/auth";
import "./navigate.css";


function Navigation() {

    let navigate=useNavigate();
    const click=()=>{
     signOut(auth).then(
         (res)=>{alert("sign out successful")
         navigate({pathname:"/"})
     }
     )
    }
    return (
        <div className="navigate">

      <div className="nav">
       <ul className="link">
           <li className="li">
              <Link to="/add">ADD-Details</Link>
           </li>

           <li className="li">
               <Link to="/display">Display-Details</Link>
           </li>

          </ul>

          <button className="btn" onClick={click}>sign out</button>
      </div>
            
        </div>
    )
}

export default Navigation
