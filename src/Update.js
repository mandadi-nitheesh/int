import React,{useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import { ref,uploadBytes ,getDownloadURL } from '@firebase/storage';
import {storage} from"./Firebase";
import axios from 'axios';
import {store} from "./App";
import "./update.css";


function Update() {
    const[data,setdata]=useState({
        name:"",
        birthdate:"",
        url:"",
        image:"",
        imageurl:"",
        rating:0
    })
    
    const{name,birthdate,url,rating}=data;
    
    
    const change=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const[file,setfile]=useState("");
    
    
    const change1=(e)=>{
        setfile(e.target.files[0]);
        setdata({...data,[e.target.name]:e.target.files[0].name})
    }
    
    const upload=async(e)=>{
        e.preventDefault();
        const imgs=ref(storage,`/images/${file.name}`);
      await  uploadBytes(imgs,file).then((snapshot)=>{
            alert("file uploaded");
        })
    
      await  getDownloadURL(ref(storage,`/images/${file.name}`)).then(
            (url)=>setdata({...data,[e.target.name]:url})
        )}
    
    let params=useParams();
    //console.log(params.id)

    const[details,setdetails]=useContext(store);
    
    const update=(e)=>{
        e.preventDefault();
        axios.put(`https://interview-bbcf1-default-rtdb.firebaseio.com/base/${params.id}.json`,data).then(
            (res)=>{  alert("updated")
            const d= res.data;
         let details1=[]
         for(let key in d){
             details1.push({id:key,...d[key]});
         }
        
      setdetails(details1);
        
        }
        )
        setdata({
            name:"",
            birthdate:"",
            url:"",
            image:"",
            imageurl:"",
            rating:0
        })
    
    }
    
    
        return (
            <div className="add">
    
    
    <center>
        <div className="add1">
                <form  onSubmit={update}>
    
<label>Name:</label>
    <input type="text" placeholder="name" name="name" value={name}
    onChange={change} /> <br/>  <br/>
<label>Date-of-Birth:</label>
    <input type="date" placeholder="date-of-birth" name="birthdate" value={birthdate} 
    onChange={change}/>  <br/>  <br/>
<label>Url:</label>
    <input type="url" placeholder="any url" name="url" value={url} 
    onChange={change}/>  <br/>  <br/>
<label>Image:</label>
    <input type="file" name="image" onChange={change1} />
    <input type="button" name="imageurl" onClick={upload} value="upload"/>
    <br/>  <br/>
<label>Rating:</label>
    <input type="number" placeholder="rating" name="rating" value={rating} 
    onChange={change}/>  <br/>  <br/>
    
    <input type="submit" value="update"  className="submit"/>
    
    
    
    
                </form>
                </div>
                </center>
                
            </div>
        )
}

export default Update
