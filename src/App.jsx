import React, { useContext } from "react";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

const App = () => {
  const {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    setResponse,
    response,
  } = useContext(datacontext);

  return (
    <div className="main h-screen w-full overflow-hidden flex flex-col items-center justify-start p-2 gap-2">
      <img src={va} alt="ai.png" 
      className="xl:h-[70%] lg:h-[70%] md:h-[70%] sm:h-[70%] h-[65%]" />
      <span className="bg-gradient-to-r from-blue-500 
      via-purple-500 to-pink-500 text-transparent
       bg-clip-text text-3xl md:text-3xl sm:text-2xl xl:text-5xl
        my-4 top-3 relative  text-[15px]">
        I'm Anushaka, Your Advanced Virtual Assistant
      </span>
      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("listening...");
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}
          className="w-[180px] h-[40px] flex items-center justify-center gap-5 cursor-pointer text-lg rounded-2xl border-none bg-teal-500 shadow-lg shadow-teal-500/50"
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response flex flex-col items-center justify-center gap-2">
          {!response ? (
            <img src={speakimg} alt="speakimg" className="w-[100px]" />
          ) : (
            <img
              src={aigif}
              alt="aigif"
              className="w-full max-w-[50vh] h-[100px] object-contain"
            />
          )}
          <p className="text-lg md:text-xl text-white text-center px-10">
            {prompt}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;

