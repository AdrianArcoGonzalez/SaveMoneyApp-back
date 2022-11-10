import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import { IJwtPayload, LoginData, UserData } from "../../interfaces/interfaces";
import { createToken, hashComparer } from "../../utils/authentication";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user as LoginData;
  let foundUser: UserData[];
  const errorPassword = new Error("User or password not valid");

  try {
    foundUser = await User.find({ userName: user.userName });

    if (foundUser.length === 0) {
      const notFoundUserError = new Error("No user Found");
      next(notFoundUserError);
      return;
    }
  } catch (error) {
    const errorLogin = new Error("Error on login");

    next(errorLogin);
  }

  try {
    const isPasswordValid = await hashComparer(
      user.password,
      foundUser[0].password
    );

    if (!isPasswordValid) {
      next(errorPassword);
    }
  } catch (error) {
    next(errorPassword);
  }

  const payload: IJwtPayload = {
    id: foundUser[0].id,
    username: foundUser[0].username,
  };

  const response = { user: { token: createToken(payload) } };

  res.status(200).json(response);
};

export default loginUser;
