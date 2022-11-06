import "../loadEnvironment";
import express from "express";
import chalk from "chalk";
import Debug from "debug";

const debug = Debug("SaveMoneyApp:IndexServer");

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use((req, _res, next) => {
  debug(chalk.blue(`A request arrived to ${req.url}`));
  next();
});

export default app;
