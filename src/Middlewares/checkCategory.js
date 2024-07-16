import { Category } from "../../Database/Models/category.model.js"
import categoryRouter from "../Modules/category/category.routes.js"


 const checkCategory = async (req, res, next) => {
    let isfound = await Category.findOne({ name: req.body.name })
    if(isfound) return res.status(400).json({message:"CategoryName already exists"})
        next()
}

export{
    checkCategory,
}