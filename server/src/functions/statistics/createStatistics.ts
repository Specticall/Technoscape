import { RequestHandler } from "express";
import { PrismaClient, Topics } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();

/*

id
user
userId
totalComplaints
commonComplaints

*/
// userId
    // totalComplaints = Jumlah responseQuery
    // commonComplaints = bruteforce aja

export const createStatistics: RequestHandler = async (request, response, next) => {
  try {
    const userId = request.body.userId;
    // const totalComplaints ;
    // const commonComplaints;
    if(!userId) throw new AppError("userId required", 401)

    const all_companies = await prisma.company.findMany({
        where : {userId}
    });
    
    const all_request = await Promise.allSettled(all_companies.map(async(company) => {
        return prisma.requestQuery.findMany({
            where: {companyId: company.id}
        });
    }));

    const arrayReq = all_request.map((request) =>{
        if (request.status !== "fulfilled") return;
        return request.value;
    }).flat();

    const totalComplaints = arrayReq.length;
    
    const all_response = await Promise.allSettled(all_companies.map(async(company) => {
        return prisma.responseQuery.findMany({
            where: {companyId: company.id}
        });
    }));
    const arrayRes = all_response.map((request) =>{
        if(request.status !== "fulfilled") return;
        return request.value;
    }).flat();

    let commonComplaints = "";
    const topicCounts = {
        Billing: 0,
        Products: 0,
        Complaints: 0,
        Services: 0,
        Suggestions: 0,
        Technical: 0
    };
    arrayRes.forEach(element => {
        if (element?.topic && topicCounts.hasOwnProperty(element.topic)) {
            topicCounts[element.topic]++;
        }
    });

    let maxCount = 0;
    for (const [topic, count] of Object.entries(topicCounts)) {
        if (count > maxCount) {
            maxCount = count;
            commonComplaints = topic;
        }
    }

    /*
      topic     Topics
totalComplaints
commonComplaints
    */
    const newStatistic = await prisma.statistics.create({
        data:{
            userId,
            totalComplaints: totalComplaints,
            commonComplaints: commonComplaints as Topics,
        },
    });

    response.status(200).send({
        status: "success",
        data: newStatistic,
        
    });
    


  } catch (error) {
    next(error);
  }
};

