const express = require('express');
const cors = require('cors');
const axios = require('axios');
const puppeteer = require('puppeteer'); // Uncomment if you want to handle dynamic content

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Proxy route for fetching static or dynamic content
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.targetUrl;

    if (!targetUrl) {
        return res.status(400).send('Missing targetUrl query parameter');
    }

    try {
        // Uncomment this section to handle dynamic content with Puppeteer
        // const browser = await puppeteer.launch({ headless: true });
        // const page = await browser.newPage();
        // await page.goto(targetUrl, { waitUntil: 'networkidle2' });
        // const content = await page.content();
        // await browser.close();
        // return res.send(content);

        // Handle static content with Axios
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0', // Pretend to be a browser
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        // Return the response from the target URL
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error fetching target URL:', error.message);
        res.status(500).send('Error fetching target URL');
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
