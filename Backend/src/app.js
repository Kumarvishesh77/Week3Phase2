const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Define paths
const frontendSrcPath = path.resolve(__dirname, "../../Frontend/src");
const rootPath = path.resolve(__dirname, "../../");

console.log("Serving frontend from:", frontendSrcPath);

// 0. Request Logging Middleware (Helpful for debugging)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// 0.5 Explicit Root Route Handler
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendSrcPath, "index.html"));
});

// 1. Static file serving - serving the frontend files from the 'src' directory
app.use(express.static(frontendSrcPath));

// 2. Also serve files in the Temp root (images, etc)
app.use(express.static(rootPath));

// API Routes
app.use("/api/auth", AuthRoutes);

// Fallback for SPA routing and 404s
// app.use() without a path is guaranteed to catch all requests that fall through
app.use((req, res) => {
    // If request is for an API that doesn't exist, return JSON 404
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({ message: "API route not found" });
    }
    
    const indexPath = path.join(frontendSrcPath, "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) {
            // If the file is missing, provide the path to help with debugging
            res.status(404).send(`Frontend not found. Ensure 'index.html' exists in: ${frontendSrcPath}`);
        }
    });
});

// Global Error Handler - catches hidden crashes and displays them
app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
});

module.exports = app;
