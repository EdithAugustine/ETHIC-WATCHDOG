const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up middleware to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appends the file extension
  }
});

const upload = multer({ storage: storage });

// Handle form submissions
app.post('/submit-case', upload.single('fileUpload'), (req, res) => {
  const { email, caseType, caseDescription } = req.body;
  const file = req.file;

  // For demonstration, log the form data to the console
  console.log('Email:', email);
  console.log('Case Type:', caseType);
  console.log('Case Description:', caseDescription);
  if (file) {
    console.log('File Uploaded:', file.filename);
  }

  // Send a response back to the user
  res.redirect('/thank-you.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
