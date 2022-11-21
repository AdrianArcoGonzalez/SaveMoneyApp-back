import { ICustomError } from "../../interfaces/interfaces";

class CustomError extends Error implements ICustomError {
  constructor(
    public statusCode: number,
    public message: string,
    public publicMessage: string
  ) {
    super(message);
  }
}

export default CustomError;
