const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const midlewareController= require('../app/middleware/authon')

router.get('/list',midlewareController.verifyToken, userController.list)
router.delete('/delete/:id', userController.delete)


module.exports= router