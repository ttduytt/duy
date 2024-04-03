
const Course= require('../models/Course')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const Users= require('../models/User')
const sortMiddleware= require('../middleware/sortMiddleware')
const { use } = require('../../routes/course')
const pako = require('pako')
const fs = require('fs')

class MeController {

    // get me/stored/courses
   async storedCourses(req, res, next) {

       let courseQuery=await Course.find({}).lean()
       let user= await Users.find({admin:true}).lean()
       if (req.query.hasOwnProperty('_sort')) {
        courseQuery.sort({ [req.query.colume]: req.query.type })
        }

        Promise.all([
            Course.countDocumentsWithDeleted({ deleted: true }),
            courseQuery,
            user
        ])
        
        .then(([courseDeleted, course,user]) => {
            var username= user[0]
            res.render('me/stored-Courses', {layout:'mainLogin', course, courseDeleted,username});
        })
        .catch(err => {
            next(err);
        });
    }

     trashCourses(req, res){
        Course.findWithDeleted({ deleted: true })
            .lean()
           
            .then((course)=>{
                var username=jwt.decode(req.cookies.token)
               res.render('me/trash-Courses', {course,username})
            })
            .catch(err=>{next(err)})
     }

    async myAcount(req, res){
        try {
            var user= await Users.findById(req.params.id)
            .lean()
            res.render('me/formMyAccount', {layout:'mainLogin',user})
        } catch (error) {
            console.log(error)
        }
     }

     async updateAccount(req, res) {
        try {

            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);
                 
                // gán lại mật khẩu đã hash
                req.body.password = hashed;
                
            }
            
            await Users.updateOne({ _id: req.params.id }, req.body);
            res.render('home',{layout:'mainLogin'})  
        } catch (error) {
            console.log(error);
        }
    }

   async home(req, res){
       try {
        var courses = await Course.find({})
        .lean()
        var username = await Users.findById(req.params.id)
        .lean()
        if(username.admin===false){
            var checkuser='user'
            res.render('home',{layout:'mainLogin',username, courses, checkuser}) 
        }else{
            res.render('home',{layout:'mainLogin',username, courses}) 
        }
        
       } catch (error) {
        console.log(error)
       }
    }

   async couresSubriced (req, res){
        var username= await Users.findById(req.params.id)
        .lean()
        var arridcourse=[] 
        username.coursesubriced.forEach(element => {
            arridcourse.push(element.idcourse)
        });
       var mycouresSubriced=await Course.find({_id:{$in:arridcourse}})
       .lean()
        if(username.admin===false){
            var checkuser='user'
            res.render('me/courseSubriced',{layout:'mainLogin',username,mycouresSubriced,checkuser})
        }else{
            res.render('me/courseSubriced',{layout:'mainLogin',username,mycouresSubriced})
        }
        
    }

   async notSubriceCourse(req, res){
        var username= jwt.decode(req.cookies.token)
       
        var user=await Users.findById(username._id)
        var arridcourseSubrice=[]
        user.coursesubriced.forEach(function(item){
            arridcourseSubrice.push(item.idcourse)
        }) 
        
       var mycouresNotSubriced=await Course.find({ _id: { $nin: arridcourseSubrice }}).lean()
        res.render('me/courseUser',{layout:'mainLogin',username,mycouresNotSubriced})
    }

    logOut(req, res){
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

   async managerUser(req, res){
        try {
            var Listusers =await Users.find({}).lean()
            var username= jwt.decode(req.cookies.token)
            res.render('me/managerUser', {layout:'mainLogin', username,Listusers})
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new MeController();
