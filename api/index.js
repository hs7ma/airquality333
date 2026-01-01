// Vercel serverless function wrapper
const app = require('../server/server');

// Export handler for Vercel
module.exports = (req, res) => {
  return app(req, res);
};

