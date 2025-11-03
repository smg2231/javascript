const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Redis
const redisClient = createClient();
redisClient.connect().then(() => {
  console.log('✅ Connected to Redis');
}).catch(console.error);

// Add a person
app.post('/add', async (req, res) => {
  console.log('Received:', req.body);
  const { firstName, age } = req.body;
  if (!firstName || !age) return res.status(400).send({ error: 'Missing fields' });

  const person = { firstName, age };
  await redisClient.rPush('people', JSON.stringify(person));
  res.send({ message: 'Person added', person });
});

// List all people
app.get('/list', async (req, res) => {
  const people = await redisClient.lRange('people', 0, -1);
  res.send(people.map(p => JSON.parse(p)));
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
