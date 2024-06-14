import { RequestHandler } from "express";

export const protect: RequestHandler = async (request, response, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};
