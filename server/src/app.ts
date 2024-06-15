import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import { AppError } from "./utils/AppError";
import { handleErrorDevelopment } from "./functions/error/errorHandler";
import chatRouter from "./routes/chatRouter";
import companyRouter from "./routes/companyRouter";
import statisticrouter from "./routes/statisticsRouter";
const app = express();

// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/company", companyRouter);
app.use("/statistics", statisticrouter)

// Handle invalid routes
app.use("*", (request, response, next) => {
  next(new AppError("The route you requested does not exist", 404));
});

app.use(handleErrorDevelopment);
export default app;
