const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
redisClient.connect();

// Add person
app.post('/add', async (req, res) => {
    const { firstName, age } = req.body;
    if (!firstName || !age) return res.status(400).send({ error: 'Missing fields' });
    const person = { firstName, age };
    await redisClient.rPush('people', JSON.stringify(person));
    res.send({ status: 'added', person });
});

// List all people
app.get('/list', async (req, res) => {
    const people = await redisClient.lRange('people', 0, -1);
    res.send(people.map(p => JSON.parse(p)));
});

// Delete person by index
app.delete('/delete/:index', async (req, res) => {
    const index = parseInt(req.params.index);
    const people = await redisClient.lRange('people', 0, -1);
    if (index < 0 || index >= people.length) return res.status(404).send({ error: 'Not found' });
    const person = people[index];
    await redisClient.lRem('people', 1, person);
    res.send({ status: 'deleted', person: JSON.parse(person) });
});

// Update person by index
app.put('/update/:index', async (req, res) => {
    const index = parseInt(req.params.index);
    const { firstName, age } = req.body;
    const people = await redisClient.lRange('people', 0, -1);
    if (index < 0 || index >= people.length) return res.status(404).send({ error: 'Not found' });
    const updatedPerson = { firstName, age };
    await redisClient.lSet('people', index, JSON.stringify(updatedPerson));
    res.send({ status: 'updated', person: updatedPerson });
});

app.listen(3000, () => console.log('Express server running on port 3000'));