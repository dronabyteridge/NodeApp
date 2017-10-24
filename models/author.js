var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AuthorSchema=Schema(
    {
        fname:{type:String,required:true,max:100},
        address:{type:String,required:true,max:100},
        dob:{type:Date},
        dod:{type:Date},
    }
);
// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.address + ', ' + this.fname;
});
// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalogs/author/' + this._id;
});
module.exports=mongoose.model('Author',AuthorSchema);