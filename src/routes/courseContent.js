const express = require('express');
const router = express.Router();
const courseContent=  require ('../app/controllers/CourseContent')

router.get('/create/:id',courseContent.formCreate)
router.get('/formupdate/:id',courseContent.formupdate)
router.patch('/updateContent/:id',courseContent.updateContent)
router.delete('/deleteContent/:id',courseContent.deleteContent)
router.post('/addContent',courseContent.addContent)


module.exports = router;