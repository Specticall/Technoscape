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
    const requestMessage = await prisma.requestQuery.findUnique({
      where: {
        id: requestId,
      },
    });
    const themessage = requestMessage?.message;
    const summarized = summarize({
      input: String(themessage),
    });
    response.status(200).send({
      status: "success",
      data: summarized,
    });
  } catch (error) {
    next(error);
  }
};
