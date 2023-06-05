import './Chat.css'
import { data } from '../DummyJSON/data';
import Mssg from './Mssg';
import { useEffect } from 'react';
import { useState } from 'react';

function Chat({item}){


    const[items, setItems]=useState([]);
    const[id, setId]=useState();
    const[text, setText]=useState();


    useEffect(() =>{
        if(item!=null) localStorage.setItem('items', JSON.stringify(data));
        if(item!=null)setId(item.id);
        if(item!=null)setItems(data);
        console.log("this is comp id",id,"item in it are",item);
    })

   

    

    const save=()=>{
        console.log("inside save",items);

        data.forEach(
            function a(value, index, array){
                console.log("inside a value is", value,"index is",index,"array is",array);
                if(value.id==id){
                    console.log("inside if condn")
                    value.chatlog.push({
                        "text": text,
                        "timestamp": new Date().getTime(),
                        "side": "right",
                        "message_id": value.chatlog.length+1
                    })
                }
            }
        )
        setItems(data);
        
        setId(id);
        setText('');
        setItems(data);
        
        
    }

    function handleChange(e){
        setText(e.target.value);
        console.log(e.target.value);
    }

    const reset = (e) =>{  
        e.preventDefault();
        e.target.reset();
    }

    function clear(){
        window.document.getElementById('strr').requestFullscreen();
    }


    return(
        <div class='outer'>
        { item!=null ?
        <div class="chatd">
            <div class="chat-top">
                <img src={item.picture } alt='N/A' />
                <h2> { item.name} </h2>
            </div>

            

            <div class="chat" id='chatup'>

                {item.chatlog!=null ?item.chatlog.map((chat) => <Mssg chat={chat}/>) : null}
                

            </div>

            

            <div class="mssg">

               

                        <textarea name='str' id='strr'  onKeyUpCapture={newText => handleChange(newText)}/>
                        <button onClick={save}>Send</button>

                   

                    
                
            </div>

        </div> : null}
        </div>

        
    )
}

export default Chat;




