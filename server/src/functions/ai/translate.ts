import { config } from "dotenv";
import OpenAI from "openai";

config({ path: "./.env" });
const openAI = new OpenAI({
  apiKey: process.env.API_KEY,
});

type TranslateParams = {
  input: string;
  translateTo: string;
};

export async function translate({ input, translateTo }: TranslateParams) {
  try {
    const chatCompletion = await openAI.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: `Translate the text in between the <_INPUT> string to ${translateTo}, <_INPUT>${input}<_INPUT>. return the response in this JSON format : { "translation" : "[TRANSLATION HERE]" }`,
        },
      ],
      model: "gpt-3.5-turbo-0125",
    });

    const JSONInput = chatCompletion.choices[0].message.content || "";
    const translation = JSON.parse(JSONInput)?.translation;

    if (!translation) throw new Error("Something went very wrong");

    return {
      status: "success",
      translation,
      original: input,
      language: translateTo,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

// const translation = translate({
//   input:
//     "Nama saya Joseph, saya ingin menang dalam lomba ini kalau tdk menang, nanti binus kita bakar, terimakasih",
//   translateTo: "english",
// });

// translate({
//   input:
//     "Nama saya Joseph, saya ingin menang dalam lomba ini kalau tdk menang, nanti binus kita bakar, terimakasih",
//   translateTo: "english",
// }).then((res) => console.log(res));

// console.log(translation);
