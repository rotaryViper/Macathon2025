const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const ChatMessage = require("./models/ChatMessage");

const app = express();
const PORT = process.env.PORT || 5000;
const VIEWS_PATH = path.join(__dirname, "/views/");

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect("mongodb+srv://<default>:<RQjvaPOVe3VaZqrk>@cluster0.y3rajwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Routes
// endpoint to the home page
app.get('/', (req, res) => {
    res.sendFile(VIEWS_PATH + "index.html");
})

// route to login page
app.get('/login', (req, res) => {
    res.sendFile(VIEWS_PATH + "login.html");
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

app.get('/signup', (req, res) =>{
    res.sendFile(VIEWS_PATH + "signup.html");
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
})

app.post('/signup', (req, res) => {
    const {email, password, repassword} = req.body;
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});