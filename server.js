// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

const noteData = require('./public/assets/db/db.json');

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3005;

// Static middleware pointing to the public folder
app.use(express.static('public'));

app.get('/notes/api', (req, res) => res.json(noteData));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

// setting route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
