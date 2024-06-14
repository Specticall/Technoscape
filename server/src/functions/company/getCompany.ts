import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const getCompany: RequestHandler = async (request, response, next) => {
  try {
    const companyId = request.body.id;
    const userId = request.query.userId as string;

    if (!userId) throw new AppError("userId not provided", 400);

    let company;
    if (companyId) {
      company = await prisma.company.findUnique({
        where: { id: companyId, userId },
      });
    } else {
      company = await prisma.company.findMany({
        where: {
          userId,
        },
      });
    }
    if (!company) throw new AppError("No Company Found", 402);

    response.status(200).send({
      status: "success",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};
