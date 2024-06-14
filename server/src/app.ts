import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
const app = express();

// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

export default app;
