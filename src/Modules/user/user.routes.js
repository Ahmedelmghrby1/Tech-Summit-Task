import { Router } from "express";
import { validate } from "../../Middlewares/validate.js";
import { verifyToken } from "../../Middlewares/verifyToken.js";
import { deleteAccount, signin, signup, updateAccount} from "./user.controller.js";
import {  signinVal, signupVal } from "./user.validation.js";
import {checkEmail } from "../../Middlewares/checkEmail.js";



const userRouter = Router()

userRouter
.route("/signup")
.post(validate(signupVal),checkEmail,signup)
userRouter
.route("/signin")
.post(validate(signinVal),signin)
userRouter
.route("/:id")
.put(verifyToken,updateAccount)
.delete(verifyToken,deleteAccount)

export default userRouter;