var express = require("express");
var app = express();
var cors=require('cors')
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();


require("dotenv").config();

// for parsing application/json
app.use(bodyParser.json());
app.use(cors(3000));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST,PUT ,PATCH, DELETE, OPTIONS'
  );
  next();
});

//mongoose
const mongoose = require('mongoose');
const { CLIENT_RENEG_LIMIT } = require("tls");

mongoose.connect("mongodb+srv://ahagbaria99:Ahmf1144@cluster0.m4jkabh.mongodb.net/all-data?retryWrites=true&w=majority")



var articleRoute = require("./routes/Controllers/articleController");
app.use("/article", articleRoute);


var userRoute = require("./routes/Controllers/userController");
app.use("/user", userRoute);





app.listen(5000);
