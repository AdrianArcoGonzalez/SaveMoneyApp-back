import "../../loadEnvironment";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import testUtils from "../../utils/testUtils";
import User from "../../database/models/userModel";
import registerUser from "./userControllers";

describe("Given a function registerUser.", () => {
  const { mockUser } = testUtils;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const status = 201;
  const next = jest.fn();

  bcryptjs.hash = jest.fn().mockResolvedValue("Passwordwithash");
  User.create = jest.fn().mockResolvedValue(mockUser);

  describe("When is called.", () => {
    test("It should send a response with the code 200.", async () => {
      const req = {
        body: {
          user: mockUser,
        },
      } as Partial<Request>;

      await registerUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When is called with a not good request.", () => {
    test("Then it should call the function next with an error.", async () => {
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
});
