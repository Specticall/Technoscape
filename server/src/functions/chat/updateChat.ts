import { RequestHandler } from "express";
import { AppError } from "../../utils/AppError";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "../ai/createResponse";

const prisma = new PrismaClient();

export const updateChat: RequestHandler = async (request, response, next) => {
  try {
    const { requestId, responseId } = request.body;

    if (!requestId || !responseId) {
      throw new AppError("chatid and messageId is  required", 401);
    }
    const lastRequest = await prisma.requestQuery.findUnique({
      where: { id: requestId },
    });

    if (!lastRequest) {
      throw new AppError("theres no lastRequest", 401);
    }

    const lastRequestMessage = lastRequest.message;

    const lastResponse = await prisma.responseQuery.findUnique({
      where: { id: responseId },
    });

    if (!lastResponse) {
      throw new AppError("there's no last message", 401);
    }

    const newResponse = await createResponse({
      input: lastRequestMessage,
    });

    const updatedData = await prisma.responseQuery.update({
      where: { id: responseId },
      data: {
        message: newResponse.completeResponse?.response,
        tone: Number(newResponse.completeResponse?.stats.sentiment),
        topic: newResponse.completeResponse?.stats.topic,
        urgency: Number(newResponse.completeResponse?.stats.urgency),
        dateCreated: new Date(),
      },
    });

    console.log({
      message: newResponse.completeResponse?.response,
      tone: newResponse.completeResponse?.stats.sentiment,
      topic: newResponse.completeResponse?.stats.topic,
      urgency: newResponse.completeResponse?.stats.urgency,
    });

    response.status(200).send({
      status: "success",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};
