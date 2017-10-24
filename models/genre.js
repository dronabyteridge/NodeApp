var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenerSchema=Schema({

    name:{type:String,required:true,min:3,max:100},

});
// Virtual for bookinstance's URL
GenerSchema
.virtual('url')
.get(function () {
  return '/catalogs/genre/' + this._id;
});
module.exports=mongoose.model('Genre',GenerSchema);