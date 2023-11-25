const CourseContent= require('../models/CourseContent')
const Course= require('../models/Course')
class CourseContentController {
   async formCreate (req, res){
           try {
               var idCourse= req.params.id
               var course= await Course.findById(req.params.id)
               .lean()
               res.render('./contentCourse/create', {idCourse,course})
           } catch (error) {
               console.log(error)
           }
    }

   async addContent (req, res){
     try {
      
        await  CourseContent.create(req.body)
        res.send('thanh cong')
     } catch (error) {
        console.log(error)
     }
    }

   async formupdate (req, res){
      
        var course= await Course.findById(req.params.id)
        .lean()

        var contentCourse= await CourseContent.findOne({course_id:req.params.id})
        .lean()
     
        res.render('./contentCourse/update', {contentCourse,course})
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
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new CourseContentController