import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login: RequestHandler = async (request, response, next) => {
  try {
    const id = request.body.id;
    const { username, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
        name: username,
      },
    });

    if (!user) throw new Error("username not provided");

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) throw new Error("invalid credintials");

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string);

    response.status(200).send({
      status: "success69420",
      // data:
      token,
    });
  } catch (error) {
    next(error);
  }
};
