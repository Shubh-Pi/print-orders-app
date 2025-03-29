const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (e.g., client.html, admin.html) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Define your Cloudflare Worker URL
const workerURL = 'https://print-order-worker.balgudeshubham64.workers.dev';

// Proxy API requests (those starting with /api) to the Cloudflare Worker
app.use('/api', createProxyMiddleware({
  target: workerURL,
  changeOrigin: true,
  // Keep the /api prefix. Adjust pathRewrite if your Worker expects a different path.
  pathRewrite: {
    '^/api': '/api'
  }
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
