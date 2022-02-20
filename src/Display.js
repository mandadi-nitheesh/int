import React, { useContext, useEffect,useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {store} from "./App";
import "./display.css";

function Display() {

    const [details,setdetails]=useContext(store);

    useEffect(()=>{
     axios.get("https://interview-bbcf1-default-rtdb.firebaseio.com/base.json").then(
         (res)=>{
         const d= res.data;
         let details1=[]
         for(let key in d){
             details1.push({id:key,...d[key]});
         }
      setdetails(details1);

         }
     )
    },[details]);

    const deleteitem=(item)=>{
        axios.delete(`https://interview-bbcf1-default-rtdb.firebaseio.com/base/${item}.json`).then(
            (res)=>{alert("removed")
            const d= res.data;
            let details1=[]
            for(let key in d){
                details1.push({id:key,...d[key]});
            }
         setdetails(details1);
   
        
        
        }
        
        )
    }
let navigate=useNavigate();
    const update=(id)=>{
        navigate({pathname:`/update/${id}`})
    }
    

    return (
        <div className="display">

            { 
                details.map((val,index)=>{
                
                    return(
                        <div className="di">
                        <div  key={index} >
                            <label>Name:</label> 
                            <p>{val.name}</p>
                            <br/>
                            <label>Date-of-Birth:</label>
                            <p>{val.birthdate}</p>
                            <br/>
                            <label>Url:</label>
                            <p>{val.url}</p>
                            <br/>
                        
                            <img src={val.imageurl} height="60px" width="40px"    />
                            <br/>
                            <label>Rating:</label>
                            <p>{val.rating}</p>
                            <br/>
                             <button className="btn1" onClick={()=>deleteitem(val.id)}>detete</button>  &nbsp; &nbsp;
                             <button  className="btn1" onClick={()=>update(val.id)}> update</button>

                            </div>
                            </div>
                    )
                })
            } 

        
            
        </div>
    )
}

export default Display
