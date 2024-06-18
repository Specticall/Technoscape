import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const getCompany: RequestHandler = async (request, response, next) => {
  try {
    const companyId = request.query.companyId as string;
    const userId = request.query.userId as string;

    if (!userId)
      throw new AppError("userId is not provided in the request body", 400);

    let company;
    if (companyId) {
      // Single company search
      company = await prisma.company.findUnique({
        where: { id: companyId, userId },
      });

      if (!company)
        throw new AppError(
          `Company with the id ${companyId} was not found`,
          402
        );
    } else {
      // All company (based of a userId) search
      company = await prisma.company.findMany({
        where: {
          userId,
        },
      });
      if (!company)
        throw new AppError(
          `The user withe the id ${userId} does not have any associated companies`,
          402
        );
    }

    response.status(200).send({
      status: "success",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};
