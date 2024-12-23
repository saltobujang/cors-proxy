const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all requests

// Define the CORS proxy route
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.targetUrl;

    if (!targetUrl) {
        return res.status(400).send('Missing targetUrl query parameter');
    }

    try {
        const response = await axios.get(targetUrl);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching target URL');
    }
});

app.listen(port, () => {
    console.log(`CORS Proxy is running on http://localhost:${port}`);
});
