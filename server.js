//import our dependencies
const express = require("express");
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// cors and ejs


//configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//Check if db connect works
db.connect((err) => {
    //No connection
    if(err) {
        return console.log("Error connecting to the Mysql db", err);
    }
    //Yes
    console.log("Connected to mysql db successfully as id:")
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

    //1. Retrieve data from patients table
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
       //if I have error
        if(err) {
            return res.status(400).send("Failed to get Patients", err)
        }
        else{
        //without error
        res.status(200).render('data', {title: "Patients", data});
        // res.status(200).send(data)
        }
    });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?"
    db.query(getProviders, (err, data) => {
       //if I have error
        if(err) {
            return res.status(400).send("Failed to get Providers", err)
        }

        //without error
        res.status(200).render('data', {title: "Providers Specialty", data});
        // res.status(200).send(data)
    });
});

// 3. Filter patients by First Name
app.get('/f-patients', (req, res) => {
    const getPatients = "SELECT * FROM patients ORDER BY first_name"
    db.query(getPatients, (err, data) => {
       //if I have error
        if(err) {
            return res.status(400).send("Failed to get Patients", err)
        }

        //without error
        res.status(200).render('data', {title: "filtering", data});
        // res.status(200).send(data)
    })
})

// 4. Retrieve all providers by their specialty
// Create a ```GET``` endpoint that retrieves all providers by their specialty
app.get ('/providers_specialty', (req, res) => {
    const specialty =req.query.specialty;
    const sql = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?" ;   

    db.query(sql, [specialty], (err, results) => {
        if(err) { 
            return res.status(500).send("Failed to get Patients", err)
        }

        //without error
        res.json({results:results});
        // res.status(200).send(data)  
    })
})
//method 2
app.get ('/providers_specialty/:specialty', (req, res) => { // route handler
    const {specialty} =req.params; // destructuring of params object
    console.log({specialty});
    const sql = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?" ;   

    db.query(sql, [specialty], (err, results) => { //pass specialty as array
        if(err) { 
            return res.status(500).send("Failed to get Patients", err)
        }

        //without error
        res.json(results); //send json results
        
    });
});

    //start and listen to the server
app.listen(3300, () => {
        console.log(`Server listening on port 3300...`);
    
        // Send a message to the browser
        console.log('Sending message to browser...');
    app.get('/', (req, res) => {
            res.send('Server started successfully!!!');
        });
});

