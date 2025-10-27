const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

// Create Redis client with URL
const redisClient = createClient({ url: 'redis://localhost:6379' });

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

// Add person
app.post('/add', async (req, res) => {
    const { firstName, age } = req.body;
    const person = { firstName, age };
    await redisClient.rPush('people', JSON.stringify(person));
    res.send({ status: 'added', person });
});

// Get all people
app.get('/list', async (req, res) => {
    const people = await redisClient.lRange('people', 0, -1);
    res.send(people.map(p => JSON.parse(p)));
});

app.listen(3000, () => console.log('Server running on port 3000'));
``