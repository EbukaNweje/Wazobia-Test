const user = require('../models/AddAccount')
const bcrypt = require("bcryptjs");
const createError = require("../utilities/error");
const jwt = require("jsonwebtoken");


exports.register = async (req, res, next)=>{
    try {
        const {email} = req.body
        user.findOne({email}) = async (err, User) =>{
            if(err){
                res.status(400)
            }
            if(User){
            return  res.status(200).json({Message: "Email already in use"})
            }else if(!User){
                const addUser = await user.create(req.body)
               return res.status(201).json({
                    Message: 'user created successfullY!',
                    data : addUser
                })
            }
            else{
                return next()
            }
        }

    }catch(err){
        next(err)
    }
}