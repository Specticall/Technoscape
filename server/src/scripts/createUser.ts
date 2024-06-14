import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createUser({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) {
  try {
    console.log("Creating user...");

    const saltRounds = 13;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });
    console.log("Successfuly created user...");
  } catch (err) {
    console.log(err);
  }
}

/*

id         String   @id @default(auto()) @map("_id") @db.ObjectId
  email      String   @unique
  password   String
  name       String?

*/

createUser({
  email: "admin@gmail.com",
  username: "admin",
  password: "1234",
});
