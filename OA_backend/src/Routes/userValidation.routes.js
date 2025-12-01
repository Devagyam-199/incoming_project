import { Router } from "express";
import APIError from "../Utils/apiError.utils.js";
import userSignUp from "../Controllers/userSignUp.controllers.js";
import signUpMiddleware from "../Middlewares/signUp.middleware.js";
import loginMiddleware from "../Middlewares/login.middleware.js";
import userLogin from "../Controllers/userLogin.controllers.js";

const userValidate = Router();

userValidate.post("/user-signup", signUpMiddleware, userSignUp);
userValidate.post("/user-login", loginMiddleware, userLogin);

export default userValidate;
