const express = require('express');
const router = express.Router();
const siteControllers = require('../app/controllers/SiteController');

router.get('/search', siteControllers.search);
router.get('/', siteControllers.home);

module.exports = router;
