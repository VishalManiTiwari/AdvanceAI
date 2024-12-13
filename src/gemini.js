import { 
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

const apiKey = "AIzaSyDmfnm3p-UDN6ENKrQ_xhUm-hhOAnMFsjY";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  top_k: 40,
  max_output_tokens: 8000,
  response_mime_type: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig, 
      history: [], 
    });

    const result = await chatSession.sendMessage(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error in run function:", error);
    throw error;
  }
}

export default run;
