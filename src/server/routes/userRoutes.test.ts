import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "..";
import testUtils from "../../utils/testUtils";
import connectDatabase from "../../database";
import User from "../../database/models/User";
import { LoginData } from "../../interfaces/interfaces";

let mongoServer: MongoMemoryServer;
const user = testUtils.mockUserRegister;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const url = mongoServer.getUri();
  await connectDatabase(url);
});

afterEach(async () => {
  await User.deleteMany(user);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

const registerEndpoint = "/user/register";

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

  describe("When it receives a request to login user", () => {
    test("Then it should call the status 200 if the data is ok", async () => {
      const userLogin: LoginData = {
        userName: user.userName,
        password: user.password,
      };

      await request(app).post("/user/login").send(userLogin).expect(200);
    });
  });
});
