const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
var mongooseDelete = require('mongoose-delete');



const Coures = new Schema({
    name: {type: String , maxLength:255, require:true},
    description: {type: String, maxLength:600},
    image: {type: String, maxLength:255},
    video:{type: String, maxLength:255, require:true},
    slug: { type: String, slug: 'name' , unique: true },
    },{
        timestamps:true,
    });


    // add plugin
    mongoose.plugin(slug);
    Coures.plugin(mongooseDelete);
    Coures.plugin(mongooseDelete,  {  deletedAt : true ,overrideMethods: 'all' });

  module.exports=  mongoose.model('Coures', Coures);
