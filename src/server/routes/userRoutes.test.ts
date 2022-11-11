import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "..";
import testUtils from "../../utils/testUtils";
import connectDatabase from "../../database";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const url = mongoServer.getUri();
  await connectDatabase(url);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given an userRouters on the endpoint /user/register", () => {
  const user = testUtils.mockUser;
  const registerEndpoint = "/user/register";
  describe("When receives a request with an object user", () => {
    test("Then it should call the controller registerUser", async () => {
      const responseBody = {
        message: `User ${user.username} was registered sucessfully.`,
      };

      const { body } = await request(app)
        .post(registerEndpoint)
        .send(user)
        .expect(201);

      expect(body).toEqual(responseBody);
    });
  });
});
