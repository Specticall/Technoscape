import { RequestHandler } from "express";

export const login: RequestHandler = async (request, response, next) => {
  try {
    const id = request.body.id;
    // Code..
  } catch (error) {
    next(error);
  }
};
