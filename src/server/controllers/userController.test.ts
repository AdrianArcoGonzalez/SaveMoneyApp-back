import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import { UserData } from "../../interfaces/interfaces";
import loginUser from "./userController";

let mockHashCompareValue: boolean | Error = true;
jest.mock("../../utils/authentication", () => ({
  ...jest.requireActual("../../utils/authentication"),
  hashCreate: () => jest.fn().mockReturnValue(""),
  createToken: () => "#",
  hashComparer: jest.fn().mockImplementation(() => mockHashCompareValue),
}));

const mockUser: UserData = {
  userName: "John",
  password: "123123",
  id: "abcabc",
  options: {},
};

const errorLogin = new Error("User or password not valid");

describe("Given a usercontroller controler", () => {
  describe("When it receive a request to loginUser with the correct data", () => {
    test("Then it should call the status 200 and the method json with the user", async () => {
      User.find = jest.fn().mockReturnValue([mockUser]);

      const statusOk = 200;
      const req = { body: mockUser } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(statusOk);
      expect(res.json).toHaveBeenCalledWith({ user: { token: "#" } });
    });
  });

  describe("When it receive a request to loginUser with an invalid user", () => {
    test("Then it should call the next function with an error", async () => {
      User.find = jest.fn().mockReturnValue([]);

      const req = { body: mockUser } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(errorLogin);
    });
  });
  describe("When it receive a request to loginUser with an invalid password", () => {
    test("Then it should call the next function with an error", async () => {
      mockHashCompareValue = new Error();

      const req = { body: mockUser } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(errorLogin);
    });
  });
});
