import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

/**
 * Create a new company
 */
export const createCompany: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { companyName, userId } = request.body;

    if (!companyName || !userId) {
      throw new AppError(
        "companyName and userId missing in the request body",
        400
      );
    }

    //1. Create a new company with initial values
    const newCompany = await prisma.company.create({
      data: {
        userId,
        name: companyName,
        starred: false,
        archived: false,
        // As a default value, we're using the UNIX timestamp (forgot what this is used for)
        // (will comeback later when I understand why this is the case)
        latestChatDate: new Date(0),
      },
    });

    response.status(200).send({
      company: newCompany,
    });
  } catch (error) {
    next(error);
  }
};
