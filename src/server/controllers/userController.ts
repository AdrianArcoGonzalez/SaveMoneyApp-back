import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import { IJwtPayload, LoginData, UserData } from "../../interfaces/interfaces";
import { createToken, hashComparer } from "../../utils/authentication";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
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

export default loginUser;
