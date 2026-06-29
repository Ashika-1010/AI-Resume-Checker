import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import connectDB from './config/db.js'
import {env} from './config/env.js'
import {notFound,errorHandler} from './middleware/errorHandler.js'

import healthRouter from './routes/health.js'
import authRouter from './routes/auth.js'
import resumesRouter from './routes/resumes.js'
import dashboardRouter from './routes/dashboard.js'
import insightsRouter from './routes/insights.js'
import versionsRouter from './routes/versions.js'
import historyRouter from './routes/history.js'

const app = express()

app.set("trust proxy",1)
app.use(
    cors({
        origin:true,
        credentials:true,
    })
)

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(cookieParser())

if (!env.isProd) {
  app.use(morgan("dev"));
}

app.use('/api/health',healthRouter);
app.use('/api/auth',authRouter);
app.use('/api/resumes',resumesRouter)
app.use('/api/dashboard',dashboardRouter)
app.use('/api/insights',insightsRouter)
app.use('/api/versions',versionsRouter)
app.use('/api/history',historyRouter)

app.use(notFound)
app.use(errorHandler)

const startServer = async () => {
    try{
        await connectDB()
        app.listen(env.port || 5000 , ()=>{
            console.log(`Server running on PORT ${env.port || 5000}`)
        })
    }
    catch(err){
        console.log("Server not started because database connection failed")
        process.exit(1)
    }
}

startServer()
export default app