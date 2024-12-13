import React, { useContext } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import {datacontext} from './context/UserContext'
import speakimg from './assets/speak.gif'
import aigif from './assets/aiVoice.gif'

const App = () => {

   const {recognition, speaking, setSpeaking, prompt, 
    setPrompt, setResponse,response} = useContext(datacontext)
  
   

  return (
    <div className="main">
      <img src={va} alt="ai.png" id="shifra" />
      <span>I'm Shifra, Your Advanced Virtual Assistant</span>
      {!speaking?<button onClick={() => {
        setPrompt("listening...")
        setSpeaking(true)
        setResponse(false)
        recognition.start()
      } } >
        Click Here <CiMicrophoneOn />
      </button>
      : <div className="response">
        {!response?<img src={speakimg} alt="speakimg" id="speak" />
        :<img src={aigif} alt="aigif" id="aigif" />
        }
         
         <p>{prompt}</p>
      </div>
    }
      
    </div>
  );
};

export default App;
