const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/weather', (req, res) => {
  res.json({
    zip: req.query.zipcode,
    temp: Math.floor(Math.random() * (95 - 50 + 1)) + 50
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});