const CourseQuestion = require('../models/CourseQuestions'); 
const jwt= require('jsonwebtoken');
const Course= require('../models/Course');
const user= require ('../models/User');
const { token } = require('morgan');
class CourseQuestionController {
  async  showQuestion(req, res, next) {
    try {
        var idCourse= req.params.id
        var course= await Course.findById({_id:idCourse}).lean()
        var courseques= await CourseQuestion.find({course_id:idCourse})
        .lean()
        var username= await user .findOne({admin:true}).lean()
        res.render('./courseQuestions/show', {layout:'mainLogin', courseques,idCourse,course,username})
    } catch (error) {
        console.log(error)
    }
    
           
  }

  async createQuestion (req, res){
    try {
      let idcourse= req.params.id
    var course= await  Course.findById(idcourse)
      .lean()
    var username= await user.findOne({admin:true}).lean()
      res.render('./courseQuestions/createQuestion',{layout:'mainLogin', username, idcourse,course})
    } catch (error) {
      console.log(error)
    }
  }

   async addQues (req, res){
      try {
        var newOption=[];
       
        var options= req.body.options;
        let j=0
        for (let i=0; i<options.length; i++){
          
          if(options[i]==='true'){
            continue
          }
          if( options[i+1] !=='true' && options[i+1] !=='false'){
              newOption.push({
                option_text:options[i],
                is_correct:'false'
              })
              j++
            }else{
            newOption.push({
                    option_text:options[i],
                    is_correct:options[i+1]
                })
              j++
          }
        }
       
        req.body.options=newOption
        var idcourse= req.body.course_id
        
        await CourseQuestion.create(req.body)
    
        res.redirect(`/course/${idcourse}/lisQuestion`)
      } catch (error) {
        console.log(error)
      }
    }

   async formUpdate(req, res){
     try {
   
      var courseques= await CourseQuestion.findById(req.params.id)
      .lean()
      var username= await user.findOne({admin:true}).lean()
      res.render('./courseQuestions/formUpdate',{layout:'mainLogin', courseques, username})
     } catch (error) {
      console.log(error)
     }
    }

   async updateQues(req, res){
      try {
        var newOption=[];
        var options= req.body.options;
        for (let i=0; i<options.length; i++){
          if(options[i]==='true'){
            continue
          }
           if( options[i+1] !=='true' && options[i+1] !=='false'){
            newOption.push({
              option_text:options[i],
              is_correct:'false'
            })
            }else{
            newOption.push({
                    option_text:options[i],
                    is_correct:options[i+1]
                })
          }
        }
       
        req.body.options=newOption
        
      var question= await CourseQuestion.findById(req.params.id) 
      var idcourse=question.course_id

       await CourseQuestion.updateOne({_id: req.params.id }, req.body)
       res.redirect(`/course/${idcourse}/lisQuestion`)
      } catch (error) {
        console.log(error)
      }
    }

   async deleteQuestion (req, res){
     try {
      await CourseQuestion.deleteOne({_id:req.params.id})
      res.redirect('back')
     } catch (error) {
      console.log(error)
     }
    }

   async formStudy(req, res){
        try {
         
          var question= await CourseQuestion.find({course_id:req.params.id})
          .lean()
          var username=jwt.decode(req.cookies.token)
          res.render('courseQuestions/formAuditions',{layout:'mainLogin',question, username})
        } catch (error) {
          console.log(error)
        }
    }
}

module.exports = new CourseQuestionController();