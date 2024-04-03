const express = require('express');
const router = express.Router();
const couresControllers = require('../app/controllers/CourseController');

router.get('/create', couresControllers.create);
router.post('/store', couresControllers.store);
router.post('/handelFormAction', couresControllers.handelFormAction)
router.get('/:id/update', couresControllers.edit);
router.get('/:slug', couresControllers.showmyCourse); // khi nhấn học ở trong khóa học của mình
router.put('/:id', couresControllers.update);
router.delete('/:id/destroy', couresControllers.destroy);
router.delete('/:id', couresControllers.delete);
router.patch('/:id/restore', couresControllers.restore);
router.get('/:slug/:id', couresControllers.show); // khi nhấn 1 khóa học chưa từng học

module.exports = router;
