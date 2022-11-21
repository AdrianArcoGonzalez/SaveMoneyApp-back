import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import CustomError from "../../../utils/customError/customError";

const debug = Debug("SaveMoneyApp:server:middlewares:errors");

export const errorNotFound = (req: Request, res: Response): void => {
  res.status(404).json({ message: "Error endpoint not found" });
  debug(chalk.red("Error 404 endpoint not found"));
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorCode = error.statusCode ?? 500;
  const errorMessage = error.publicMessage ?? "General error.";

  debug(chalk.red(error.message));

  res.status(errorCode).json({ error: errorMessage });
};
