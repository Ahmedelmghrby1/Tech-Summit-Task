import { Category } from "../../../Database/Models/category.model.js";
import { Task } from "../../../Database/Models/task.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";


// Create a new task
 const addTask = catchError(async (req, res, next) => {
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(201).json({ message: "Task added successfully", task });
  });
  
  // Get all tasks
   const allTasks = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Task.find({
      $or: [
        { createdBy: req.user.userId },
        { status: "public" }
      ]
    }),req.query).pagination().sort()
    const tasks = await apiFeatures.mongooseQuery.populate('category')
    res.status(200).json({ message: "Success",page:apiFeatures.pageNumber, tasks });
  });

  // Update a task
const updateTask = catchError(async (req, res, next) => {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    ).populate('category');
    if (!task) {
      return next(new AppError("Task not found", 404));
    }
    res.status(200).json({ message: "Task updated successfully", task });
  });
// Delete a task
    const deleteTask = catchError(async (req, res, next) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!task) {
      return next(new AppError("Task not found", 404));
    }
    res.status(200).json({ message: "Task deleted successfully" });
  });

  export{
    addTask,
    allTasks,
    updateTask,
    deleteTask
  }