
const Course= require('../models/Course')
const CouresContent= require ('../models/CourseContent')
class CourseController {
    
    // courses/:slug  
   async show(req, res) {
      try {
        var course= await Course.findOne({slug:req.params.slug})
        .lean()
        
        var courseContent= await CouresContent.findOne({course_id:course._id})
        .lean()
        res.render('course/show', {course,courseContent})
      } catch (error) {
        console.log(error)
      }
          
    }

    // get /courses/create
    create(req, res) {
           res.render('course/create')
           
     }

    // post /courses/store

    async store(req, res) {
        const course = new Course(req.body);
        try {
            await course.save();
          res.redirect('/')
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    edit(req, res) {
        Course.findById(req.params.id)
            .lean()
            .then((course)=>{
                res.render('course/update', {course})
            })
            .catch((err)=>{next(err)})
      
  }

     update (req, res){
         Course.updateOne({_id: req.params.id}, req.body)
            .then(res.redirect('/me/stored/courses'))
            .catch((err)=> {next(err)})
      
    }

    delete (req, res){
        Course.delete({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch((err)=> {next(err)})
    }

    restore (req, res){
        Course.restore({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch((err)=> {next(err)})
    }

    handelFormAction(req, res, next){
       
       switch(req.body.method){
            case 'delete' :
                Course.delete({_id: {$in: req.body.courseId} })
                .then(()=>res.redirect('back'))
                .catch((err)=> {next(err)})
            break;

            case 'restore' :
                Course.restore({_id: {$in: req.body.courseId} })
                .then(()=>res.redirect('back'))
                .catch((err)=> {next(err)})
            break;

            case 'destroy' :
                Course.deleteMany({_id: {$in: req.body.courseId} })
                .then(()=>res.redirect('back'))
                .catch((err)=> {next(err)})
            break;
        
            default: res.json({err:"Action invalid"})
                
       }
       
    }

}

module.exports = new CourseController();
