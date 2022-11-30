export interface LoginData {
  userName: string;
  password: string;
}

export interface IJwtPayload {
  id: string;
  userName: string;
  incomes: ExpenseIncome[];
  expenses: ExpenseIncome[];
  moneySaved: number;
  currency: "€" | "$";
  savingTarget: number;
}

export interface UserData {
  userName: string;
  password: string;
  options: {};
  id: string;
}

export interface ICustomError extends Error {
  statusCode: number;
  publicMessage?: string;
  privateMessage?: string;
}

export interface IUser {
  userName: string;
  incomes: ExpenseIncome[];
  expenses: ExpenseIncome[];
  moneySaved: number;
  currency: "€" | "$";
  savingTarget: number;
}

export interface IUserFromDb extends UserRegister {
  id: string;
}
export interface UserRegister extends IUser {
  email: string;
  password: string;
}

export interface UserLoged extends IUser {
  token: string;
  isLogged?: boolean;
}

export interface ExpenseIncome {
  name: string;
  quantity: number;
  date: string;
  category: Category;
}
export interface Category {
  name: string;
  icon: string;
}
