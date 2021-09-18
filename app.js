const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');


app.use('/',express.static(path.join(__dirname,'public')));


app.post('/profile', function (req, res, next) {
    const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads')
  },

  filename: function (req, file, cb) {


   // console.log(file.originalname);
 //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }

})




//const upload = multer({ storage: storage}).array("avatar",2); // name of the file.. you can also set array and its size here
// you can validate your files here
const upload = multer({ storage: storage, limits: {fileSize : 2 * 1024 * 1024},
  fileFilter: (req, file, cb) =>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
      cb(null, true);
    }else{
      cb(null, false);
      const err = new Error();
      err.name = "ExtensionError";
      err.message = 'Only .png, .jpg, jpeg format allowed';
      return cb(err);
    }
  }

}).single("avatar");



upload(req, res, function (err) {
// console.log("hasnain",req.file);
  if (err) {
   console.log("err",err);
   res.json({err});
   return
  }
    //console.log("file uploaded")
    
    const filename = req.file.filename;
    res.status(200).json({"msg": "file uploaded.......", "filename": filename});
  

})

  })
  

const PORT = process.env.PORT || 5000 ;
app.listen(5000,e => console.log(`server is listening at http://localhost:${PORT}`));