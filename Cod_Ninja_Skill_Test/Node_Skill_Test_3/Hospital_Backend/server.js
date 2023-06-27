const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');




//------TO BE CUSTOMIZED BY USER ========================================================================

    //Configuration for database-------------------------------------------------------------------------

        const DB_URL = 'mongodb://127.0.0.1:27017';
        const DB_NAME = 'test_database';
        const JWT_SECRET = 'secretkey';



    //Configure the port for the api's------------------------------------------------------------------
        
        const PORT = 3000;



// ------CUSTOMIZATION SECTION ENDS HERE>> ==============================================================







const app = express();
app.use(express.json());

// MongoDB connection
let db;

async function connectToDatabase() {
  const client = new MongoClient(DB_URL);
  await client.connect();
  console.log("line40");
  db = client.db(DB_NAME);
  console.log('Connected to the database');
}



// Doctor Register route
app.post('/doctors/register', async (req, res) => {

  try {
    const { username, password } = req.body;

    console.log(req.body);

    // Check if username already exists
    const existingUser = await db.collection('doctors').findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const user = {
      username,
      password: hashedPassword
    };

    // Insert user document into the database
    await db.collection('doctors').insertOne(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





//Doctor Login route
app.post('/doctors/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await db.collection('doctors').findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Method to authenticate the JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
  }






//ALL THE PROTECTED API'S ARE BELOW THIS COMMENT=========================================================
//-------------------------------------------------------------------------------------------------------


//patient Register route...............................................................
app.post('/patients/register', authenticateToken, async (req, res) => {

  try{

    const {usernumber}=req.body;

    // Checking if usernumber already exists
    const existingUser = await db.collection('patients').findOne({ usernumber });
    if (existingUser) {
      return res.status(409).json({ message: 'Patient already exists' });
    }

    //const to store patient's report
    const patientcase={
      usernumber,
      report:[]
    }

    db.collection('patients').insertOne(patientcase);
    res.json({ message: 'Patient '+usernumber+' added successfully' });


  }

  catch{
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });

  }


});





//Patient create report Route....................................................................
app.post('/patients/:id/create_report', authenticateToken, async(req, res) => {

  try{
    //const to store id in number format as it is stored in the database
    const targetUserNumber= +req.params.id;

    if(req.body.status!='Negative' && req.body.status!='Travelled-Quarantine' && req.body.status!='Symptoms-Quarantine' && req.body.status!='Positive-Admit'){
      return res.status(409).json({ message: 'Not a proper status' });
    }

    //const to store all the data to the patient's report..
    let data={
      doctor:req.user.username,
      status:req.body.status,
      date: new Date().toDateString()
    }

    // Get the collection where your documents are stored
    const collection = db.collection('patients');

    const patient=await collection.findOne({ usernumber: targetUserNumber });

    if(!patient){
      res.status(409).json({ message: 'No Patient found for number'+req.params.id });
    }

    //const to store all the data - previous+new
    const updatedReport=[...patient.report,data];


    // Update the document with matching usernumber
    await collection.updateOne(
      { usernumber: targetUserNumber },
      { $set: { report: updatedReport } },
      function (err, result) {
        if (err) {
          console.error('Error updating document:', err);
        } else {
          console.log('Document updated successfully');
          
        }
      }
    );
    
    res.json({ message: 'Patient report updated successfully for'+req.params.id });

  }
  
  catch{
  }
  
});






//get route to get all the report for any specific patient
app.get('/patients/:id/all_reports', authenticateToken, async(req, res) => {
  //console.log(req.user);
  const targetUserNumber= +req.params.id;

  // Get the collection where your documents are stored
  const collection = db.collection('patients');

  //getting the patient registered from targetUserNumber number
  const patient=await collection.findOne({ usernumber: targetUserNumber });

  if(!patient){
    res.status(409).json({ message: 'No Patient found for number'+req.params.id });
  }

  res.json(patient.report);
});





//get route for filtering the patient with some specific status
app.get('/reports/:status', authenticateToken, async(req, res) => {

  //const to store search key..
  const status=req.params.status
  console.log(req.user);

  // Get the collection where documents are stored
  const collection = db.collection('patients');

  const patient=await collection.find().toArray();

  //creating an arrya to store data after required filter
  let records=[];

  //method to itterate over the patient array and store it into the array to be sent over http protocol in json format
  patient.map(function(item) {
    
    console.log(item);
    records=[...records,...item.report.filter(function(item){ if(item.status==status) return item; })];
   
  });

  res.json(records);

});








//------------------------------------------------------------------------------------------------------
//ALL THE PROTECTED ROUTES ARE ABOVE THIS COMMENT SECTION===============================================





  
  // Start the server
  async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }
  


  startServer();