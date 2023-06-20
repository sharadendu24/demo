const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const fileUpload = require('express-fileupload');


app.set('view engine', 'ejs');
app.use(express.json({ extended: true }));
app.use(fileUpload());







//Costomization Section.===============================================================================
//Below are some Constant to be changed according to the user.................

  const folderPath = "D:/CodingNinja/Extra_Files"; //folder path to store the data......
  
  
  
  
  
  
  const port = 3000;  //port number on which you want to run your server................ kindly keep it the same...

//Customization Section Ends Here.=====================================================================







app.get('/', (req, res) => {
  res.render('index');
});



// Route for handling the file upload
app.post('/upload', (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.csvFile;

  // Move the uploaded file to the specified folder
  const uploadPath = folderPath+"/"+file.name;
  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file.');
    }

    console.log("A File has been succesfully Uploaded!");
    res.render('index');
  });


});




app.get('/folders', (req, res) => {
  
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading folder contents');
    }

    
    const csvFiles = files.filter(file => file.endsWith('.csv'));

    
    res.render('folder', { csvFiles });
  });
});



// detail get api
app.get('/details', (req, res) => {
  const filePath = folderPath+"/"+req.query.path;
  const data = [];

  console.log(filePath);

  // Read the CSV file and parse its contents
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      res.render('detail', { data });
    });

    
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
