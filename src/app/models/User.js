const mongoose= require('mongoose')
var mongooseDelete = require('mongoose-delete');
var ObjectId = mongoose.Schema.ObjectId; // Sử dụng ObjectId từ Schema

const user= new mongoose.Schema ({
    username:{type:String, require:true, minlength:6, maxlenght:20, unique:true},
    email:{type:String, require:true, minlength:10, maxlenght:50, unique:true},
    password:{type:String, require:true, minlength:6,},
    admin:{type:Boolean, default:false},
    avatar:{type:String,  default:'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'},
    coursesubriced:[
        {idcourse:{type:ObjectId}}
    ]
}, {timestamps:true});

user.plugin(mongooseDelete,  {  deletedAt : true ,overrideMethods: 'all' });

module.exports= mongoose.model('User',user);


