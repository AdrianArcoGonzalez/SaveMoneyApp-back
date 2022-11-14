import "../loadEnvironment";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/interfaces";

export const hashComparer = (password: string, hashedPassword: string) =>
  bycrpt.compare(password, hashedPassword);

export const createToken = (payload: IJwtPayload) =>
  jwt.sign(payload, process.env.SECRET);
