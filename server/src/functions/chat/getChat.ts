import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();
export const getChat: RequestHandler = async (request, response, next) => {
  try {
    const userId = request.query.userId as string | undefined;
    const companyId = request.query.companyId as string | undefined;

    if (!userId || !companyId)
      throw new AppError("userId and companyId is required", 400);

    const requestQueryData = await prisma.requestQuery.findMany({
      where: {
        companyId,
      },
    });

    const responseQueryData = await prisma.responseQuery.findMany({
      where: {
        companyId,
      },
    });

    const sortedChat = [...responseQueryData, ...requestQueryData].sort(
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
