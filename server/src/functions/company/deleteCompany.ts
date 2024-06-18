import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const deleteCompany: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const companyId = request.query.companyId as string;
    if (!companyId) {
      throw new AppError("companyId missing in the request query", 400);
    }

    // Make sure the company exists before deleting from the database
    const companyExists = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!companyExists)
      throw new AppError(`Company with the id ${companyId} is not found`, 400);

    // We're deleting all the messages and response before deleting the actual company
    await prisma.$transaction(async (prisma) => {
      await prisma.userMessage.deleteMany({
        where: {
          companyId,
        },
      });

      await prisma.responseAI.deleteMany({
        where: {
          companyId,
        },
      });

      await prisma.company.delete({
        where: { id: companyId },
      });
    });

    response.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
