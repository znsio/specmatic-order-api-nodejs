const errorResponse = (response, status, error, message) => {
  return response.status(status).json({
    timestamp: new Date().toISOString(),
    status,
    error,
    message,
  });
};

module.exports = errorResponse;
