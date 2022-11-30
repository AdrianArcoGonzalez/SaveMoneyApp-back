import { model, Schema } from "mongoose";
import { ExpenseIncome } from "../../interfaces/interfaces";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  incomes: {
    type: Array<ExpenseIncome>,
  },

  expenses: {
    type: Array<ExpenseIncome>,
  },

  moneySaved: {
    type: Number,
  },
  currency: {
    type: String,
  },
  savingTarget: {
    type: Number,
  },
});

const User = model("User", userSchema, "users");

export default User;
