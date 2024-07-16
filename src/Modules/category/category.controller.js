import { Category } from "../../../Database/Models/category.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";


// add category
const addCategory = catchError(async(req,res,next)=>{
    req.body.createdBy = req.user.userId
    let category = await Category.insertMany(req.body);
    res.status(200).json({ message: "category added successfully", category });
})
// get all category

const allCategory = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Category.find({createdBy:req.user.userId}),req.query).pagination().sort()
    let categories = await apiFeatures.mongooseQuery
    res.status(200).json({message:"success",page:apiFeatures.pageNumber,categories})
})
// get category
const getCategory = catchError(async(req,res,next)=>{
    let category = await Category.findOne({_id:req.params.id,createdBy:req.user.userId})
    category || next(new AppError("category not found",404))
    !category || res.status(200).json({message:"success",category})
})

// update category
const updateCategory = catchError(async(req,res,next)=>{
    let category = await Category.findOneAndUpdate({_id:req.params.id,createdBy:req.user.userId},req.body,{new:true})
    category || next(new AppError("category not found",404))
    !category || res.status(200).json({message:"success",category})
})
// delete category
const deleteCategory = catchError(async(req,res,next)=>{
    let category = await Category.findOneAndDelete({_id:req.params.id,createdBy:req.user.userId})
    category || next(new AppError("category not found",404))
   !category || res.status(200).json({message:"Deleted successfully"})
})

export{
    addCategory,
    allCategory,
    getCategory,
    updateCategory,
    deleteCategory
}