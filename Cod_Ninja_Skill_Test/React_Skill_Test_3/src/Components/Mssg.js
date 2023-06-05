import './Mssg.css'

function Mssg({chat}){

    console.log(chat)

    if(chat==null) return(null);

    if(chat.side=='left') return(

        <div class='left'><p>{chat.text}</p></div>
    )

    else return(


            <div class='right'> <p>{chat.text}</p> </div>
            
        
        
    )

}
export default Mssg;