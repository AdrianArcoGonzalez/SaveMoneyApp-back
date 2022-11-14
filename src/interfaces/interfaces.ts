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
