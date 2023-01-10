const user = require('../models/AddAccount')

exports.GetAllUser = async (req, res, next) => {
    try{
        const Allusers = await user.find()
        res.status(200).json({
            Message: "All user",
            Alluser: Allusers.length,
            data: Allusers
        })
        console.log("first")
    }catch(err){
        next(err)
    }
} 

exports.DeleteUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const UserDeleted =  await user.findByIdAndDelete(id)
        res.status(201).json({
            Message:` Successful Deleted`
        })
    }catch(err) {
        next(err)
    }
}