import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
