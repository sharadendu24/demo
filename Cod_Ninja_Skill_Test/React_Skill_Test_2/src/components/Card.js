import ReactS from "react";
import './Card.css'

function Card({item}){

    return (
      <div id="cd">
        <p>User_Id: {item.userId}</p>
        <h4>Id: {item.id}</h4>
        <h4>Title:</h4>
        <p>{item.title}</p>
      </div>
    )
  
}

export default Card;