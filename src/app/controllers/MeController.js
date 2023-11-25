
const Course= require('../models/Course')
const sortMiddleware= require('../middleware/sortMiddleware')
class MeController {

    // get me/stored/courses
    storedCourses(req, res, next) {

       let courseQuery= Course.find({}).lean()

       sortMiddleware(req,courseQuery)

        Promise.all([
            Course.countDocumentsWithDeleted({ deleted: true }),
            courseQuery
        ])
        .then(([courseDeleted, course]) => {
            res.render('me/stored-Courses', { course, courseDeleted });
        })
        .catch(err => {
            next(err);
        });
    }

     trashCourses(req, res){
        Course.findWithDeleted({ deleted: true })
            .lean()
            .then((course)=>{
             
               res.render('me/trash-Courses', {course})
            })
            .catch(err=>{next(err)})
     }

}

module.exports = new MeController();
