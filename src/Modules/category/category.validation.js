import Joi from "joi"

const addCategoryVal = Joi.object({
    name: Joi.string().required()
    })
    const updateCategoryVal = Joi.object({
        name: Joi.string().required(),
        id:Joi.string()
    })

    export{
        addCategoryVal,
        updateCategoryVal
    }