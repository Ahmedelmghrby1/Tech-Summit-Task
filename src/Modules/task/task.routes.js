import { Router } from "express"
import { validate } from "../../Middlewares/validate.js"
import { addTaskVal } from "./task.validation.js"
import { addTask, allTasks, deleteTask, updateTask } from "./task.controller.js"
import { verifyToken } from "../../Middlewares/verifyToken.js"


const taskRouter = Router()

taskRouter
.route('/')
.post(verifyToken,validate(addTaskVal),addTask)
.get(verifyToken,allTasks)

taskRouter
.route('/:id')
.put(verifyToken,updateTask)
.delete(verifyToken,deleteTask)



export default taskRouter