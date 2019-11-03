const dotenv = require('dotenv');
dotenv.config({path :'./config.env'});
const express = require('express');
const morgan = require('morgan');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");
const app = express();
const blog = require('./models/blogModel');
const fs = require('fs');

//app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const connection = mongoose.connection;
let gfs;

 connection.once('open', () => {
    // Init stream
    console.log('inside open connection')
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
    //console.log(gfs)
  });

const storage = new GridFsStorage({
    url: process.env.DATABASE.replace(
      '<password>',
      process.env.DATABASE_PASSWORD
    ),
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          req.filenames = filename; 
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({ storage });


//for upload single image
app.post("/api/upload", upload.single('myImage'),async function (req, res, next) {

  let obj = Object.assign({}, { title: req.body.title }, { desc: req.body.desc } , { images : req.file.filename } );
  const blogdata = await blog.create(obj);
  res.status(200).send({
      'message':'inside upload we are',
      'data':blogdata
    })
});


//to get all the blogs 
app.get("/api/getblogs", async function (req, res, next) {

  const blogdata = await blog.find({});
  res.status(200).json({
    'data':blogdata
  })
}); 

//to get single blog image from gridfs 
app.get("/api/getblogimage/:name", async function (req, res, next) {

 // console.log( req.params.name);
  
  gfs.files.findOne({ filename: req.params.name }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
}); 

app.all('*', (req, res, next) => {
    res.status(404).send({
      'message':'no routes for this path'
    })
});

module.exports = app;
  