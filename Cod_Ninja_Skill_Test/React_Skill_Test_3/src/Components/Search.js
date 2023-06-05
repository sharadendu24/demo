import React, { useEffect, useState } from "react";
import { data } from "../DummyJSON/data";
import { contacts } from "../DummyJSON/contacts";
import ContactCard from "./ContactCard";
import ContactSearch from "./ContactSearch";
import './Search.css'


function Search(){

    const [text, setText] = useState('');

    const[show, setShow] = useState(false);

    


    
    function handleChange(e){
        setText(e.target.value);
        console.log(e.target.value);
        setShow(true);

        if(text==''){
            setShow(false);
        }

    }


    return (

        <div class="sss">

        <div class="input-group rounded" id="dd">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onKeyUpCapture={newText => handleChange(newText)} />
            
              
            
        </div>

        

        {show ? <ContactSearch search={text}/> : null}

        </div>
    )

}

export default Search;