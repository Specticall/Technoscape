import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const getUser: RequestHandler = async (request, response, next) => {
  try {
    const userId = request.body.id;

    if (!userId)
      throw new AppError("Authorization header doesn not exist", 401);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
