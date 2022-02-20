import { ref,uploadBytes ,getDownloadURL } from '@firebase/storage';
import axios from 'axios';
import React, { useState } from 'react';
import {storage} from"./Firebase";
import "./add.css"

function Add() {

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
    )

    


}



const submit=(e)=>{
    e.preventDefault();
    axios.post("https://interview-bbcf1-default-rtdb.firebaseio.com/base.json",data).then(
        (res)=>alert("submitted")
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
            <form  onSubmit={submit}>

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

<input type="submit" value="submit"  className="submit"/>




            </form>
            </div>
            </center>
            
        </div>
    )
}

export default Add
