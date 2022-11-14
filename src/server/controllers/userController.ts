import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../../database/models/User";
import {
  IJwtPayload,
  LoginData,
  UserData,
  UserRegister,
} from "../../interfaces/interfaces";
import { createToken, hashComparer } from "../../utils/authentication";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as LoginData;
  let foundUser: UserData[];
  const errorLogin = new Error("User or password not valid");

  try {
    foundUser = await User.find({ userName: user.userName });

    if (foundUser.length === 0) {
      next(errorLogin);
      return;
    }
  } catch (error) {
    next(errorLogin);
  }

  try {
    const isPasswordValid = await hashComparer(
      user.password,
      foundUser[0].password
    );

    if (!isPasswordValid) {
      next(errorLogin);
    }
  } catch (error) {
    next(errorLogin);
  }

  const payload: IJwtPayload = {
    id: foundUser[0].id,
    userName: foundUser[0].userName,
  };

  const response = { user: { token: createToken(payload) } };

  res.status(200).json(response);
};

export const registerUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const user: UserRegister = req.body;
  const salt = 10;
  try {
    user.password = await bcryptjs.hash(user.password, salt);
    await User.create(user);
    res.status(201).json({
      message: `User ${user.userName} was registered sucessfully.`,
    });
  } catch (error) {
    next(error);
  }
};
