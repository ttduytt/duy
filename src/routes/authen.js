const express = require('express');
const router =  express.Router();
const autheController= require('../app/controllers/autheController')

router.get('/login',autheController.formHome)
router.post('/register',autheController.registeruser)
router.post('/login',autheController.login)


module.exports= router;