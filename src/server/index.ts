import "../loadEnvironment";
import express from "express";
import chalk from "chalk";
import Debug from "debug";
import cors from "cors";

const debug = Debug("SaveMoneyApp:IndexServer");

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use((req, _res, next) => {
  debug(chalk.blue(`A request arrived to ${req.url}`));
  next();
});

export default app;
