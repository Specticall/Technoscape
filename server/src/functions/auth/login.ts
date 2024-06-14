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

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string);

    const user = await prisma.user.findUnique({
      where: {
        id,
        name: username,
      },
    });

    if (!user) throw new Error("username not provided");

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) throw new Error("invalid credintials");

    const token = generate;
  } catch (error) {
    next(error);
  }
};
