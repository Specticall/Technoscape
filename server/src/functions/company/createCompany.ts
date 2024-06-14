import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const createCompany: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { companyName, userId } = request.body;

    if (!companyName || !userId) {
      throw new AppError("Name and userId required", 402);
    }

    const newCompany = await prisma.company.create({
      data: {
        userId,
        name: companyName,
        starred: false,
        archived: false,
      },
    });

    response.status(200).json({
      company: newCompany,
    });
  } catch (error) {
    next(error);
  }
};
