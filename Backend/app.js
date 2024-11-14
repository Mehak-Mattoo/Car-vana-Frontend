// Import required modules
require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

// Initialize the app
const app = express();

// Connecting to the database
const connectToDB = require("./connectionDB");
connectToDB();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the port
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Default route for testing the server
app.get("/", (req, res) => {
  res.send(`Server is working 😊`);
});

// Import and use routes
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/notesRoutes");
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

(async function testCloudinaryUpload() {
  try {
    // Test Cloudinary upload
    const uploadResult = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      { public_id: "shoes" }
    );
    console.log("Upload Result:", uploadResult);

    // Example: Optimize URL for delivery
    const optimizeUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });
    console.log("Optimized URL:", optimizeUrl);

    // Example: Auto-crop URL
    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });
    console.log("Auto-cropped URL:", autoCropUrl);
  } catch (error) {
    console.error("Error with Cloudinary upload:", error);
  }
})();
