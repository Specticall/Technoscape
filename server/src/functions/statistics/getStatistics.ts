import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const getStatistics: RequestHandler = async (request, response, next) => {
  try {
    const statId = request.body.id;
    if(!statId) throw new AppError("statistics Id doesnt exist", 401);

    const stats = await prisma.statistics.findUnique({
        where: {id : statId}
    });
    if(!stats) throw new AppError("No Statistics Found", 404);

    response.status(200).json(stats);

  } catch (error) {
    next(error);
  }
};
