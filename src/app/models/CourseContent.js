const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseDelete = require('mongoose-delete');
var ObjectId = Schema.ObjectId; // Sử dụng ObjectId từ Schema

const contentCourse= new Schema ({
    title: {type: String},
    course_id:{ type: ObjectId},
    content: [
        {
            titleChild: {type:String},
            text:{type:String}
        }
    ],
},{ timestamps:true,})

contentCourse.plugin(mongooseDelete,  {  deletedAt : true ,overrideMethods: 'all' });

module.exports=  mongoose.model('contentCourse', contentCourse);