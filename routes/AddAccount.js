const express = require('express')
const AddAccountControllers = require('../controllers/AddAccount')

const Router = express.Router()

Router.route('/getalluser').get(AddAccountControllers.GetAllUser)

module.exports = Router