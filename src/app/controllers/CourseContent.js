const CourseContent= require('../models/CourseContent')
const Course= require('../models/Course')
const { use } = require('../../routes/courseContent')
const user= require ('../models/User')
class CourseContentController {
   async formCreate (req, res){
           try {
               var idCourse= req.params.id
               var course= await Course.findById(req.params.id)
               .lean()
               var username= await user.findOne({admin:true}).lean()
               res.render('./contentCourse/create', {layout:'mainLogin',username, idCourse,course})
           } catch (error) {
               console.log(error)
           }
    }

   async addContent (req, res){
     try {
        var course= await Course.findById(req.body.course_id)
        var slug= course.slug
        await  CourseContent.create(req.body)
        res.redirect(`/courses/${slug}`)
     } catch (error) {
        console.log(error)
     }
    }

   async formupdate (req, res){
      
        var course= await Course.findById(req.params.id)
        .lean()

        var contentCourse= await CourseContent.findOne({course_id:req.params.id})
        .lean()
        var username= await user.findOne({admin:true}).lean()
        res.render('./contentCourse/update', { layout:'mainLogin',username, contentCourse,course})
    }

   async updateContent(req, res){
       try {
        await CourseContent.updateOne({_id:req.params.id}, req.body)
        res.send('thanh cong')
       } catch (error) {
        console.log(error)
       }
    }

   async deleteContent (req, res){
        try {
            await CourseContent.deleteOne({_id:req.params.id})
            res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new CourseContentController