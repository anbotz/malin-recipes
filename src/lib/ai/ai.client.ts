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
const groqConfig: AiConfig = {
  model: process.env.GROQ_MODEL ?? "Llama3-8b-8192",
};

export const AIclient = groqClient;
export const AiClientConfig: AiConfig = groqConfig;
