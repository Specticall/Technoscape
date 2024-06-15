import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

export const delCompany: RequestHandler = async (request, response, next) => {
  try {
    const companyId = request.query.companyId as string;
    if (!companyId) {
      throw new AppError("Company ID required", 402);
    }

    const checkExist = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!checkExist) throw new AppError("Company not found", 402);

    await prisma.company.delete({
      where: { id: companyId },
    });
    response.status(200).json({
      message: "Success Delete",
    });
  } catch (error) {
    next(error);
  }
};
