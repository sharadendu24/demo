import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { json } from 'react-router-dom';





function Main() {


  const[data, setData] = useState([]);
 
  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/albums')
          .then(response => response.json())
          .then(json => setData(json))
  }, []);


  return (
      <div id='app'>

        <h1 >Here is the List of items.</h1>

        {
          (data.map((item) => <Card item={item}/>))
        }
        
        
      </div>
  );
}

  
  export default Main;