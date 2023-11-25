const express = require('express');
const router = express.Router();
const couresControllers = require('../app/controllers/CourseController');

router.get('/create', couresControllers.create);
router.post('/store', couresControllers.store);
router.post('/handelFormAction', couresControllers.handelFormAction)
router.get('/:slug', couresControllers.show);
router.get('/:id/update', couresControllers.edit);
router.put('/:id', couresControllers.update);
router.delete('/:id', couresControllers.delete);
router.patch('/:id/restore', couresControllers.restore);










module.exports = router;
