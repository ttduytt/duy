const express = require('express');
const router = express.Router();
const meControllers = require('../app/controllers/MeController');

router.get('/stored/courses', meControllers.storedCourses);
router.get('/trash/courses', meControllers.trashCourses);
router.get('/myAcount/:id', meControllers.myAcount);
router.get('/home/:id', meControllers.home);
router.get('/notSubricecourse', meControllers.notSubriceCourse);
router.get('/managerUser', meControllers.managerUser);
router.get('/couresSubriced/:id' ,meControllers.couresSubriced);
router.get('/logOut' ,meControllers.logOut);
router.put('/myAcount/update/:id', meControllers.updateAccount);




module.exports = router;
