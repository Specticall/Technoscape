import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const updateCompany: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { companyId, userId } = request.query;

    if (!companyId || !userId) {
      throw new AppError("Name and userId required", 402);
    }

    const updatedCompany = await prisma.company.update({
        where: {
            id: companyId as string,
        },
        data: {
            starred: request.body.starred,
            archived: request.body.archived,
      },
    });

    response.status(200).json({
      company: updateCompany,
    });
  } catch (error) {
    next(error);
  }
};
