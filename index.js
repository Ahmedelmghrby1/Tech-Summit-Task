process.on("uncaughtException", (err) => {
  console.log({ error: err });
});

import express from "express";
import { AppError } from "./src/utils/appError.js";
import { db } from "./Database/dbConnection.js";
import { globalError } from "./src/Middlewares/globalError.js";
import { bootstrab } from "./src/Modules/bootstrab.js";
import { User } from "./Database/Models/user.model.js";
const app = express();
const port = 3000;
app.use(express.json());

bootstrab(app)



app.get('/verify/:token',async(req,res,next)=>{
  jwt.verify(req.params.token,"myNameIsAhmed",async(err,payload)=>{
      if(err) return next(new AppError(err,401))
      await User.findOneAndUpdate({email:payload.email},{confirmEmail:true})
      res.json({message:"success",email:payload.email})
  })
 
})


app.use("*", (req, res, next) => {
  next(new AppError(`Route not found ${req.originalUrl}`, 404));
});
app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.log({ error: err });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
