const newRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');
const courseQuestionRouter = require('./courseQuestion');
const courseContentRouter= require('./courseContent')

function route(app) {
    app.use('/contentCourse',courseContentRouter)
    app.use('/course',courseQuestionRouter)
    app.use('/me', meRouter);
    app.use('/news', newRouter);
    app.use('/courses', courseRouter);
    app.use('/', siteRouter);

}

module.exports = route;
