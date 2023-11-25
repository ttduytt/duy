
const Course= require('../models/Course')

class SiteController {
    // get  /news
    home(req, res, next) {
      Course.find({})
            .lean()
            .then(courses => res.render('home',{ courses}))
            .catch((error)=> {next(error)}) 
    }



    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
