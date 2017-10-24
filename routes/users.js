var express = require('express');
var router = express.Router();
var address=require('../models/addressmodel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
var addressdetails=new address({name:'Drona',age:28,city:'Hyderabad'});
router.get('/saveaddress',function(req,res)
{
  
  addressdetails.save(function(err)
{
  if(err)
  {

    console.log("data save error");
  }
});
});
router.get('/getaddress',function(req,res)
{
  
  address.find({ 'name': 'Drona' }, function (err, addresses) {
    if (err) return handleError(err);
    console.log(JSON.stringify(addresses));
  })
});

module.exports = router;
