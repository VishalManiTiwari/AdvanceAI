import React, { createContext, useState } from "react";
import run from "../gemini";

export const datacontext = createContext();

const UserContext = ({ children }) => {
    const [speaking, setSpeaking] = useState(false);
    const [prompt, setPrompt] = useState("listening...");
    const [response, setResponse] = useState(false);

    // Speak function to handle text-to-speech
    const speak = (text) => {
        const textSpeak = new SpeechSynthesisUtterance(text);
        textSpeak.volume = 1;
        textSpeak.rate = 1;
        textSpeak.pitch = 1;
        textSpeak.lang = "hi-GB";

        window.speechSynthesis.speak(textSpeak);
    };

    const aiResponse = async (prompt) => {
        try {
            let text = await run(prompt);

            const sanitizedText = text
                .replace(/(\*|\*\*|tarankan)/g, "") 
                .replace(/google/gi, "Vishal Mani Tiwari");

            setPrompt(sanitizedText);
            speak(sanitizedText);
            setResponse(true);

            setTimeout(() => {
                setSpeaking(false);
            }, 6000);
        } catch (error) {
            console.error("Error in AI Response:", error);
        }
    };

    // Initialize speech recognition
    const speechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    recognition.onresult = (e) => {
        const currentIndex = e.resultIndex;
        const transcript = e.results[currentIndex][0].transcript;

        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
    };

    // Handle commands based on recognized speech
    const takeCommand = (command) => {
        if (command.includes("tarankan")) {
            setPrompt("Listening...");
            speak("I didn't understand. Can you repeat?");
            setTimeout(() => {
                setSpeaking(false);
            }, 3000);
            return;
        }

        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank");
            speak("Opening YouTube");
            setPrompt("Opening YouTube...");
        } else if (command.includes("open") && command.includes("google")) {
            window.open("https://www.google.com/", "_blank");
            speak("Opening Google");
            setPrompt("Opening Google...");
        } else {
            aiResponse(command);
        }

        setTimeout(() => {
            setSpeaking(false);
        }, 6000);
    };

    const value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse,
    };

    return (
        <div>
            <datacontext.Provider value={value}>{children}</datacontext.Provider>
        </div>
    );
};

export default UserContext;
