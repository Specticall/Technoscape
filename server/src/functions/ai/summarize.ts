import { config } from "dotenv";
import OpenAI from "openai";

config({ path: "./.env" });
const openAI = new OpenAI({
  apiKey: process.env.API_KEY,
});

type SummarizeParams = {
  input: string;
};

export async function summarize({ input }: SummarizeParams) {
  try {
    const chatCompletion = await openAI.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Summarize the following text into bullet points: "${input}".  return the response in this JSON array format { "summary" : [SUMMARY HERE IN JSON ARRAY FORMAT] } do not include '\\n' `,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const JSONInput = chatCompletion.choices[0].message.content || "";
    const summarization = JSON.parse(JSONInput)?.summary;

    // const summary = chatCompletion.choices[0].message.content;

    if (!summarization) throw new Error("Something went very wrong");

    return {
      status: "success",
      summarization,
      original: input,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Sumting wong",
    };
  }
}

summarize({
  input:
    "Saya seseorang yang suka makan nasi. Saya tidak suka makan ayam. Saya tidak mau makan daging lain. Saya suka sayur.",
}).then((res) => console.log(res));
