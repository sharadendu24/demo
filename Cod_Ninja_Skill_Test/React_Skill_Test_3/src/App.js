import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './DummyJSON/data';
import { contacts } from './DummyJSON/contacts';
import ContactCard from './Components/ContactCard';
import Search from './Components/Search';
import { UserContext } from './UserContext/userContext';
import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import Chat from './Components/Chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App({Id}) {

  const[id, setId] = useState(null);

  localStorage.setItem("data",data);


  const getId =(Id)=>{
    console.log("App getId ran.")
    setId(Id);
  }


  return (

    <UserContext.Provider value={getId}> 
    <div class="container">
    <div class="row">
      <div class="col">
          
          <Search />

          <br></br>
          {
          (data.map((item) => <ContactCard item={item}/>))
          }

      </div>

      

      <div class="col-9">
       
        <Chat item={id}/>
      </div>
    </div>
    </div>
    </UserContext.Provider>   
    
  );
}

export default App;
