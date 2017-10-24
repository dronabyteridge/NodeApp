var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.collection('user');
  
  collection.find({}).toArray(function(err, results){
    console.log(results);
    console.log(JSON.stringify(results));
    res.render('userlist', {userlist: JSON.stringify(results)});
  });

});

router.get('/getselectedcolumns',function(req,res)
{
  var db=req.db;
  var collection=db.collection('user');
  collection.find({},{name: false })
  .toArray(function(err,results)
{
  console.log(results);
  res.render('userlist',{userlist:JSON.stringify(results)});
});
});

router.get('/getsorteduser',function(req,res)
{

  var db=req.db;
  var collection=db.collection('user');
  collection.find().sort({name:-1}).toArray(function(err,results)
{
  res.render('userlist',{userlist:JSON.stringify(results)});
});
});

router.get('/getuserbyname',function(req,res)
{
  var db=req.db;
  var collection=db.collection('user');
  collection.find({name:"Drona"}).toArray(function(err,results)
{
  res.render('userlist',{userlist:JSON.stringify(results)});
});
})
router.post('/adduser',function(req,res)
{
  var db=req.db;
  var username=req.body.username;
  var email=req.body.useremail;
  var collection=db.collection('user');
  collection.insert({"name":username,"email":email,"age":20},function(err,doc)
{
  if (err) {
    // If it failed, return error
    res.send("There was a problem adding the information to the database.");
}
else {
    // And forward to success page
    res.redirect("userlist");
}

})

});

module.exports = router;
