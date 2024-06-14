import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { createResponse } from "../ai/createResponse";

const prisma = new PrismaClient();
export const createChat: RequestHandler = async (request, response, next) => {
  try {
    //1. Ambil chat dari user
    const { reqMessage, companyId } = request.body;

    if (!reqMessage) throw new AppError("Request message is required", 401);

    // 2. Bikin request query di db
    const userRequest = await prisma.requestQuery.create({
      data: {
        comment: reqMessage,
        companyId,
      },
    });
    if (!userRequest)
      throw new AppError("Sumting wong with our AI interface !", 500);

    // 3. Kirim ke ai
    const aiResponse = (await createResponse({ input: reqMessage }))
      ?.completeResponse;

    if (!aiResponse)
      throw new AppError("Somewrong with our AI processing service", 500);

    // 4. hasil dari ai dibkin response query
    const {
      stats: { sentiment, topic, urgency },
      response,
    } = aiResponse;

    const userResponse = await prisma.responseQuery.create({
      data: {
        message: response,
        companyId,
        urgency,
        tone: sentiment,
        topic,
      },
    });
    // 5. dikirim request + response query
    return;
  } catch (error) {
    next(error);
  }
};
