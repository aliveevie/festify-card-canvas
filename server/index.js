const express = require('express');
const cors = require('cors');
require('dotenv').config();

const imageRoutes = require('./routes/imageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/images', imageRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Only start server if not running on Vercel (serverless)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
    console.log(`🎨 Image generation API: http://localhost:${PORT}/api/images/generate`);
    
    // Verify API key is loaded
    if (process.env.API_KEY) {
      console.log('✅ ChainGPT API key loaded');
    } else {
      console.warn('⚠️  Warning: API_KEY not found in environment variables');
    }
  });
}

// Export for Vercel serverless
module.exports = app;
