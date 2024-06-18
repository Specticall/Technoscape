import { RequestHandler } from "express";
import { AppError } from "../../utils/AppError";
import { PrismaClient } from "@prisma/client";
import { summarize } from "../ai/summarize";

const prisma = new PrismaClient();

export const summarizeChat: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const requestId = request.body;
    if (!requestId) throw new AppError("requestId required!", 401);
    const userMessage = await prisma.userMessage.findUnique({
      where: {
        id: requestId,
      },
    });

    const message = userMessage?.message;
    if (!message)
      throw new AppError(
        "Something went wrong, our server wasn't able to propery process your message",
        500
      );

    const summarized = summarize({
      input: message,
    });

    response.status(200).send({
      status: "success",
      data: summarized,
    });
  } catch (error) {
    next(error);
  }
};
