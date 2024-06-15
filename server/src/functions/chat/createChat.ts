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
        message: reqMessage,
        companyId,
        dateCreated: new Date(),
      },
    });
    if (!userRequest)
      throw new AppError("Sumting wong with our AI interface !", 500);

    // 3. Kirim ke ai
    const aiResponse = (await createResponse({ input: reqMessage }))
      ?.completeResponse;

    console.log(aiResponse);

    if (!aiResponse)
      throw new AppError("Somewrong with our AI processing service", 500);

    // 4. hasil dari ai dibkin response query
    const {
      stats: { sentiment, topic, urgency },
      response: responseAI,
    } = aiResponse;

    await prisma.responseQuery.create({
      data: {
        message: responseAI,
        companyId,
        urgency: typeof urgency === "string" ? parseFloat(urgency) : urgency,
        tone: typeof sentiment === "string" ? parseFloat(sentiment) : sentiment,
        topic,
        dateCreated: new Date(),
      },
    });
    // 5. dikirim request + response query
    response.status(200).send({
      status: "success",
      data: {
        message: responseAI,
        companyId,
        urgency,
        tone: sentiment,
        topic,
      },
    });
  } catch (error) {
    next(error);
  }
};
