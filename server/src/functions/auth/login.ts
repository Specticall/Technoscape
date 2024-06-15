import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login: RequestHandler = async (request, response, next) => {
  try {
    const id = request.body.id;
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
      },
    });

    if (!user) throw new Error("email not provided");

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) throw new Error("invalid credintials");

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string);

    response.status(200).send({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};
