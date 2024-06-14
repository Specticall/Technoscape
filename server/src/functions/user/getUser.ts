import { RequestHandler } from "express";

export const getUser: RequestHandler = async (request, response, next) => {
  try {
    // Code...
  } catch (error) {
    next(error);
  }
};
