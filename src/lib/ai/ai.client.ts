import Groq from "groq-sdk";
import OpenAI from "openai";

type AiConfig = {
  model: string;
};

const openAiClient = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const openAiConfig: AiConfig = { model: "gpt-3.5-turbo" };
const groqConfig: AiConfig = { model: "llama2-70b-4096" };

export const AIclient = groqClient;
export const AiClientConfig: AiConfig = groqConfig;
