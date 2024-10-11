const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection without deprecated options
mongoose
  .connect(
    "mongodb+srv://admin:Km12112003@cluster0.eakoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));



// Routes
app.use("/api/v1/user", userRoutes); 
app.use("/api/v1/emp", employeeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
