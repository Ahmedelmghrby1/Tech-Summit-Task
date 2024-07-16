import categoryRouter from "./category/category.routes.js"
import taskRouter from "./task/task.routes.js"
import userRouter from "./user/user.routes.js"


export const bootstrab= (app)=>{
    app.use('/api/user',userRouter)
    app.use('/api/categories',categoryRouter)
    app.use('/api/task',taskRouter)
}