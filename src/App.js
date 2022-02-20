import react, { createContext, useState } from "react";
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Login";
import Navigation from "./Navigation";
import Add from "./Add";
import Display from "./Display";
import Update from "./Update";


export const store=createContext();

function App() {

const [user,setuser]=useState(null);
const [details,setdetails]=useState([])

  return (
    <div className="app">
     {
       !user ? 
       <store.Provider value={[user,setuser]}>
       <Login/>
       </store.Provider>
       :

       <center>
    <BrowserRouter>
    <Navigation/>

    <Routes>
     <Route path="/" element={<Add/>} />

     <Route path="/add" element={<Add/>} />

     
    <Route  path="/display" element={
     <store.Provider value={[details,setdetails]}>
     <Display/>
     </store.Provider>} />


    <Route  path="/update/:id" element={
      <store.Provider value={[details,setdetails]}>
    <Update/>
    </store.Provider>
    } />


    </Routes>
    
    
    </BrowserRouter>
    </center>

     }
     
    </div>
  );
}

export default App;
