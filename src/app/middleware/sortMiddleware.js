module.exports = function sortMiddleware (req,courseQuery){
   if (req.query.hasOwnProperty('_sort')) {
        courseQuery.sort({ [req.query.colume]: req.query.type })
   }
}