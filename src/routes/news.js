const express = require('express');
const router = express.Router();
const newControllers = require('../app/controllers/NewsController');


router.get('/', newControllers.index);

module.exports = router;
