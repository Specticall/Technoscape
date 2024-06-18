import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError";

export const protect: RequestHandler = async (request, response, next) => {
  try {
    const { authorization: bearerToken } = request.headers;
    if (!bearerToken)
      throw new AppError("Authorization header doesn not exist", 401);

    const token = bearerToken.split(" ")[1];
    if (!token) throw new AppError("JWT was not found in the header", 401);

    const tokenisValid = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!tokenisValid) throw new AppError("Invalid Login token", 401);
    next();
  } catch (error) {
    next(error);
  }
};
