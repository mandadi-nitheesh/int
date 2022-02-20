import React, { useContext, useEffect } from 'react'
import {store} from "./App";
import{auth} from "./Firebase";
import {provider} from "./Firebase";
import { signInWithRedirect,onAuthStateChanged } from "firebase/auth";
import "./login.css";
function Login() {

    const[user,setuser]=useContext(store);

    const click=async ()=>{
        try{
await signInWithRedirect(auth,provider);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        onAuthStateChanged(auth,(person)=>{
            if(person){
                setuser(person);
            }
            else{
                setuser(null);
            }
        })

    },[]);
    return (
        <div className="login">
            <center>
                <h1 className="l">Welcome To Our Website</h1>
                <div className="login1">
            <h1>please login</h1>
            <button onClick={click}>sign in </button>
            </div>
            </center>

            
        </div>
    )
}

export default Login
