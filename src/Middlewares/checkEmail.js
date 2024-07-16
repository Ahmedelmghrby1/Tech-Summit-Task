import bcrypt from "bcrypt";
import { AppError } from "../utils/appError.js";
import { User } from "../../Database/Models/user.model.js";
import { catchError } from "./catchError.js";
 const checkEmail = async (req, res, next) => {
  let isfound = await User.findOne({ email: req.body.email});
  if (isfound) return next(new AppError("Email already exists",409))
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};



export{
  checkEmail,
}