// import Student from "../models/AddStudent";

const createError = require("../utilities/error");
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "you are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, User)=>{
        if(err)return next(createError(401, "token is not valid!"));
        req.User = User
        next()
    })
};

const verifyStudent = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        console.log(req.User.id)
        if(req.User.id === req.params.id || req.User.isAdmin){
            next()
        } else {
           return next(createError(403, "you are not authenticated!"));
        }
    })
};

const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        console.log(req.User.id)
        if(req.User.isAdmin){
            next()
        } else {
           return next(createError(403, "you are not authenticated!"));
        }
    })
} 

module.exports =  {verifyToken, verifyStudent, verifyAdmin}