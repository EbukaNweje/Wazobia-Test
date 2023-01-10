const express = require('express')
const Auth = require('../controllers/auth')
const { check } = require('express-validator');

const Router = express.Router()

Router.route('/').post([
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 8 or more characters'
      ).isLength({ min: 8 }),],
    Auth.register)

module.exports = Router