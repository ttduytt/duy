
const Course= require('../models/Course')

class SiteController {
 
    formLogin(req, res) {
        res.render('formLogin', { layout: 'form-only' });
      }
      

    search(req, res) {
        res.render('search');
    }

    register(req, res){
        res.render('formRegister', { layout: 'form-only' });
    }

   async formguest(req, res){
      try {
        var authozation='guest'
        var courses= await Course.find({})
        .lean()
        res.render('home',{authozation,courses})
      } catch (error) {
        console.log(error)
      }
    }
}

module.exports = new SiteController();
