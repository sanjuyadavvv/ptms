import express from 'express'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import permissionRoutes from './routes/permissionRoutes.js'

import projectRoutes from './routes/projectRoutes.js'

import roleRoutes from './routes/roleRoutes.js'
import dotenv from 'dotenv'
import connect from './config/db.js'


const app=express();

app.use(express.json())
dotenv.config()


console.log(process.env.MONGOURL)

connect()


app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});




app.use(
  cors({
    origin:'http://localhost:5173',
    credentials:true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  })
)




const Port=process.env.PORT

app.use('/api/auth',authRoutes )

app.use('/api/auth',taskRoutes)

app.use('/api/auth',roleRoutes)
app.use('/api/auth',permissionRoutes)

app.use('/api/auth',projectRoutes)


app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(Port,()=>{
    console.log(`server running on port :${Port}`)
})