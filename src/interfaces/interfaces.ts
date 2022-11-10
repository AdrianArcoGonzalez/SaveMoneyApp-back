export interface LoginData {
  id: string;
  userName: string;
  password: string;
}

export interface IJwtPayload {
  id: string;
  username: string;
}

export interface UserData {
  username: string;
  password: string;
  options: {};
  id: string;
}
