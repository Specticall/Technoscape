/*
  saran
  urgent level (1 - 10)
  topic
  tone level (1 - 10)

  enum Topics {
  Services
  Productsp
  Technical
  Billing
  Complaints
  Suggestions
  }


*/
import { Topics } from "@prisma/client";
import { respond } from "./response";
import { config } from "dotenv";
import OpenAI from "openai";

config({ path: "./.env" });
const openAI = new OpenAI({
  apiKey: process.env.API_KEY,
});

type ResponseParams = {
  input: string;
};

export type ResponseQueryObject = {
  stats: {
    urgency: number;
    sentiment: number;
    topic: Topics;
  };
  response: string;
};

export async function createResponse({ input }: ResponseParams) {
  try {
    const chatCompletion = await openAI.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: `Given a string input enclosed between the @ character (e.g., @input@), @${input}@ return a JSON object with the following format:{"stats": { "urgency": "analyze the urgency, rate it 1.0 when the message is not urgent and 10.0 when it is very urgent", "sentiment": "Rate the user's mood from 1.0 to 10.0 (decimal format), where 1 is the customer being pleased and 10 is the customer being unpleased.", "topic": "The type of the message. This can be ONLY ONE OF the following: Services, Products, Technical, Billing, Complaints, Suggestions" }, "response": "As a specialist in customer service, create a response that provides a solution to the client's problems." } Please note: - The values should be analyzed based on the input.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const JSONInput = chatCompletion.choices[0].message.content || "";
    const completeResponse = JSON.parse(JSONInput);

    if (!completeResponse) throw new Error("Something went very wrong");
    return {
      status: "success",
      completeResponse: completeResponse as ResponseQueryObject,
      original: input,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Sumting wong",
    };
  }
}

// createResponse({
//   input:
//     "Hi, it looks like your server are having issues right now, my clients aren't able to access any of your products through our app, I would like to know this is true or perhaps there might be something wrong on our side",
// }).then((res) => console.log(res));

/*

  {
    "stats": {
      "urgency" : 10,
      "sentiment": 6.5,
      "topic": "Product"
    },
    response: "..."
  }

*/
