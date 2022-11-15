import CustomError from "./customError";

describe("Given a class CustomError", () => {
  describe("When instanciated with a status code 400", () => {
    test("Then it should create a opject qith status code 400", () => {
      const code = 400;

      const error = new CustomError(code, "", "");

      const expectedResult = error.statusCode;

      expect(expectedResult).toBe(code);
    });
  });

  describe("When instantiated with a message 'Error message'", () => {
    test("Then it should create an object with the message 'Error message'", () => {
      const message = "Error message";

      const error = new CustomError(0, message, "");

      const expectedResult = error.message;

      expect(expectedResult).toBe(message);
    });
  });

  describe("When instantiated with a public message 'Public-message'", () => {
    test("Then it should create an object with the publicMessage 'Public-message'", () => {
      const publicMessage = "Public-message";

      const error = new CustomError(0, "", publicMessage);

      const expectedResult = error.publicMessage;

      expect(expectedResult).toBe(publicMessage);
    });
  });
});
