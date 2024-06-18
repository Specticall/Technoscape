import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getLanguage: RequestHandler = async (request, response, next) => {
  try {
    // Used for searching
    const query = request.query.query as string;

    // Used for pagination
    const page = Number(request.query.page);
    const take = Number(request.query.take);

    const languages = await prisma.languages.findMany({
      skip: page ? page * take : 0,
      take: take || undefined,
      where: {
        language: {
          contains: query,
        },
      },
    });

    let queriedLanguageCount;
    if (query) {
      queriedLanguageCount = await prisma.languages.count({
        where: {
          language: {
            contains: query,
          },
        },
      });
    }

    response.status(200).send({
      status: "200",
      data: {
        languages,
        // Should probably find a way how to dynamically count this without having to call count multiple times
        count: queriedLanguageCount || 309,
      },
    });
  } catch (error) {
    next(error);
  }
};
