const express = require('express');
const router =  express.Router();
const courseQuestion=  require ('../app/controllers/CourseQuestion')
const midlewareController= require('../app/middleware/authon')

router.post('/addQues',courseQuestion.addQues)
router.get('/:id/study',midlewareController.verifyToken,courseQuestion.formStudy)
router.put('/:id/update', courseQuestion.updateQues)
router.get('/:id/lisQuestion', courseQuestion.showQuestion)
router.get('/:id/createQuestion',courseQuestion.createQuestion)
router.get('/:id/updateQuestion',courseQuestion.formUpdate)

// thuc ra la delete
router.get('/:id/deleteQuestion',courseQuestion.deleteQuestion)


module.exports = router;