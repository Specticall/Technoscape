import { RequestHandler } from "express";

export const register: RequestHandler = async (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
