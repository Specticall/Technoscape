import { config } from "dotenv";
import OpenAI from "openai";

config({ path: "./.env" });
const openAI = new OpenAI({
  apiKey: process.env.API_KEY,
});

type sentimentParams = {
  input: string;
};

export async function sentiment({ input }: sentimentParams) {
  try {
    const chatCompletion = await openAI.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Analyze the following text for customer mood/sentiments : "${input}" and rate it from 1.0 to 10.0 (decimal format) for 1 is customer being pleased to 10 for being unpleased.  return the response in this JSON format { "sentiment_level" : [RESULTS NUMBER IN HERE] }`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const JSONInput = chatCompletion.choices[0].message.content || "";
    const analysis = JSON.parse(JSONInput)?.sentiment_level;

    // const summary = chatCompletion.choices[0].message.content;

    if (!analysis) throw new Error("Something went very wrong");

    return {
      status: "success",
      analysis,
      original: input,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Sumting wong",
    };
  }
}

// sentiment({
//   input:
//     "Hi, it looks like your server are having issues right now, my clients aren't able to access any of your products through our app, I would like to know this is true or perhaps there might be something wrong on our side",
// }).then((res) => console.log(res));
