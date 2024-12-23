const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all incoming requests
app.use(cors());

// Proxy route
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.targetUrl;

    if (!targetUrl) {
        return res.status(400).send('Missing targetUrl query parameter');
    }

    try {
        // Use Axios to make the request
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Connection': 'keep-alive',
            },
            responseType: 'text', // Ensure the response is treated as plain text
        });

        // Set headers to mimic `cors-anywhere`
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Expose-Headers': 'Content-Length, Content-Type',
        });

        // Return the response
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error fetching target URL:', error.message);

        // Forward the error response if available
        if (error.response) {
            return res
                .status(error.response.status)
                .send(`Error: ${error.response.statusText}`);
        }

        // Default error response
        res.status(500).send('Internal Server Error');
    }
});

// Health check route
app.get('/', (req, res) => {
    res.send('CORS Proxy is running. Use /proxy?targetUrl={URL} to fetch data.');
});

// Start the server
app.listen(port, () => {
    console.log(`CORS Proxy is running on port ${port}`);
});
