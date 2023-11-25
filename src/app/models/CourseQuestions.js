const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
var mongooseDelete = require('mongoose-delete');
var ObjectId = Schema.ObjectId; // Sử dụng ObjectId từ Schema

const questionCoures = new Schema({
    course_id:{ type: ObjectId},
    question_text:{type: String},
    options: [
      {
     
        option_text:{type:String},
        is_correct: { type: Boolean }
      },
      {
        
        option_text:{type:String},
        is_correct: { type: Boolean }
      },
  
      {
        
        option_text:{type:String},
        is_correct: { type: Boolean }
      },
      {
        
        option_text:{type:String},
        is_correct:{ type: Boolean }
      },
    ]
  
  },{  timestamps:true});
  
      // add plugin
      mongoose.plugin(slug);
 
      questionCoures.plugin(mongooseDelete,  {  deletedAt : true ,overrideMethods: 'all' });

      module.exports=  mongoose.model(' questionCoures',  questionCoures);
