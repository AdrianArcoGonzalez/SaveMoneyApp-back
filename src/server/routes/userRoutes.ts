import express from "express";
import registerUser from "../controllers/userControllers";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

export default userRoutes;
