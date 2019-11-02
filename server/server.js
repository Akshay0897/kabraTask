const dotenv = require('dotenv');
dotenv.config({path :'../config.env'});
const path = require("path");
const app = require('./app');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
mongoose.Promise = global.Promise;

const port  = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((con) => { console.log('connection initiated sucessfully with mongodb');
})
  .catch((err) => console.log('connection failed to mongodb',err));

app.listen(port,() => 
    console.log(`server is running at ${port}`));