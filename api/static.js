// Serve static files (CSS, JS)
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

module.exports = (req, res) => {
  const filePath = req.url.replace(/^\//, ''); // Remove leading slash
  const fullPath = path.join(__dirname, '../public', filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  // Security: prevent directory traversal
  if (!fullPath.startsWith(path.join(__dirname, '../public'))) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  const content = fs.readFileSync(fullPath);
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  
  res.setHeader('Content-Type', mimeType);
  res.send(content);
};

