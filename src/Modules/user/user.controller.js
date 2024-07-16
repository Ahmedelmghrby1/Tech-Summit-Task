import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import bcrypt from "bcrypt"
import { AppError } from "../../utils/appError.js";
import jwt from "jsonwebtoken"


const signup = catchError(async (req, res) => {
    let user = await User.insertMany(req.body);
    // sendEmail(req.body.email);
    user[0].password = undefined;
    res.status(201).json({ message: "success", user });
  });

  const signin = catchError(async (req, res,next) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("incorrect email or password",401));
    jwt.sign(
      { userId: user._id, email: user.email},
      "myNameIsAhmed",
      (err, token) => {
        res.json({ message: "success", token });
      }
    );
  });

  const updateAccount = catchError(async (req, res, next) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(new AppError('Email is already in use', 400));
    }
  
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'success', user });
  });


  const deleteAccount = catchError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new AppError('Account not found', 404));
    }
    res.status(200).json({ message: 'Account deleted successfully' });
})


  export{
    signup,
    signin,
    updateAccount,
    deleteAccount
  }