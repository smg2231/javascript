const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

const redisClient = createClient();
redisClient.connect();

app.post('/add', async (req, res) => {
    const { firstName, age } = req.body;
    const person = { firstName, age };
    await redisClient.rPush('people', JSON.stringify(person));
    res.send({ status: 'added', person });
});

app.get('/list', async (req, res) => {
    const people = await redisClient.lRange('people', 0, -1);
    res.send(people.map(p => JSON.parse(p)));
});

app.listen(3000, () => console.log('Server running on port 3000'));