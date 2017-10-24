var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var BookInstanceScheme=Schema({

    book:{type:Schema.ObjectId,ref:'Book',required:true},
    imprint:{type:String,required:true},
    status:{type:String,required:true,enum:['Available','Mantainance','Loaned','Reserved'],default:'Maintainance'},
    due_back:{type:String,default:Date.now}
});
// Virtual for bookinstance's URL
BookInstanceScheme
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});
BookInstanceScheme
.virtual('due_back_formatted')
.get(function () {
  return moment(this.due_back).format('MMMM Do, YYYY');
});
module.exports=mongoose.model('BookInstance',BookInstanceScheme);
