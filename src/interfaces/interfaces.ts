export interface LoginData {
  userName: string;
  password: string;
}

export interface IJwtPayload {
  id: string;
  userName: string;
}

export interface UserData {
  userName: string;
  password: string;
  options: {};
  id: string;
}
export interface UserRegister {
  userName: string;
  password: string;
  email: string;
}

export interface ICustomError extends Error {
  statusCode: number;
  publicMessage?: string;
  privateMessage?: string;
}
