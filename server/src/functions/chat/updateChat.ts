import { RequestHandler } from "express";
import { AppError } from "../../utils/AppError";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "../ai/createResponse";

const prisma = new PrismaClient();

/*
 * Regenerate the most recent chat from a specified company
 */
export const updateChat: RequestHandler = async (request, response, next) => {
  try {
    const { messageId, responseId } = request.body;

    if (!messageId || !responseId) {
      throw new AppError(
        "messageId and responseId is missing on the request body",
        400
      );
    }

    // 1. Find the most recent chat sent by the user (atm, we're recieving the recent message id from the frontend)
    const mostRecentMessage = await prisma.userMessage.findUnique({
      where: { id: messageId },
    });

    if (!mostRecentMessage) {
      throw new AppError("there's no last message", 401);
    }

    //2. Regenerate the AI response
    const regeneratedResponse = await createResponse({
      input: mostRecentMessage.message,
    });

    //3. Save the updated data on the database
    const updatedData = await prisma.responseAI.update({
      where: { id: responseId },
      data: {
        message: regeneratedResponse.completeResponse?.response,
        tone: Number(regeneratedResponse.completeResponse?.stats.sentiment),
        topic: regeneratedResponse.completeResponse?.stats.topic,
        urgency: Number(regeneratedResponse.completeResponse?.stats.urgency),
        dateCreated: new Date(),
      },
    });

    response.status(200).send({
      status: "success",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};
