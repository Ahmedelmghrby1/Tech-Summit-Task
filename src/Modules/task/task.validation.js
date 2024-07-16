import Joi from "joi"

const addTaskVal = Joi.object({
    category: Joi.string().required(),
    // createdBy: Joi.string(),
    textTask: Joi.string(),
    status: Joi.string(),
    listTask: Joi.array(),
})

export{
    addTaskVal
}