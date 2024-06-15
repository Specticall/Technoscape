import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

/*

id
user
userId
totalComplaints
commonComplaints

*/

export const createStatistics: RequestHandler = async (request, response, next) => {
  try {
    // userId
    // totalComplaints = Jumlah responseQuery
    // commonComplaints = bruteforce aja

    const {userId, totalComplaints, commonComplaints} = request.body;

    if(!userId) throw new AppError("userId required", 402)

    const all_companies = await prisma.company.findMany({
        where : {userId}
    });
    const all_request = await Promise.allSettled(all_companies.map(async(company) => {
        return prisma.requestQuery.findMany({
            where: {companyId: company.id}
        });
    }));
    response.status(200).send({
        status: "success",
        data: all_request,
    });
    

  } catch (error) {
    next(error);
  }
};

