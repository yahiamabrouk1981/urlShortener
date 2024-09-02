const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);

// Route for shortening URLs
app.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  // Log the received URL for debugging
  console.log("Received URL:", longUrl);

  try {
    // Make the request to Bitly API
    const response = await axios.post(
      "https://api-ssl.bitly.com/v4/shorten",
      {
        long_url: longUrl, // Correct field name as per Bitly API documentation
      },
      {
        headers: {
          Authorization: `Bearer 4fb02f7ca4a5617c253d3b99c7bd0bfd72a3953a`, // Replace with your actual Bitly API token
          "Content-Type": "application/json",
        },
      }
    );

    // Log the response data for debugging
    console.log("Bitly Response:", response.data);

    // Send the response to the client
    res.json(response.data);
  } catch (error) {
    // Log detailed error information
    console.error(
      "Error shortening URL:",
      error.response?.data || error.message
    );

    // Send error response to the client
    res.status(500).json({
      error: "Error shortening URL",
      message: error.response?.data?.error || error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
