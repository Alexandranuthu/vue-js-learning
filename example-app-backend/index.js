const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { generateResetToken } = require('./services/passwordServices');
const { sendResetEmail} = require('./services/passwordServices');
const User = require('./models/userModel');



const app = express();
const PORT = 3000;

// Middleware to parse JSON in the request body
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
app.post('/api/signup', (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      console.log('Received data:', { firstname, lastname, username, email, hashedPassword });

      // Perform a MySQL INSERT query to add the user to the database
      const sql = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)';
      const values = [firstname, lastname, username, email, hashedPassword];

      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error signing up:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log('User signed up successfully!');
          res.json({ success: true });
        }
      });
    })
    .catch((hashErr) => {
      console.error('Error hashing password:', hashErr);
      res.status(500).send('Internal Server Error');
    });
});
//login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Perform a MySQL SELECT query to check if the user exists
  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      // User not found
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password)
      .then((match) => {
        if (match) {
          // Passwords match, user is authenticated
          res.json({ success: true });
        } else {
          // Passwords do not match
          res.status(401).json({ error: 'Invalid credentials' });
        }
      })
      .catch((compareErr) => {
        console.error('Error comparing passwords:', compareErr);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
});

// Server route (e.g., /forgot)
app.post('/forgot', async (req, res) => {
  const { email } = req.body;

  try {
      const resetToken = await generateResetToken(email);
      const user = await User.findOne({ email });

      if (resetToken && user) {
          await sendResetEmail(email, resetToken, res, user.username);
          res.json({ success: true });
      } else {
          res.status(404).json({ error: 'User not found or reset token not generated' });
      }
  } catch (error) {
      console.error('Error handling forgot password request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
