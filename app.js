const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;
const web = require('./routes/web');

const bodyParsert = require('body-parser')
const connectDB = require('./database/connectDB');


let cookieParser = require('cookie-parser')

/// token get 
app.use(cookieParser())



const session = require('express-session');
const flash = require('connect-flash');

////////////// message
app.use(
session ({
  secret:"secret",
  cookie: {maxAge : 60000},
  resave : false,
  saveUninitialized :false,
})
);
app.use(flash());

/////////////////////////////////////////////////
// Set up storage engine for Multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Specify the name of the file to be saved
    cb(null, Date.now() + path.extname(file.originalname));  // Append a timestamp to avoid filename conflicts
  },
});
// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });
// Create an API endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({
    message: 'File uploaded successfully!',
    file: req.file,
  });
});


////////////////////////////////////////////////////////////
// Set EJS as the templating engine

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.set ('view engine' ,'ejs')
app.use(express.urlencoded({extended : false}))


app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files uploaded.');
  }
  res.send({
    message: 'Files uploaded successfully!',
    files: req.files,
  });
});

app.use("",web)

connectDB()

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





