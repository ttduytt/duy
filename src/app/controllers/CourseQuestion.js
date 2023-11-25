const CourseQuestion = require('../models/CourseQuestions'); 
const Course= require('../models/Course')
class CourseQuestionController {
  async  showQuestion(req, res, next) {
    try {
        var idCourse= req.params.id
        var course= await Course.findById({_id:idCourse}).lean()
        var courseques= await CourseQuestion.find({course_id:idCourse})
        .lean()
       
        res.render('./courseQuestions/show', {courseques,idCourse,course})
    } catch (error) {
        console.log(error)
    }
    
           
  }

  async createQuestion (req, res){
    try {
      let idcourse= req.params.id
      res.render('./courseQuestions/createQuestion',{idcourse})
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
        
        await CourseQuestion.create(req.body)
        var successMessage = 'Thao tác thành công!';
        res.render('./courseQuestions/createQuestion',{successMessage})
      } catch (error) {
        console.log(error)
      }
    }

   async formUpdate(req, res){
     try {
   
      var courseques= await CourseQuestion.findById(req.params.id)
      .lean()
      res.render('./courseQuestions/formUpdate',{courseques})
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
        
       
       await CourseQuestion.updateOne({_id: req.params.id }, req.body)
       res.redirect('/me/stored/courses')
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
          res.render('./courseQuestions/formAuditions',{question})
        } catch (error) {
          console.log(error)
        }
    }
}

module.exports = new CourseQuestionController();