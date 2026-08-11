import express, {type Request, type Response} from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req:Request, res:Response)=>{
    res.json({
        success:true,
        message:"Welcome to the Backend server!"
    })
})


export default app