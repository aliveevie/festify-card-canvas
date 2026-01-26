/**
 * Global error handling middleware
 */
function errorHandler(err, req, res, next) {
  // If error has statusCode, use it; otherwise default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const error = err.error || err.toString();

  console.error('Error:', {
    statusCode,
    message,
    error,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : 'An error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;
