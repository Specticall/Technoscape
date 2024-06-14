import { config } from "dotenv";
import OpenAI from "openai";

config({ path: "./.env" });
const openAI = new OpenAI({
  apiKey: process.env.API_KEY,
});

type responseParams = {
  input: string;
};

export async function respond({ input }: responseParams) {
  try {
    const chatCompletion = await openAI.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `As a specialist in customer service, create a response that give solution to the problems of the client from the following text : "${input}" , return the response in this JSON format { "responAi" : [RESULTS HERE] } `,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const JSONInput = chatCompletion.choices[0].message.content || "";
    const responAi = JSON.parse(JSONInput)?.responAi;
    chatCompletion.choices[0].message.content;
    // const summary = chatCompletion.choices[0].message.content;

    if (!responAi) throw new Error("Something went very wrong");

    return {
      status: "success",
      responAi,
      original: input,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Sumting wong",
    };
  }
}

respond({
  input:
    "Hi, it looks like your server are having issues right now, my clients aren't able to access any of your products through our app, I would like to know this is true or perhaps there might be something wrong on our side",
}).then((res) => console.log(res));
