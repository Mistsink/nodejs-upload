const express = require('express');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(multer({dest: '/upload/'}).array('image'));
app.set('view engine','ejs');


app.post('/upload', (req,res)=>{
   let filename = req.files[0].originalname;
   fs.readFile(req.files[0].path,(err,data)=>{
      fs.writeFile(__dirname+'/upload/'+filename,data,(err)=>{
         if(err){
            console.log(err);
            res.send('Sorry ,fail to upload.')
            return;
         }
         res.render('upload');
      })
   })
})


app.listen(80)