const express = require('express');
const router = express.Router();
const newControllers = require('../app/controllers/NewsController');

router.use('/', newControllers.index);

module.exports = router;
