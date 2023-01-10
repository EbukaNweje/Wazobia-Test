const user = require('../models/AddAccount')
const bcrypt = require("bcryptjs");
const createError = require("../utilities/error");
const jwt = require("jsonwebtoken");
const {validationResult } = require('express-validator');

exports.register = async (req, res, next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {email} = req.body
        user.findOne({ email }, async (err, User) =>{
            if(err){
                res.status(400)
            }
            if(User){
            return  res.status(200).json({Message: "Email already in use"})
            }else if(!User){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
            
                const data = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                }

                const addUser = await user.create(data)
               return res.status(201).json({
                    Message: 'user created successfullY!',
                    data : addUser
                })
            }
            else{
                return next()
            }
        })

    }catch(err){
        next(err)
    }
}


exports.login = async (req, res, next)=>{
    try{
        const User = await user.findOne({email: req.body.email})
        if(!User) return next(createError(404, "User not found!"))
        // console.log(Student.password)

        const isPasswordCorrect = await bcrypt.compare(req.body.password, User.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        const token = jwt.sign({id:User._id, isAdmin:User.isAdmin}, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = User._doc

         res.cookie("access_token", token, {
            httpOnly: true, 
         }).status(200).json({...otherDetails})
    }catch(err){
        next(err)
    }
}
