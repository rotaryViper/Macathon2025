const express = require('express');
const path = require('path');
const app = express();

const PORT_NUMBER = 8081;
const VIEWS_PATH = path.join(__dirname, "/views/");

// endpoint to the home page
app.get('/', (req, res) => {
    res.sendFile(VIEWS_PATH + "index.html");
})

app.listen(PORT_NUMBER, () => {
	console.log(`Listening on port ${PORT_NUMBER}`);
});