const { boolean } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fristName:{
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    verify: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

const AddAccount = mongoose.model('Student', userSchema)
module.exports = AddAccount