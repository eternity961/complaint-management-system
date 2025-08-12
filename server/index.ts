import express, { Express } from "express";
import cors from "cors";
import debug from "debug";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();

import accessLogStream from "./middlewares/loggerMiddleware.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import predictRouter from "./routes/predictRouter.js";
import complaintRouter from "./routes/complaintRouter.js";

import mongoose from "mongoose";

import morgan from "morgan";
import corsOptions from "./middlewares/corsOptionsMiddleware.js";
import notificationRouter from "./routes/notificationRouter.js";

const app: Express = express();
const PORT = process.env.PORT || 3000;
const appDebug = debug("app:startup");
const dbDebug = debug("app:db");

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined", { stream: accessLogStream }));
}
app.use(cors(corsOptions));

app.use(cookieParser());

// connect to database
if (!process.env.MONGODB_URL) {
  throw new Error("there is no connection string!");
}
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => dbDebug("connected to daatabase!"))
  .catch((err) => dbDebug(err));

app.use("/uploads", express.static("uploads"));

//routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", chatRouter);
app.use("/api", predictRouter);
app.use("/api", complaintRouter);
app.use("/api", notificationRouter);

app.listen(PORT, () => {
  appDebug(`server started at port ${PORT}`);
});
