const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const ejs = require("ejs");

const ChatMessage = require("./models/ChatMessage");

const app = express();
const PORT = process.env.PORT || 5000;
const VIEWS_PATH = path.join(__dirname, "/views/");

// Middleware
app.use(cors());
app.use(express.json());

// /** Parsing the body of the incoming requests, making sure that POST req works */
app.use(express.urlencoded({extended: true}));

/** Configuring ejs */
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static('public'));

/**
 * URL to connect to mongodb, name: mac2025
 */
const url = "mongodb://localhost:27017/mac2025";


/**
 * Function to connect to the database
 * @param {String} url 
 * @returns connected statement
 */
async function connect(url) {
    await mongoose.connect(url);
	return "Connected Successfully";
}

connect(url)
	.then(console.log)
	.catch((err) => console.log(err));


/**
 * Models
 */
const Messages = require("./models/ChatMessage");

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

app.get('/signup', (req, res) =>{
    res.sendFile(VIEWS_PATH + "signup.html");
})

app.post('/signup', (req, res) => {
    const {email, password, repassword} = req.body;
})

app.get("/messages", async (req, res) => {
    try {
        const messages = await ChatMessage.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/messages", async (req, res) => {
    try {
        const { user, message } = req.body;

        if (!user || !message) {
            return res
                .status(400)
                .json({ error: "User and message are required" });
        }

        const chatMessage = new ChatMessage({
            user,
            message,
        });

        await chatMessage.save();

        res.status(201).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});