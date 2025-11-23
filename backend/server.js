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
    process.env.FRONTEND_URL_LOCAL || "http://localhost:5173",
    process.env.FRONTEND_URL_DEPLOYED
].filter(Boolean); // Remove undefined values

// Log allowed origins for debugging
console.log("=== CORS Configuration ===");
console.log("Allowed CORS origins:", allowedOrigins);
console.log("FRONTEND_URL_DEPLOYED:", process.env.FRONTEND_URL_DEPLOYED);

// CORS configuration with explicit preflight handling
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or curl requests)
        if (!origin) {
            console.log("Request with no origin - allowing");
            return callback(null, true);
        }
        
        // Check if origin is in allowed list
        if (allowedOrigins.length === 0) {
            // If no origins configured, allow all (for debugging - should be fixed)
            console.warn("WARNING: No CORS origins configured! Allowing all origins.");
            return callback(null, true);
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log("CORS allowed for origin:", origin);
            callback(null, true);
        } else {
            // Log blocked origin for debugging
            console.log("CORS BLOCKED origin:", origin);
            console.log("Allowed origins are:", allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Explicit OPTIONS handler for preflight requests (additional safety)
app.options('*', cors(corsOptions));

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
