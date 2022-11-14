import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../../database/models/User";
import { UserData } from "../../interfaces/interfaces";
import testUtils from "../../utils/testUtils";
import { loginUser, registerUser } from "./userController";

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
  const next: NextFunction = jest.fn();
  describe("When it receive a request to loginUser with the correct data", () => {
    test("Then it should call the status 200 and the method json with the user", async () => {
      User.find = jest.fn().mockReturnValue([mockUser]);

      const statusOk = 200;
      const req = { body: mockUser } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

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

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(errorLogin);
    });
  });

  describe("When it's invoqued with the register method", () => {
    const { mockUserRegister } = testUtils;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const statusCreated = 201;

    bcryptjs.hash = jest.fn().mockResolvedValue("Passwordwithash");
    User.create = jest.fn().mockResolvedValue(mockUser);

    test("Then it should send a response with the code 200 if the data is ok", async () => {
      const req = {
        body: {
          user: mockUserRegister,
        },
      } as Partial<Request>;

      await registerUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCreated);
      expect(res.json).toHaveBeenCalled();
    });
  });

  test("And it should call the function next with an error if there is an error", async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const req = {
      body: {
        user: { ...mockUser, userName: 2 },
      },
    } as Partial<Request>;
    const error = new Error("Bad name");

    User.create = jest.fn().mockRejectedValue(error);

    await registerUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
