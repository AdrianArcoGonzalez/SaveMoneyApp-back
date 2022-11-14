import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../../database/models/userModel";
import { UserResgiter } from "../../interfaces/interfaces";

const registerUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const user: UserResgiter = req.body;
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

export default registerUser;
