const express = require('express');
const path = require('path');
const app = express();

const PORT_NUMBER = 8081;
const VIEWS_PATH = path.join(__dirname, "/views/");

app.use(express.static("node_modules/bootstrap/dist/css"));

app.use(express.static('public'));

// Routes 
// endpoint to the home page
app.get('/', (req, res) => {
    res.sendFile(VIEWS_PATH + "index.html");
})

// route to login page
app.get('/login', (req, res) => {
    res.sendFile(VIEWS_PATH + "login.html");
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
})

app.listen(PORT_NUMBER, () => {
	console.log(`Listening on port ${PORT_NUMBER}`);
});