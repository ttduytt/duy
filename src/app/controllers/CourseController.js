
const Course= require('../models/Course')
const CouresContent= require ('../models/CourseContent')
const user= require ('../models/User')
const jwt= require('jsonwebtoken')

class CourseController {
    
    // courses/:slug  

   async showmyCourse (req, res){
        try {
            var course= await Course.findOne({slug:req.params.slug})
            .lean()
            
            var courseContent= await CouresContent.findOne({course_id:course._id})
            .lean()
            var username= await user.findOne({admin:true}).lean()

            res.render('course/show', {layout:'mainLogin' ,username,course,courseContent})
        } catch (error) {
            console.log(error)
        }
   }


   async show(req, res) {
    // có id user ở params
      try {
        let checksubriced=0
        var course= await Course.findOne({slug:req.params.slug})
        .lean()

        
        // <code khi người dung học thì thêm dl khóa học đã đăng kí vào user nếu đã tồn tại thì ko thêm
       var usercheck= await user.findById({_id:req.params.id})
       var arrCourseid=usercheck.coursesubriced 
        for (let i = 0; i < arrCourseid.length; i++) {
           if( arrCourseid[i].idcourse.equals(course._id)){
            checksubriced+=1
           }
        }
       if(checksubriced<=0){
        await user.updateOne({_id: req.params.id}, { $push:{ coursesubriced: { idcourse: course._id } } } )
       }
       // </đóng code khi người dung học thì thêm dl khóa học đã đăng kí vào user nếu đã tồn tại thì ko thêm 


        var courseContent= await CouresContent.findOne({course_id:course._id})
        .lean()
        var username=await user.findById(req.params.id).lean()
        if(username.admin===false){
          var checkuser='user'
          res.render('course/show', {layout:'mainLogin', course,courseContent,username,checkuser})
        }else{
          res.render('course/show', {layout:'mainLogin', course,courseContent,username})
        }
       
      } catch (error) {
        console.log(error)
      }
          
    }

    // get /courses/create
    create(req, res) {
          var username= jwt.decode(req.cookies.token)
           res.render('course/create',{username})
           
     }

    // post /courses/store

    async store(req, res) {
        const course = new Course(req.body);
        try {
            await course.save();
          res.redirect('/me/stored/courses')
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

   async edit(req, res, next) {
 
              try {
               var course= await Course.findById(req.params.id)
                .lean()
                var username= await user.findOne({admin:true})
                .lean()

                res.render('course/update', {layout:'mainLogin', course, username})
              } catch (error) {
                console.log(error)
              }
           
          
      
  }

     update (req, res, next){
         Course.updateOne({_id: req.params.id}, req.body)
            .then(res.redirect('/me/stored/courses'))
            .catch((err)=> {next(err)})
      
    }

    async destroy (req, res, next){
       
      try {
        await Course.deleteOne({_id:req.params.id})
        res.redirect('back')
      } catch (error) {
        console.log(error)
      }
  }

   async delete (req, res, next){
       
            try {
              await Course.delete({_id:req.params.id})
              res.redirect('back')
            } catch (error) {
              console.log(error)
            }
    }

    restore (req, res, next){
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
