const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const logger = require('./middleware/logger');

app.use(express.json());
app.use(logger); // Middleware to log requests
app.use('/', userRoutes); // All user routes
// Handle undefined routes (404 error)
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: 'Please check the API route or refer to \'/\' for available endpoints.'
  });
});


// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
