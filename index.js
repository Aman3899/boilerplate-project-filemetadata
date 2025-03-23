const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Configure multer for file uploads (store in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors()); // Enables CORS for all routes
app.use(express.static("public"));
app.use(express.json());

// Set headers manually for additional security
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Root route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// POST /api/fileanalyse - Analyze uploaded file
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For Vercel
