import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { createResponse } from "../ai/createResponse";

const prisma = new PrismaClient();
export const createChat: RequestHandler = async (request, response, next) => {
  try {
    //1. Retrieve data from user
    const { requestMessage, companyId } = request.body;

    if (!requestMessage)
      throw new AppError("requestMesage is missing in the body", 400);

    // Process the request the user sent, generate response and persist them in the db
    const AIResponses = await prisma.$transaction(async (prisma) => {
      // 2. Save the user message to db
      await prisma.userMessage.create({
        data: {
          message: requestMessage,
          companyId,
          dateCreated: new Date(),
        },
      });

      // 3. Generate the proper reponse from the AI Model
      const AIResponseValues = (await createResponse({ input: requestMessage }))
        ?.completeResponse;

      if (!AIResponseValues)
        throw new AppError("Somewrong with our AI processing service", 500);

      // 4. Save the AI response to the database
      await prisma.responseAI.create({
        data: {
          message: AIResponseValues.response,
          companyId,
          urgency: +AIResponseValues.stats.urgency,
          tone: +AIResponseValues.stats.sentiment,
          topic: AIResponseValues.stats.topic,
          dateCreated: new Date(),
        },
      });

      return AIResponseValues;
    });

    response.status(200).send({
      status: "success",
      data: {
        message: AIResponses.response,
        companyId,
        urgency: AIResponses.stats.urgency,
        tone: AIResponses.stats.sentiment,
        topic: AIResponses.stats.topic,
      },
    });
  } catch (error) {
    next(error);
  }
};
