const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://*.atlassian.net;");
  next();
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/installed', (req, res) => res.sendStatus(200));
app.get('/uninstalled', (req, res) => res.sendStatus(200));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));