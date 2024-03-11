// server.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'example-app',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// server.js
app.get('/api/data', (req, res) => {
    // Perform a MySQL SELECT query and send the data as JSON
    connection.query('SELECT * FROM your_table', (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  });
  
