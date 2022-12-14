import "../loadEnvironment";
import express from "express";
import chalk from "chalk";
import Debug from "debug";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { errorNotFound, generalError } from "./middlewares/error/generalError";

const corsOptions = {
  origin: "*",
};

const debug = Debug("SaveMoneyApp:IndexServer");

const app = express();

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, _res, next) => {
  debug(chalk.blue(`A request arrived to ${req.url}`));
  next();
});

app.use("/user", userRoutes);

app.use("/", errorNotFound);
app.use(generalError);

export default app;
