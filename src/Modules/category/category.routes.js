import { Router } from "express"
import { addCategory, allCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js"
import { validate } from "../../Middlewares/validate.js"
import { addCategoryVal, updateCategoryVal } from "./category.validation.js"
import { verifyToken } from "../../Middlewares/verifyToken.js"
import {  checkCategory } from "../../Middlewares/checkCategory.js"

const categoryRouter = Router()

categoryRouter
.route('/')
.post(verifyToken,validate(addCategoryVal),checkCategory,addCategory)
.get(verifyToken,allCategory)

categoryRouter
.route('/:id')
.get(verifyToken,getCategory)
.put(verifyToken,validate(updateCategoryVal),checkCategory,updateCategory)
.delete(verifyToken,deleteCategory)

export default categoryRouter