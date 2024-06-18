import { RequestHandler } from "express";
import { AppError } from "../../utils/AppError";
import { PrismaClient } from "@prisma/client";
import { translate } from "../ai/translate";

const prisma = new PrismaClient();

// TODO : RERW
export const translateChat: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    throw new AppError("THIS ROUTE NEEDS REWRITE", 500);

    const requestId = request.body;
    const toBahasa = request.body;
    if (!requestId) throw new AppError("requestId required!", 401);
    if (!toBahasa) throw new AppError("translate to language needed!", 401);
    const requestMessage = await prisma.userMessage.findUnique({
      where: {
        id: requestId,
      },
    });
    const themessage = requestMessage?.message;
    const translated = translate({
      input: String(themessage),
      translateTo: toBahasa,
    });
    response.status(200).send({
      status: "success",
      data: translated,
    });
  } catch (error) {
    next(error);
  }
};
