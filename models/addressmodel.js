var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var addressSchema = new Schema({
    name          : String,
    age            : Number,
    city           :String,
});
var address=mongoose.model('address', addressSchema);
module.exports=address;