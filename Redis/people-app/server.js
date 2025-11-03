const express = require('express');
const { createClient } = require('redis');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // serve index.html + JS, CSS, etc.

// Connect to Redis
const redisClient = createClient();
redisClient.connect().then(() => {
  console.log('✅ Connected to Redis');
}).catch(console.error);

// Add a person
app.post('/add', async (req, res) => {
  console.log('Received:', req.body);
  const { firstName, age } = req.body;
  if (!firstName || !age) {
    return res.status(400).send({ error: 'Missing fields' });
  }

  const person = { firstName, age };
  await redisClient.rPush('people', JSON.stringify(person));
  res.send({ message: 'Person added', person });
});

// List all people
app.get('/list', async (req, res) => {
  const people = await redisClient.lRange('people', 0, -1);
  res.send(people.map(p => JSON.parse(p)));
});

app.listen(3000, () => {
  console.log('🚀 App running at: http://localhost:3000');
});
