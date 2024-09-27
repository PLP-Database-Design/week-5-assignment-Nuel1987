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
    //No
    if(err) {
        return console.log("Error connecting to the Mysql db", err);
    }
    //Yes
    console.log("Connected to mysql db successfully as id:", db.threadId)
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

    //1. Retrieve data from patients table
app.get('', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
       //if I have error
        if(err) {
            return res.status(400).send("Failed to get Patients", err)
        }

        //without error
        res.status(200).send(data)
    })
})

// 2. Retrieve all providers
// app.get('', (req, res) => {
//     const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
//     db.query(getProviders, (err, data) => {
//        //if I have error
//         if(err) {
//             return res.status(400).send("Failed to get Patients", err)
//         }

//         //without error
//         res.status(200).send(data)
//     })
// })

// 3. Filter patients by First Name
// app.get('', (req, res) => {
//     const getPatients = "SELECT * FROM patients ORDER BY first_name"
//     db.query(getPatients, (err, data) => {
//        //if I have error
//         if(err) {
//             return res.status(400).send("Failed to get Patients", err)
//         }

//         //without error
//         res.status(200).send(data)
//     })
// })
    //start and listen to the server
app.listen(3300, () => {
        console.log(`Server listening on port 3300...`);
    
        // Send a message to the browser
        console.log('Sending message to browser...');
    app.get('/', (req, res) => {
            res.send('Server started successfully!!!')
        });
});

