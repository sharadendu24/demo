import './ContactCard.css';
import { UserContext } from '../UserContext/userContext';
import Chat from './Chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../App';
import { useContext } from 'react';

function ContactCard({item}){

    console.log(item);

    const setId = useContext(UserContext);

    const Click=()=>{
        setId(item);
    }
    

    return (

        <div class="ccd" onClick={Click}>
            <img src={item.picture} alt="N/A  .."/>
            <div class="innerdiv">
                <p class="p1">{item.name}</p>
                
                <p class="p2">{item.chatlog!=null && item.chatlog[item.chatlog.length-1]!=null ? item.chatlog[0].text.slice(0,20) : null}...</p>
                
                <p class="p3">{item.chatlog!=null && item.chatlog[0]!=null ? item.chatlog[0].timestamp : null}</p>

            </div>
            
        </div>

        
    )
}

export default ContactCard;