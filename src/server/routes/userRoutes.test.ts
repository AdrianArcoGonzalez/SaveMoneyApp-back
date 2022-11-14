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

const registerEndpoint = "/user/register";
const user = testUtils.mockUserRegister;

describe("Given an userRouters routes", () => {
  describe("When receives a request to register user", () => {
    test("Then it should call the status with 201 if the data is ok", async () => {
      const responseBody = {
        message: `User ${user.userName} was registered sucessfully.`,
      };

      const { body } = await request(app)
        .post(registerEndpoint)
        .send(user)
        .expect(201);

      expect(body).toEqual(responseBody);
    });
  });
});
