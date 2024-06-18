import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

/**
 * Request a user
 *
 */
export const getChat: RequestHandler = async (request, response, next) => {
  try {
    const userId = request.query.userId as string | undefined;
    const companyId = request.query.companyId as string | undefined;

    if (!userId || !companyId)
      throw new AppError("userId and companyId is required", 400);

    const userMessageList = await prisma.userMessage.findMany({
      where: {
        companyId,
      },
    });

    const AIResponseList = await prisma.responseAI.findMany({
      where: {
        companyId,
      },
    });

    // Combine both chat and sort by the newest one
    // NOTE : Probably going to paginate this if the chat gets long
    const sortedChat = userMessageList
      .concat(AIResponseList)
      .sort(
        (a, b) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      );

    response.status(200).send({
      status: "success",
      data: sortedChat,
    });
  } catch (error) {
    next(error);
  }
};
