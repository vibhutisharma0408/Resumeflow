const express = require('express');
const cors = require("cors");
const connectToDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const resumeRouter = require('./routes/resumeRoutes');
const path = require("path");

require("dotenv").config();

const app = express();

// CORS setup: allow both local dev and deployed frontend
const allowedOrigins = [
    process.env.FRONTEND_URL_LOCAL || "http://localhost:5176",
    process.env.FRONTEND_URL_DEPLOYED
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/auth", userRouter);
app.use("/api/resume", resumeRouter);

// Static uploads folder
app.use("/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.get("/", (req, res) => {
    res.send("API is working");
});

// Connect to DB and start server
connectToDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to DB:", error.message);
        process.exit(1);
    });
