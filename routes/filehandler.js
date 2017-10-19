var express = require('express');
var router = express.Router();
var multer=require('multer');
router.use(multer({dest:'./temp/'}).any());

router.use(express.static('public'))


/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.get('/readfile',function(req,res)
  {
      var fs=req.fs;
      fs.readFile("./files/"+"data.txt",'utf8',function(err,data)
  {
      console.log('reading');
    if(!err)
    {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
    res.end();
    }
    else{
        console.log(err);
    }
  });
  });
  router.get('/createemptyfile',function(req,res)
{

    var fs=req.fs;
    fs.open("./files/"+"datatest.txt","w",function(err,file)
{

    if(!err)
    {
        console.log('file created');
        res.end('file created');
    }
    else{
        console.log('file create failed');
    }
});

});

router.get('/postfile',function(req,res)
{
    var path=req.path;
    res.sendFile('D:/Drona/node_learning/dbtest/myapp/www/fileupload.html');
});

router.post('/file_upload',function(req,res)
{

    var file = __dirname + "/" + req.files.myfile.name;
    fs.readFile( req.files.myfile.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
           if( err ){
              console.log( err );
              }else{
                 res.end('file uploaded successfully');
              }
           console.log( 'response' );
           res.end( JSON.stringify( response ) );
        });
     });
});

router.get('/writefile',function(req,res)
{

    var fs=req.fs;
    fs.writeFile("./files/"+"datatest.txt","hello world",function(err)
{

    if(!err)
    {
        res.end('file witten');
    }
});
});
router.get('/updatefile',function(req,res)
{

    var fs=req.fs;
    fs.appendFile("./files/"+"datatest.txt","new text updated",function(err)
{

    if(!err)
    {
        res.end('file updated');
    }
});
});
router.get('/deletefile',function(req,res)
{

    var fs=req.fs;
    fs.unlink("./files/"+"datatest.txt",function(err)
{

    if(!err)
    {
        res.end('file deleted');
    }
});
});
router.get('/renamefile',function(req,res)
{
    var fs=req.fs;
    fs.rename("./files/"+"data.txt","./files/"+"datanewtest.txt",function(err)
{

    if(!err)
    {
        res.end('file renamed');
    }
});
})

module.exports = router;