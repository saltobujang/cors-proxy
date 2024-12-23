const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all incoming requests
app.use(cors());

// Define the CORS proxy route
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.targetUrl;

    // Check if the targetUrl query parameter is provided
    if (!targetUrl) {
        return res.status(400).send('Missing targetUrl query parameter');
    }

    try {
        // Use Axios to fetch the content of the target URL
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0', // Pretend to be a browser
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        // Return the fetched content
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error fetching target URL:', error.message);
        res.status(500).send('Error fetching target URL'); // Send error response
    }
});

// Health check route for testing the proxy
app.get('/', (req, res) => {
    res.send('CORS Proxy is running. Use /proxy?targetUrl={URL} to fetch data.');
});

// Start the server and listen on the assigned port
app.listen(port, () => {
    console.log(`CORS Proxy is running on port ${port}`);
});
