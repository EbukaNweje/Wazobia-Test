const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cookkieParser = require("cookie-parser")
const cors = require('cors')
const Adduser = require('./routes/AddAccount')
const Register = require('./routes/Auth')

dotenv.config({path: "./config/index.env"})

const app = express()
const Db = process.env.DATABASE

app.use(cookkieParser())
app.use(express.json())
app.use(cors())


mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Connected!")
})

app.use("/api/v1/", Adduser)
app.use("/api/v1/signup", Register)

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
     success: false,
     status: errorStatus,
     message: errorMessage,
     stack: err.stack,
    })
 })

app.get("/",(req,res)=>{
    res.status(200).send("Working ok")
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Connected')
})
