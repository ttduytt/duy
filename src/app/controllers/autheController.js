const user= require ('../models/User')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const Course= require('../models/Course')

const cookieParser = require('cookie-parser');

class autheController {
    // đăng kí
   async registeruser (req, res){
        try {
            // hash pass
           const salt= await bcrypt.genSalt(10)
           const hashed= await bcrypt.hash(req.body.password, salt)
           
           // gan lai pass
           req.body.password=hashed

           // save to DB
         
           await user.create(req.body)
           res.redirect('/');
        } catch (error) {
          console.log(error)
        }
    }

   async login (req, res){
        try {
            const username = await user.findOne({ username: req.body.username })
            .lean()
            if (!username) {
                return res.status(404).json('sai tai khoan');
            }
           const checkpass=await bcrypt.compare(req.body.password, username.password)
           if(checkpass===false){
            
            res.json('sai mat khau')
           }
           if(username && checkpass===true){
           const Accesstoken= jwt.sign({
                _id:username._id,
                admin:username.admin,
                avatar:username.avatar,
            },
                process.env.JWT_ACCESS_KEY,
                {expiresIn:'1d'}
            );
           
           var courses= await Course.find({})
            .lean()
            res.cookie('token', Accesstoken, { secure: true, httpOnly: true, sameSite: 'strict' });
            if(username.admin===true){
               var checkuser='admin'
                res.render('home',{layout:'mainLogin',username, courses,checkuser})   
            }else{
               var checkuser='user'
                res.render('home',{layout:'mainLogin',username, courses,checkuser})   
            }

           }
        } catch (error) {
            console.log(error)
        }
    }

   async formHome(req ,res){
        var courses= await Course.find({})
        .lean()
        var username= jwt.decode(req.cookies.token)
        if(username.admin===false){
           
            var checkuser='user'
        }
        res.render('home',{layout:'mainLogin', courses,username,checkuser}) 
    }
}

module.exports= new autheController