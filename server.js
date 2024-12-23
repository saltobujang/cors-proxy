const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Define the CORS proxy route
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.targetUrl;

    // Check if the targetUrl query parameter is provided
    if (!targetUrl) {
        return res.status(400).send('Missing targetUrl query parameter');
    }

    try {
        // Fetch the target URL using Axios
        const response = await axios.get(targetUrl);
        // Return the response data from the target URL
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error fetching target URL:', error.message);
        res.status(500).send('Error fetching target URL'); // Send error response
    }
});

// Start the server and listen on the assigned port
app.listen(port, () => {
    console.log(`CORS Proxy is running on port ${port}`);
});
