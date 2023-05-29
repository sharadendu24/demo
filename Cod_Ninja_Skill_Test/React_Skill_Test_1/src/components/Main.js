import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Tooltip from './Tooltip';

const submitStyle = {
    margin: '5px auto',
    padding: '7px 10px',
    border: '1px solid rgb(239, 255, 255)',
    borderRadius: 3,
    background: 'rgb(48, 133, 214)',
    fontSize: 15,
    color: 'white',
    display: 'flex',
    cursor: 'pointer'
  };
  
  const textStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px'
  }

  
  const Main = () => {
    const [displayed, setDisplayed] = React.useState(false);
    return (
      <div className="App" id='app' >
        <href
          style={submitStyle}
          onMouseEnter={() => setDisplayed(true)}
          onMouseLeave={() => setDisplayed(false)}
        >
          Hover over me!
        </href>
        {displayed && ( <Tooltip name="right"/>)}
      </div>
    );
  }
  
  export default Main;