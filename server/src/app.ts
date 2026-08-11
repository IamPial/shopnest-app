import express, {type Request, type Response} from 'express'
import cors from 'cors'
import routes from './routes'
const app = express()


//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



//API Routes
app.use('/api/v1', routes)


//Home Route
app.get("/", (req:Request, res:Response)=>{
    res.json({
        success:true,
        message:"Welcome to the Backend server!"
    })
})


export default app