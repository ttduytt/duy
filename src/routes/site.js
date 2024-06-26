const express = require('express');
const router = express.Router();
const siteControllers = require('../app/controllers/SiteController');

router.get('/search', siteControllers.search);
router.get('/', siteControllers.formLogin);
router.get('/register', siteControllers.register);
router.get('/guest', siteControllers.formguest);

module.exports = router;
